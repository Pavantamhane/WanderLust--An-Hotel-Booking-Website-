const express = require('express');
const router = express.Router();

// index route
router.get('/', (req, res) => {
  res.send('GET for show users');
});

// show route
router.get('/:id', (req, res) => {
  res.send('GET for show user id');
});

// create route
router.post('/', (req, res) => {
  res.send('POST for create user');
});

// delete route
router.delete('/:id', (req, res) => {
  res.send('DELETE for delete user id');
});

module.exports = router;
