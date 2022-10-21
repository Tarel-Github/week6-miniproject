// URI와 미들웨어, HTTP메서드를 설정 / 컨트롤러와 연결하는 역할
const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/post.controller');
const postsController = new PostsController(); // 가져온 모듈에 대한 클래스를 선언하는 부분이다

// router.get('/', postsController.getPosts);
// router.get('/:postId', postsController.getPostById);
router.post('/', postsController.uploadPost);
router.put('/:postId', postsController.updatePost);
// router.delete('/:postId', postsController.deletePost);

module.exports = router;