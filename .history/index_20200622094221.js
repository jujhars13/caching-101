const express = require('express');
const port = process.env.NODE_PORT || 3000;
const host = process.env.HOSTNAME || "dunno";
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!'));
} 

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const requestHandler = (request, response) => {
	response.setHeader('Content-Type', 'application/json');
  // @see https://httpstatuses.com/
  response.statusCode = 200; 
  console.log(new Date() + ` Accessed ${host}`);
  let out = { your: "Friendly JSON Server", accessed: host };
  
  return axios.get('https://jujhar.com/bikes.json')
    .then(response => {
      out.bikes = response.data;
      return response.data;
    })
    .then(data => {
      return new Promise((resolve, reject) => {
       response.end(data, 'utf8',resolve);
      });
    })
    .catch(err => console.error);
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	console.log(`server is listening on ${port}`)
})
