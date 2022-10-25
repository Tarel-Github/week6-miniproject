const express = require('express');
const router = express.Router();
//const authMiddleware = require('../middlewares/authMiddlewars')

const LikesController = require('./like.controller');
const likesController = new LikesController();

//좋아요 게시글 조회
router.get('/', /*authMiddleware,*/likesController.getPostLike)
//좋아요 등록 혹은 취소
router.put('/:postId', /*authMiddleware,*/ likesController.updatePostLike)



module.exports = router;