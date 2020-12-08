const Logger = require('js-logger');
const fs = require('fs');
const _ = require('lodash');
const publicIp = require('public-ip');
const config = require('./config.json');

let ip = null;

const interval = setInterval(() => {
  (async function setIp() {
    try {
      Logger.info('trying to set ip');
      ip = await publicIp.v4();
    } catch (e) {
      Logger.error(e);
    }
  }());
  if (ip) {
    Logger.info('ip interval cleared');
    clearInterval(interval);
  }
}, config.ipIntervalTimeout);

function getIp() {
  return ip;
}

const jsonSafeStringify = (obj, indent = 2) => {
  let cache = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.includes(value)) {
          return undefined;
        }
        return cache.push(value) && value;
      }
      return value;
    },
    indent,
  );
  cache = null;
  return retVal;
};

const writeJson = (filename, obj) => {
  fs.writeFileSync(filename, jsonSafeStringify(obj));
};

const getUserAgent = () => {
  const agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
  ];
  return _.sample(agents);
};

module.exports = {
  jsonSafeStringify,
  writeJson,
  getUserAgent,
  getIp,
  HTTP: {
    NOT_FOUND: 404,
  },
};
