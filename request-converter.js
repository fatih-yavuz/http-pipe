const Logger = require('js-logger');

const _ = require('lodash');
const { getUserAgent } = require('./utils');
const FormDataHandler = require('./handler/form-data-handler');
const FormUrlEncodedHandler = require('./handler/form-urlencoded-handler');
const JsonHandler = require('./handler/raw-handler');
const ExtendedRequest = require('./extended-request');

const userAgent = getUserAgent();

const headerFilter = (req) => {
  const result = _.cloneDeep(req);
  delete result.headers.base;
  delete result.headers.host;
  delete result.headers['x-request-id'];
  delete result.headers['x-forwarded-for'];
  delete result.headers['x-forwarded-proto'];
  delete result.headers['x-forwarded-port'];
  delete result.headers.via;
  delete result.headers['connect-time'];
  delete result.headers['x-request-start'];
  delete result.headers['total-route-time'];
  delete result.headers['content-length'];
  delete result.headers['transfer-encoding'];
  delete result.headers.connection;
  return result;
};

const handlers = [
  new FormDataHandler(),
  new FormUrlEncodedHandler(),
  new JsonHandler(),
];

const convertRequest = (expressReq) => {
  const convertedRequest = {};
  const { base } = expressReq.headers;

  const filteredRequest = headerFilter(expressReq);
  filteredRequest.headers['user-agent'] = userAgent;

  Logger.trace(filteredRequest.headers);
  const extendedRequest = new ExtendedRequest(expressReq);
  handlers.forEach((handler) => {
    if (handler.shouldHandle(extendedRequest)) {
      handler.handle(extendedRequest, convertedRequest);
    }
  });

  convertedRequest.url = base + filteredRequest.originalUrl;
  convertedRequest.method = filteredRequest.method.toLowerCase();
  convertedRequest.headers = filteredRequest.headers;
  return convertedRequest;
};

module.exports = {
  convertRequest,
  headerFilter,
};
