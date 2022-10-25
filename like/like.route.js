const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware')

const LikesController = require('./like.controller');
const likesController = new LikesController();

//좋아요 게시글 조회
router.get('/', auth, likesController.getPostLike)
//좋아요 등록 혹은 취소
router.put('/:postId', auth, likesController.updatePostLike)



module.exports = router;