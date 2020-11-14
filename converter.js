const {getUserAgent} = require("./utils");
const _ = require('lodash');
const userAgent = getUserAgent();

const convertExpressRequestToAxiosRequest = function (expressReq) {
    const base = expressReq.headers.base;
    delete expressReq.headers.base;

    expressReq.headers = _.pickBy(expressReq.headers, function (value, key) {
        return !_.includes(key.toLowerCase(), "user-agent");
    });

    expressReq.headers['user-agent'] = userAgent;

    return {
        url: base + expressReq.originalUrl,
        method: expressReq.method.toLowerCase(),
        headers: expressReq.headers
    };
};

module.exports = {
    convertExpressRequestToAxiosRequest
}