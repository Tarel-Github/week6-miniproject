const { Router } = require('express');
const router = Router();

const commentRouter = require('./comment/comment.route');
const postsRouter = require('./post/post.route');
const userRouter = require('./user/user.route');
const likeRouter = require('./like/like.route');//##

router.use('/comments', commentRouter);
router.use('/posts/', postsRouter);
router.use('/', userRouter);
router.use('/like/',likeRouter)//##


module.exports = router;
