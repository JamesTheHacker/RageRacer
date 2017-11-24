#!/usr/bin/env node

const args = require('args');
const racer = require('../src/racer.js');

args
  .option('config', 'Configuration file in .JSON format')

const flags = args.parse(process.argv);
racer.run(flags)
  .then(results => JSON.stringify(results))
  .then(results => console.log(results))
  .catch(err => console.error(err));
