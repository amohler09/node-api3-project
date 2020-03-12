const express = require('express');

const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');

const server = express();

server.use(logger);
server.use(express.json());

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Api running...</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} method used at route ${req.originalUrl} on ${Date()}`);

  next();
}

module.exports = server;
