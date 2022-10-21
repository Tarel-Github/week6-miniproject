const express = require('express');
const jwt = require("jsonwebtoken")  
const { Op } = require("sequelize");   
const { User, Post, Comment } = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

//덧글 작성===============================================================
router.post("/:postId", /*authMiddleware,*/ async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body; 
    const ifPostId = await Post.findOne({ where: {postId} }); 
    try{
        if(!ifPostId){
            res.status(400).send({errorMessage:"없는 게시글입니다!"})
            return; 
        }
        if (!content){
            res.status(400).send({errorMessage: '댓글 내용을 입력해주세요'});
            return;
          } 
        const user=res.locals.user;  
        // if(!user){ 
        //     res.status(400).send({errorMessage:"로그인이 필요합니다."})
        //     return;  
        // }
        const userId= user.userId                  
        const post = await Post.findOne ({ where: {postId} })
        await Comment.create({ userId: user.userId, postId, content });
        res.status(201).send({"message": "덧글입력 성공!"});  
        
    }catch(error){
      return res.status(500).send({ errorMessage:error.message});
    }
});

//덧글 열람===============================================================

router.get("/:postId", async (req, res) => {
try {
    const { postId } = req.params;
    const comments = await Comment.findAll({where: { postId },
    include: [{model: User,attributes: ["nickname"],},],     
    order: [["createdAt", "DESC"]],
    });
    res.json({ result: comments });
} catch (error) {
    console.error(error);
    res.status(400).json({ errorMessage: error.message });
}
});

//덧글 수정===============================================================
router.put("/:commentId", authMiddleware, async (req, res) => {
try {
    const { commentId } = req.params;
    const { content } =req.body;          
    const user=res.locals.user;
    const comment = await Comment.findOne({where: {commentId}});              
    if (!comment)
        return res.status(400).send({ errorMessage: "존재하지 않는 댓글입니다." });
    
    if (comment.userId !== user.userId)
        return res.status(400).send({ errorMessage: "작성자 본인만 수정할 수 있습니다." });
    await Comment.update({ content }, { where: { commentId } });
    return res.status(200).send({ msg: "댓글이 수정되었습니다." });
} catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message });
}
});

//덧글 삭제===============================================================
router.delete("/:commentId", authMiddleware, async (req, res) => {
try {
    const { commentId } = req.params;
    const user=res.locals.user; 
    const comment = await Comment.findOne({where: {commentId}});
    if (!comment)
    return res.status(400).send({ errorMessage: "없는 댓글입니다." });
    if (comment.userId !== user.userId)
    return res.status(400).send({ errorMessage: "삭제 권한이 없습니다." });
    await Comment.destroy({ where: { commentId } });
    return res.status(200).send({ msg: "댓글이 삭제되었습니다." });
} catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message });
}
});
  

module.exports = router;