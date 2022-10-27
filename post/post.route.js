// URI와 미들웨어, HTTP메서드를 설정 / 컨트롤러와 연결하는 역할
const express = require('express');
const router = express.Router();

const PostsController = require('./post.controller');
const authMiddleware = require('../middlewares/authMiddleware')
const postsController = new PostsController(); // 가져온 모듈에 대한 클래스를 선언하는 부분이다
/** */
router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPostById);
router.post('/', authMiddleware, postsController.uploadPost);
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);

module.exports = router;
