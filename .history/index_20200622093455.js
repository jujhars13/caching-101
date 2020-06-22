const http = require('http');
const port = process.env.NODE_PORT || 3000;
const myName = process.env.MY_NAME || "dave";
const host = process.env.HOSTNAME || "dunno";
const axios = require('axios');

const requestHandler = (request, response) => {
	response.setHeader('Content-Type', 'application/json');
  // @see https://httpstatuses.com/
  response.statusCode = 200; 
  console.log(new Date() + ` ${myName} accessed ${host}`);
  let out = { your: "Friendly JSON Server", accessed: host };
  
  axios.get('https://jujhar.com/bikes.json')
    .then(response => {
      
      out.bikes = response.data;
      return response.data;
    })
    .then(data => {
      return new Promise((resolve, reject) => {
        response.end(data, () => {
          
        });
      });
    })
    .catch(err => console.error);
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	console.log(`server is listening on ${port}`)
})
