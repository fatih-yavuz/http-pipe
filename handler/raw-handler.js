module.exports = class RawHandler {
  shouldHandle(extendedRequest) {
    return extendedRequest.isRaw();
  }

  handle(extendedRequest, convertedRequest) {
    // eslint-disable-next-line no-param-reassign
    convertedRequest.data = extendedRequest.getBody();
  }
};
