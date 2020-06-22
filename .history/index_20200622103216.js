const express = require('express');
const axios = require('axios');
const os = require('os');
const fsPromises = require('fs/promises');

const port = process.env.NODE_PORT || 3000;
const url = 'https://jujhar.com/bikes.json';
const cacheStore =`${os.tmpdir()}/${new Date().toISOString().replace(/:/, '-')}.json`

const app = express();

/**
 * no cache
 */
app.get('/', (req, res) => {
 
  return axios.get(url)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => console.error);
});


/**
 * cache to disk
 */
app.get('/cached', (req, res) => {
  
  return fsPromises.readFile(cacheStore)
  .then(data=> {
    if (data) {
      res.setHeader('cached', cacheStore);
      res.send(data);
    }
    
  )
   
  })
    .then(() => {
    // save cache
    return axios.get(url)
      .then(response => {
        return fsPromises.writeFile(cacheStore, JSON.stringify(response.data))
        .then(()=>response.data)
      });
  })
    .then(data => {
      res.setHeader('cached', 'false');
      res.send(data);
    })
  .catch(err => console.error(err));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
