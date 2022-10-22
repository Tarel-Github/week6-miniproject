const CommentRepository = require("./comment.repository");//리포지토리의 내용을 가져와야한다.

class CommentService{
    commentRepository = new CommentRepository();

    //특정 포스트의 모든 덧글을 가져옴
    findComment =async (postId) => {
        const findComment = await this.commentRepository.findComment(postId);
        return findComment;
    }

    //덧글 달 게시글을 찾기
    findPost = async (postId) => {
        const findPost = await this.commentRepository.findPostById(postId);
        return findPost;
    }

    //덧글 달기
    createComment = async (content, userId, postId) => {
        const createComment = await this.commentRepository.createComment(content,/* userId,*/ postId);
        return createComment
    }

    //덧글 수정하기
    updateComment= async (commentId, content, userId) => {
        const createComment = await this.commentRepository.updateComment(commentId, content, userId);
        return createComment
    }

    //덧글 삭제하기
    deleteComment= async (commentId, userId) => {
        const createComment = await this.commentRepository.deleteComment(commentId, userId);
        return createComment
    }
}

module.exports = CommentService;