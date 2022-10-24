const { User, Post, Comment } = require('../db/models');          //모델 데이터를 가져오고

class CommentRepository {


    //덧글 찾기
    findComment = async (postId) =>{
        const comments = await Comment.findAll({where: { postId },   
            include: [{model: User,attributes: ["nickname"],},],   
            order: [["createdAt", "DESC"]],
          });
        return comments;
    }

    //포스트 아이디를 기반으로 포스트 찾기
    findPostById = async (postId) => { 
        const post = await Post.findByPk(postId);
        return post;
    };

    //덧글 추가
    createComment = async (content, userId, postId) => {
        const createCommentData = await Comment.create({content, userId, postId});
        return createCommentData;
    }

    //덧글 수정
    updateComment = async (commentId, content, userId) => {
        const commentAu = await Comment.findByPk(commentId); 
        const commentAuId = commentAu.userId  
        if(userId !== commentAuId){    
            return;
        }
        const updateCommentData = await Comment.update({content}, {where: {commentId}})
        return updateCommentData
    }

    //덧글 삭제
    deleteComment = async (commentId, userId) => {
        const commentAu = await Comment.findByPk(commentId); 
        const commentAuId = commentAu.userId 
        if(userId !== commentAuId){                 
            return;
        }
            const updateCommentData = await Comment.destroy({where: {commentId}})
        return updateCommentData
    }

}

module.exports = CommentRepository ;