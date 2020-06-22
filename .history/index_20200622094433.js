const express = require('express');
const port = process.env.NODE_PORT || 3000;
const host = process.env.HOSTNAME || "dunno";
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
 
  return axios.get('https://jujhar.com/bikes.json')
    .then(response => {
      let out = { your: "Friendly JSON Server", accessed: host };

      out.bikes = response.data;
      res.send(out);
    })
    .catch(err => console.error);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
