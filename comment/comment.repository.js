const { User, Post, Comment } = require('../models');          //모델 데이터를 가져오고

class CommentRepository {


    //덧글 찾기
    findComment = async (postId) =>{
        const comments = await Comment.findAll({where: { postId },   
            include: [{model: User,attributes: ["nickname"],},],   
            order: [["createdAt", "DESC"]],
          });

        return comments;
    }

    // findPostById = async (postId) => {              //아이디를 기반으로 포스트 찾기
    //     const post = await Post.findByPk(postId);
    //     return post;
    // };

    // createComment = async (content, userId, postId) => {
    //     const createCommentData = await Comment.create({content, userId, postId});//이게 문제다
    //     return createCommentData;
    // }

    // updateComment = async (commentId, content, userId) => {
    //     const commentAu = await Comment.findByPk(commentId); //수정하고자 하는 코멘트를 가져옴
    //     const commentAuId = commentAu.userId            //그 코멘트의 유저 아이디를 가져옴
    //     if(userId !== commentAuId){                     //로그인 ID가 작성자 ID와 다르면 아무것도 하지 않고 리턴
    //         return;
    //     }
    //     const updateCommentData = await Comment.update({content}, {where: {commentId}})
    //     return updateCommentData
    // }

    // deleteComment = async (commentId, userId) => {
    //     const commentAu = await Comment.findByPk(commentId); //수정하고자 하는 코멘트를 가져옴
    //     const commentAuId = commentAu.userId            //그 코멘트의 유저 아이디를 가져옴
    //     if(userId !== commentAuId){                     //로그인 ID가 작성자 ID와 다르면 아무것도 하지 않고 리턴
    //         return;
    //     }
    //         const updateCommentData = await Comment.destroy({where: {commentId}})
    //     return updateCommentData
    // }

}

module.exports = CommentRepository ;