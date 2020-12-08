const _ = require('lodash');

const rawTypes = [
  'text/plain',
  'application/json',
  'application/xml',
];
module.exports = class ExtendedRequest {
  constructor(request) {
    this.request = request;
  }

  isUrlEncoded() {
    return this.contentTypeIncludes('x-www-form-urlencoded');
  }

  isFormData() {
    return this.contentTypeIncludes('multipart/form-data');
  }

  isRaw() {
    for (let i = 0; i < rawTypes.length; i += 1) {
      if (this.contentTypeIncludes(rawTypes[i])) {
        return true;
      }
    }
    return false;
  }

  contentTypeIncludes(needle) {
    try {
      return _.includes(this.request.headers['content-type'].toLowerCase(), needle);
    } catch (e) {
      return false;
    }
  }

  getBody() {
    return this.request.body;
  }
};
