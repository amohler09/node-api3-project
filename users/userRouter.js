const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error adding user" });
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  if (req.body.user_id === req.params.id) {
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

router.get('/:id', validateUserId, (req, res) => {
  
  Users.getById(req.params.id)
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

router.get('/:id/posts', validateUserId, (req, res) => {
  const id = req.params.id;
  Users.getUserPosts(id)
    .then(post => {
      if (post.length > 0) {
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


router.delete('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(users => {
      if(users > 0) {
        res.status(200).json({ message: "User has been deleted" });
      } else {
        res.status(404).json({ message: "Could not find user"});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error deleting user" })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const id = req.params.id;
  Users.update(id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "User has been updated" });
      } else {
        res.status(404).json({ message: "Could not find user" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error updating user" })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  Posts.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
      } else {
        res.status(400).json({ message: "Invalid user ID"});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error finding user"});
    })

  next();
};

function validateUser(req, res, next) {
  if (req.body.name === "") {
    res.status(400).json({ message: "Missing required name field" });
  } else if (!req.body) {
    res.status(400).json({ message: "Missing user data" });
  }
  next();
}

function validatePost(req, res, next) {
  if (req.body) {
    body = req.body;
  } else if (!req.body.text) {
    res.status(400).json({ message: "Missing required text field" })
  } else {
    res.status(400).json({ message: "Missing post data" })
  }
  next();
}

module.exports = router;

