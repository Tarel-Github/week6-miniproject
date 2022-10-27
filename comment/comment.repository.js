const { Users, Posts, Comments } = require('../db/models');          //모델 데이터를 가져오고

class CommentRepository {

    Comment = new Comments()

    //덧글 찾기
    findComment = async (postId) =>{
        const comments = await Comment.findAll({
            where: { postId },
            include: {
                model: Users, 
                attributes: ["nickname"]
            },   
            order: [["createdAt", "DESC"]],
          });
        return comments;
    }

    //포스트 아이디를 기반으로 포스트 찾기
    findPostById = async (postId) => { 
        const post = await Posts.findByPk(postId);
        return post;
    };

    //덧글 추가
    createComment = async (comment, userId, postId) => {
        const createCommentData = await Comments.create({comment, userId, postId});
        return createCommentData;
    }

    //덧글 수정
    updateComment = async (commentId, comment, userId) => {
        const commentAu = await Comments.findByPk(commentId); 
        const commentAuId = commentAu.userId  
        if(userId !== commentAuId){    
            return;
        }
        const updateCommentData = await Comments.update({comment}, {where: {commentId}})
        return updateCommentData
    }

    //덧글 삭제
    deleteComment = async (commentId, userId) => {
        const commentAu = await Comments.findByPk(commentId); 
        const commentAuId = commentAu.userId 
        if(userId !== commentAuId){                 
            return;
        }
            const updateCommentData = await Comments.destroy({where: {commentId}})
        return updateCommentData
    }

}

module.exports = CommentRepository ;