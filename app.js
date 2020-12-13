const Logger = require('js-logger');
const axios = require('axios');
const FormData = require('form-data');
const app = require('./server');
const { convertRequest, headerFilter } = require('./request-converter');
const config = require('./config.json');
const utils = require('./utils');

Logger.useDefaults();

const port = process.env.PORT || config.workerPort;

axios.interceptors.request.use((axiosRequestConfig) => {
  if (axiosRequestConfig.data instanceof FormData) {
    Object.assign(axiosRequestConfig.headers, axiosRequestConfig.data.getHeaders());
  }
  return axiosRequestConfig;
});

app.all('*', async (req, res) => {
  try {
    Logger.info('a request received');
    const axiosConfig = convertRequest(req);
    const response = await axios(axiosConfig);

    const filteredResponse = headerFilter(response);
    res.set('ip', utils.getIp());
    res.status(filteredResponse.status);
    res.set(filteredResponse.headers);
    res.send(filteredResponse.data);
  } catch (e) {
    Logger.error('an error occurred', e);
    res.status(utils.HTTP.NOT_FOUND);
    res.send('sorry');
  }
});

app.listen(port, () => {
  Logger.info(`Worker listening at ${port}`);
});
