const path = require('path');
const helpers = require('./helpers.js');
const race = require('../src/racer.js');

describe('Race Module', () => {
  describe('createRequests method', () => {
    test('Returns array with 10 elements', () => {
      const promises = race.createRequests({ url: 'http://google.com' }, 10);
      expect(promises).toHaveLength(10);
    });
  
    test('Returns an array of 10 promises', () => {
      const requests = race.createRequests({ url: 'http://google.com' }, 10);
      const promises = [...Array(10).keys()]
        .map(() => new Promise(() => {}));
      expect(requests).toEqual(promises);
    });
  });

  describe('run method', () => {
    test('Throws exception if no config file is provided', async () => {
      await expect(race.run())
        .rejects
        .toThrow('No configuration file specified');
    });
  
    test('Does not throw error when config file is provided', async () => {
      await expect(race.run({
        config: path.resolve(__dirname, './data/sample.config.json')
      })).resolve;
    })
  });

  describe('loadConfigFile method', () => {
    test('Loads JSON configuration file', async () => {
      const filePath = path.resolve(__dirname, './data/sample.config.json');
      const loadedConfig = await race.loadConfigFile(filePath);
      const configFile = require(filePath);
      expect(loadedConfig).toEqual(configFile);
    });
  });
});