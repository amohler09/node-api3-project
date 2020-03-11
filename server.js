const express = require('express');

const server = express();

server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} method used at route ${req.originalUrl} on ${Date()}`)

  next();
}

module.exports = server;
