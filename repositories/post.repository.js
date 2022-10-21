const { Post } = require('../models');

class PostRepository {
    findPostById = async (postId) => {
        const post = await Post.findByPk(postId);
        return post;
    }

    uploadPost = async(nickname, password, title, content)=>{
        const uploadPostData = await Post.create({nickname, password, title, content})
        return uploadPostData;
    }

    updatePost = async(postId, password, title, content)=>{
        const updatePostData = await Post.update({content,title},{where:{postId,password}})
        return updatePostData;
    }
}

module.exports = PostRepository;