const querystring = require('querystring');

module.exports = class FormUrlEncodedHandler {
  shouldHandle(extendedRequest) {
    return extendedRequest.isUrlEncoded();
  }

  handle(extendedRequest, convertedRequest) {
    // eslint-disable-next-line no-param-reassign
    convertedRequest.data = querystring.stringify(extendedRequest.getBody());
  }
};
