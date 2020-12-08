const FormData = require('form-data');
const _ = require('lodash');

module.exports = class FormDataHandler {
  shouldHandle(extendedRequest) {
    return extendedRequest.isFormData();
  }

  handle(extendedRequest, convertedRequest) {
    const formData = extendedRequest.getBody();
    const form = new FormData();
    _.forEach(formData, (value, key) => {
      form.append(key, value);
    });
    // eslint-disable-next-line no-param-reassign
    convertedRequest.data = form;
  }
};
