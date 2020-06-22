const express = require('express');
const axios = require('axios');
const os = require('os');
const fs = require('fs');

const port = process.env.NODE_PORT || 3000;
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
  
  return new Promise((resolve, reject) => {
    fs.readFile(cacheStore, (err, data) => {
      if (err) resolve(null);
      if (data) {
        res.setHeader('cached',cacheStore);
        res.send(data);
      }
      else {
        resolve(null);
      }
    });
  })
  .then(() => {
      return axios.get(url)
        .then(response => {
          return new Promise((resolve, reject) => {
            fs.writeFile(cacheStore, response.data, err => {
              if (err) resolve(null);
              reject
            });
          });
          res.setHeader('cached','false');
          res.send(response.data);
        })
    })
  .catch(err => console.error(err));
  
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
