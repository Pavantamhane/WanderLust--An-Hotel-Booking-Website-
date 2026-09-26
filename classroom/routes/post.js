const express = require('express');
const router = express.Router();
// Posts routes
router.get('/', (req, res) => {
  res.send('GET for show posts');
});
// show route
router.get('/:id', (req, res) => {
  res.send('GET for show post id');
});
// create route
router.post('/', (req, res) => {
  res.send('POST for create post');
});
// delete route
router.delete('/:id', (req, res) => {
  res.send('DELETE for delete post id');
});
module.exports = router;