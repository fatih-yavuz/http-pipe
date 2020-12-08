const express = require('express');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const multer = require('multer')();
const xmlparser = require('express-xml-bodyparser');
const config = require('./config.json');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.disable('x-powered-by');
app.use(timeout(config.responseTimeout));
app.use((req, res, next) => {
  if (!req.timedout) {
    next();
  }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(multer.any());
app.use(xmlparser());

module.exports = app;
