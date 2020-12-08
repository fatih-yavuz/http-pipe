const { assert } = require('chai');
const ExtendedRequest = require('../extended-request');

describe('ExtendedRequest', () => {
  describe('isUrlEncoded', () => {
    it('should return true when content type is url encoded', () => {
      const extendedRequest = new ExtendedRequest({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      assert.isTrue(extendedRequest.isUrlEncoded());
    });

    it('should return false when content type is not present', () => {
      const extendedRequest = new ExtendedRequest({});
      assert.isFalse(extendedRequest.isUrlEncoded());
    });
  });

  describe('isFormData', () => {
    it('should return true when it is form data', () => {
      const extendedRequest = new ExtendedRequest({
        form: {
          hey: 'you',
        },
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      assert.isTrue(extendedRequest.isFormData());
    });

    it('should return false when it is not form data', () => {
      const extendedRequest = new ExtendedRequest({});
      assert.isFalse(extendedRequest.isFormData());
    });
  });

  describe('isRaw', () => {
    it('should return true when it is json', () => {
      const extendedRequest = new ExtendedRequest({
        json: null,
        headers: {
          'content-type': 'application/json',
        },
      });
      assert.isTrue(extendedRequest.isRaw());
    });

    it('should return false when it is not form data', () => {
      const extendedRequest = new ExtendedRequest({});
      assert.isFalse(extendedRequest.isRaw());
    });
  });
});
