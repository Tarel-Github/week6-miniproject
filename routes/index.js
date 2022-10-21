const express = require('express');
const router = express.Router();
const postsRouter = require('./post.routes');

router.use('/posts/',postsRouter);

module.exports = router;
