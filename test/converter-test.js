const { assert } = require('chai');
const { convertRequest } = require('../request-converter');

const req = {
  headers: {
    base: 'http://eksisozluk.com',
    accept: '*/*',
    'accept-encoding': 'gzip, deflate, br',
    connection: 'keep-alive',
    cookie: 'iq=78195da89b534a05a6de62286be2c19a; ASP.NET_SessionId=t45gvun5mpu02jotfeticcrf; channel-filter-preference-cookie=W3siSWQiOjEsIlByZWYiOnRydWV9LHsiSWQiOjIsIlByZWYiOnRydWV9LHsiSWQiOjQsIlByZWYiOnRydWV9LHsiSWQiOjUsIlByZWYiOnRydWV9LHsiSWQiOjEwLCJQcmVmIjpmYWxzZX0seyJJZCI6MTEsIlByZWYiOmZhbHNlfSx7IklkIjozOSwiUHJlZiI6ZmFsc2V9XQ==',
  },
  rawHeaders: [
    'base',
    'http://eksisozluk.com',
    'Accept',
    '*/*',
    'Accept-Encoding',
    'gzip, deflate, br',
    'Connection',
    'keep-alive',
    'Cookie',
    'iq=78195da89b534a05a6de62286be2c19a; ASP.NET_SessionId=t45gvun5mpu02jotfeticcrf; channel-filter-preference-cookie=W3siSWQiOjEsIlByZWYiOnRydWV9LHsiSWQiOjIsIlByZWYiOnRydWV9LHsiSWQiOjQsIlByZWYiOnRydWV9LHsiSWQiOjUsIlByZWYiOnRydWV9LHsiSWQiOjEwLCJQcmVmIjpmYWxzZX0seyJJZCI6MTEsIlByZWYiOmZhbHNlfSx7IklkIjozOSwiUHJlZiI6ZmFsc2V9XQ==',
  ],
  url: '/?hey=you',
  method: 'GET',
  statusCode: null,
  statusMessage: null,
  baseUrl: '',
  originalUrl: '/?hey=you',
  _parsedUrl: {
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?hey=you',
    query: 'hey=you',
    pathname: '/',
    path: '/?hey=you',
    href: '/?hey=you',
    _raw: '/?hey=you',
  },
  params: {},
  query: {
    hey: 'you',
  },
  route: {
    path: '/',
  },
};

describe('Converter', () => {
  describe('convertRequest', () => {
    it('should return correct url for http', () => {
      req.headers.base = 'http://abc.com';
      req.originalUrl = '/?hey=you';
      const axiosRequest = convertRequest(req);
      assert.equal(axiosRequest.url, 'http://abc.com/?hey=you');
    });

    it('should return correct url for https', () => {
      req.headers.base = 'https://abc.com';
      req.originalUrl = '/?hey=you';
      const axiosRequest = convertRequest(req);
      assert.equal(axiosRequest.url, 'https://abc.com/?hey=you');
    });

    it('should return get method', () => {
      req.method = 'GET';
      const axiosRequest = convertRequest(req);
      assert.equal(axiosRequest.method, 'get');
    });

    it('should return post method', () => {
      req.method = 'post';
      const axiosRequest = convertRequest(req);
      assert.equal(axiosRequest.method, 'post');
    });

    it('should override user-agent header', () => {
      req.headers['user-agent'] = 'Hey';
      const axiosRequest = convertRequest(req);
      assert.notEqual(axiosRequest.headers['user-agent'], 'Hey');
    });
  });
});
