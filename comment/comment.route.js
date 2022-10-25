const express = require('express');
const router = express.Router();

const CommentsController = require('./comment.controller');
const commentsController = new CommentsController();
const auth = require('../middlewares/authMiddleware')

// comments/
router.get('/:postId', commentsController.getComments);                   //덧글 열람하기
router.post('/:postId',auth, commentsController.createComment);                //덧글 작성하기
router.put('/:commentId', auth,commentsController.updateComment);              //덧글 수정하기
router.delete('/:commentId',auth, commentsController.deleteComment);          //덧글 삭제하기

module.exports = router;