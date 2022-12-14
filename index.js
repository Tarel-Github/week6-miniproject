const { Router } = require('express');
const router = Router();

const commentRouter = require('./comment/comment.route');
const categoryRouter = require('./category/category.route');
const postsRouter = require('./post/post.route');
const userRouter = require('./user/user.route');



router.use('/comments', commentRouter);
router.use('/posts/cate', categoryRouter);
router.use('/posts/', postsRouter);
router.use('/', userRouter);

module.exports = router;