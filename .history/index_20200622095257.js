const express = require('express');
const port = process.env.NODE_PORT || 3000;
const host = process.env.HOSTNAME || "dunno";
const axios = require('axios');
const url = 'https://jujhar.com/bikes.json';
const cache_store=
const app = express();

app.get('/', (req, res) => {
 
  return axios.get(url)
    .then(response => {
      let out = { your: "Friendly JSON Server", accessed: host };

      out.bikes = ;
      res.send(response.data);
    })
    .catch(err => console.error);
});

app.get('/cached', (req, res) => {
  
  data=
  return axios.get(url)
    .then(response => {
      let out = { your: "Friendly JSON Server", accessed: host };

      out.bikes = response.data;
      res.send(response.data);
    })
    .catch(err => console.error);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
