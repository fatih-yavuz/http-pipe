const express = require('express')
const app = express();
const port = 80;
const axios = require('axios');
const publicIp = require('public-ip');
const {convertExpressRequestToAxiosRequest} = require("./converter");

let ip = null;

async function setIp() {
    try {
        console.log('trying to set ip');
        ip = await publicIp.v4();
    } catch (e) {
        console.log(e);
    }
}

const interval = setInterval(() => {
    setIp();
    if (ip) {
        console.log('ip interval cleared');
        clearInterval(interval);
    }
}, 500);

app.all('/', async (req, res) => {
    try {
        res.set('ip', ip);

        const response = await axios(convertExpressRequestToAxiosRequest(req));

        res.status(response.status);
        res.set(response.headers);
        res.send(response.data);
    } catch (e) {
        console.log('an error occured', e);
        res.status(500);
        res.send(e);
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})