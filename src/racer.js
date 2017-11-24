const args = require('args');
const fetch = require('node-fetch');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

// Loads JSON configuration file
module.exports.loadConfigFile = async (filename) => {
  const contents = await readFile(filename, 'utf8');
  return JSON.parse(contents);
};

// Creates an array of promises
module.exports.createRequests = (options, requestCount = 10) => {
  const requests = [];
  const { method, body, headers, redirect, url} = options;

  const request = fetch(url, { method, body, headers, redirect })
    .then(resp => resp.text()
      .then(body => {
        const { url, status, headers } = resp;
        return { body, url, status, headers };
      })
    )
    .catch(err => console.error(err));

  for(let i=0; i < requestCount; i++) {  
    requests.push(request);
  }

  return requests;
};

// Runs the race application
module.exports.run = async (flags) => {
  if(!flags || !flags.config) throw new Error('No configuration file specified');
  const config = await this.loadConfigFile(flags.config);

  const options = { 
    url: config.url,
    method: config.method || 'GET',
    headers: config.headers || {},
    body: config.payload || '',
    redirect: config.redirect || 'follow'
  }
  
  // Construct the requests
  const requests = this.createRequests(options, config.tries);

  // Wait for all requests to finish
  return Promise.all(requests);
};