const express = require('express');
const axios = require('axios');
const os = require('os');
const fs = require('fs');

const port = process.env.NODE_PORT || 3000;
const url = 'https://jujhar.com/bikes.json';
const cacheStore =`${os.tmpdir()}/${new Date().toISOString().replace(/:/, '-')}.json`

const app = express();

/**
 * non cached
 */
app.get('/', (req, res) => {
 
  return axios.get(url)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => console.error);
});

/**
 * cached
 */
app.get('/cached', (req, res) => {
  
  // check existing cache
  return new Promise((resolve, reject) => {
    fs.readFile(cacheStore, (err, data) => {
      // cache is empty
      if (err || !data) resolve(null);

      // cache exists - server from there
      if (data) {
        res.setHeader('cached',cacheStore);
        res.send(data);
      }
    });
  })
    .then(() => {
    
      // cache miss - so go to origin
      return axios.get(url)
        .then(response => {
          return new Promise((resolve, reject) => {
            fs.writeFile(cacheStore, JSON.stringify(response.data), err => {
              if (err) reject(err);
              resolve(response.data);
            });
          });
        })
        .then(data => {

          res.setHeader('cached','false');
          res.send(data);
        })
  })
  .catch(err => console.error(err));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
