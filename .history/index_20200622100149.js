const express = require('express');
const axios = require('axios');
const os = require('os');
const port = process.env.NODE_PORT || 3000;
const host = process.env.HOSTNAME || "dunno";

const url = 'https://jujhar.com/bikes.json';
const cacheStore =`${os.tmpdir()}/${new Date().toISOString().replace(/:/, '-')}.json`
const app = express();

app.get('/', (req, res) => {
 
  return axios.get(url)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => console.error);
});

app.get('/cached', (req, res) => {
  
  return new Promise(res, rej => {
    fs.readFile(cacheStore, (err, data) => {
      if (err) rej(err);
      res(data);
    });
  })
    .then(data => {
      console.log(data)
    });
  
  return axios.get(url)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => console.error);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
