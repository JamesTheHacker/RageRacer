const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

module.exports.loadConfig = async () => {
  const filePath = path.resolve(__dirname, './data/sample.config.json');
  return await readFile(filePath, 'utf8');
};