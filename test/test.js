const assert = require('chai').assert;
const {convertExpressRequestToAxiosRequest} = require("../converter");

const req = {
    "headers": {
        "base": "http://eksisozluk.com",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "cookie": "iq=78195da89b534a05a6de62286be2c19a; ASP.NET_SessionId=t45gvun5mpu02jotfeticcrf; channel-filter-preference-cookie=W3siSWQiOjEsIlByZWYiOnRydWV9LHsiSWQiOjIsIlByZWYiOnRydWV9LHsiSWQiOjQsIlByZWYiOnRydWV9LHsiSWQiOjUsIlByZWYiOnRydWV9LHsiSWQiOjEwLCJQcmVmIjpmYWxzZX0seyJJZCI6MTEsIlByZWYiOmZhbHNlfSx7IklkIjozOSwiUHJlZiI6ZmFsc2V9XQ=="
    },
    "rawHeaders": [
        "base",
        "http://eksisozluk.com",
        "Accept",
        "*/*",
        "Accept-Encoding",
        "gzip, deflate, br",
        "Connection",
        "keep-alive",
        "Cookie",
        "iq=78195da89b534a05a6de62286be2c19a; ASP.NET_SessionId=t45gvun5mpu02jotfeticcrf; channel-filter-preference-cookie=W3siSWQiOjEsIlByZWYiOnRydWV9LHsiSWQiOjIsIlByZWYiOnRydWV9LHsiSWQiOjQsIlByZWYiOnRydWV9LHsiSWQiOjUsIlByZWYiOnRydWV9LHsiSWQiOjEwLCJQcmVmIjpmYWxzZX0seyJJZCI6MTEsIlByZWYiOmZhbHNlfSx7IklkIjozOSwiUHJlZiI6ZmFsc2V9XQ=="
    ],
    "url": "/?hey=you",
    "method": "GET",
    "statusCode": null,
    "statusMessage": null,
    "baseUrl": "",
    "originalUrl": "/?hey=you",
    "_parsedUrl": {
        "slashes": null,
        "auth": null,
        "host": null,
        "port": null,
        "hostname": null,
        "hash": null,
        "search": "?hey=you",
        "query": "hey=you",
        "pathname": "/",
        "path": "/?hey=you",
        "href": "/?hey=you",
        "_raw": "/?hey=you"
    },
    "params": {},
    "query": {
        "hey": "you"
    },
    "route": {
        "path": "/",
    }
};

describe('Converter', function () {
    describe('convertExpressRequestToAxiosRequest', function () {
        it('should return correct url for http', function () {
            req.headers.base = 'http://abc.com';
            req.originalUrl = '/?hey=you';
            const axiosRequest = convertExpressRequestToAxiosRequest(req);
            assert.equal(axiosRequest.url, 'http://abc.com/?hey=you');
        });

        it('should return correct url for https', function () {
            req.headers.base = 'https://abc.com';
            req.originalUrl = '/?hey=you';
            const axiosRequest = convertExpressRequestToAxiosRequest(req);
            assert.equal(axiosRequest.url, 'https://abc.com/?hey=you');
        });

        it('should return get method', function () {
            req.method = 'GET';
            const axiosRequest = convertExpressRequestToAxiosRequest(req);
            assert.equal(axiosRequest.method, 'get');
        });

        it('should return post method', function () {
            req.method = 'post';
            const axiosRequest = convertExpressRequestToAxiosRequest(req);
            assert.equal(axiosRequest.method, 'post');
        });

        it('should filter User-Agent header', function () {
            req.headers['User-Agent'] = 'Hey';
            const axiosRequest = convertExpressRequestToAxiosRequest(req);
            assert.equal(axiosRequest.headers['User-Agent'], undefined);
        });

        it('should override user-agent header', function () {
            req.headers['user-agent'] = 'Hey';
            const axiosRequest = convertExpressRequestToAxiosRequest(req);
            assert.notEqual(axiosRequest.headers['user-agent'], 'Hey');
        });
    });
});