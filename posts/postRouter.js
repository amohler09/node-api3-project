const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving posts" });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Posts.getById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID cannot be found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving post" });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then(posts => {
      if (posts > 0) {
        res.status(200).json({ message: "Post has been deleted" });
      } else {
        res.status(404).json({ message: "Post not found, check the ID and try again" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error deleting post"})
    })
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  Posts.update(id, req.body)
    .then(posts => {
      console.log(posts);
      if (posts) {
        res.status(200).json({ message: "Post has been updated" });
      } else {
        res.status(500).json({ message: "Could not find a post with that ID"});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error updating post" });
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
