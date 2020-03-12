const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error adding user" });
    })
});

router.post('/:id/posts', (req, res) => {
  const id = req.params.id;
  if (req.body.user_id === id) {
    Posts.insert(req.body)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Error adding post" });
      })
  } else {
    res.status(404).json({ message: "Make sure user_id matches your post route and try again" });
  }
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving users" })
    })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Users.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving user" });
    })
});

router.get('/:id/posts', (req, res) => {
  const id = req.params.id;
  Users.getUserPosts(id)
    .then(post => {
      if (id) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "No posts found for this user" });
      }
    })
    .catch(error => {
      console.log(error);
      if (!id) {
        res.status(404).json({ message: "Could not find the requested user" });
      } else {
        res.status(500).json({ message: "Error retrieving posts" });
      }
    })
});


router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  if (req.params.id === req.body.id) {
    req.user = id;
  } else {
    res.status(400).json({ message: "Invalid user ID" });
  }

  next();
};

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

