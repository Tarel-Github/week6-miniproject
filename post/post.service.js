const PostRepository = require('./post.repository'); 

class PostService {
    postRepository = new PostRepository();

    uploadPost = async(nickname, password, title, content)=>{
        const uploadPostData = await this.postRepository.uploadPost(nickname, password, title, content)
        if(!title || !content) throw new Error ("게시글 내용을 작성해주세요")
        // 로직 수행 후 사용자에게 보여 줄 데이터 가공
        return {
            postId: uploadPostData.null,
            // userId: uploadPostData.userId,
            nickname: uploadPostData.nickname,
            title: uploadPostData.title,
            contents: uploadPostData.contents,
            likes: uploadPostData.likes,
            createdAt: uploadPostData.createdAt,
            updatedAt: uploadPostData.updatedAt
        }
    }

    updatePost = async(postId, password, title, content)=>{
        // const updatePostData = await this.postRepository.updatePost(postId, password, title, content)
        // const findPostId = await this.postRepository.findPostById(postId)
        // return {
        //     postId: updatePostData.null,
        //     // userId: uploadPostData.userId,
        //     nickname: updatePostData.nickname,
        //     title: updatePostData.title,
        //     contents: updatePostData.contents,
        //     likes: updatePostData.likes,
        //     createdAt: updatePostData.createdAt,
        //     updatedAt: updatePostData.updatedAt
        // }

        await this.postRepository.updatePost(postId, password, title, content);

        const updatePostData = await this.postRepository.findPostById(postId);

        return {
            postId: updatePostData.null,
            // userId: uploadPostData.userId,
            nickname: updatePostData.nickname,
            title: updatePostData.title,
            contents: updatePostData.contents,
            likes: updatePostData.likes,
            createdAt: updatePostData.createdAt,
            updatedAt: updatePostData.updatedAt
        };
    }
}

module.exports = PostService;