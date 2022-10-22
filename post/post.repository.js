const { Post } = require('../models');

class PostRepository {
    findPostById = async (postId) => {
        return await Post.findByPk(postId);
    }

<<<<<<< Updated upstream
    findAllPost = async()=>{
        return await Post.findAll({
            attributes: { exclude: ['contents'] }, order: [['createdAt', 'DESC']]
        })
    }

    uploadPost = async(userId, categoryId, title, contents)=>{
        return await Post.create({categoryId, userId, title, contents})
    }

    updatePost = async(userId, categoryId, postId, title, contents)=>{
        return await Post.update({title, contents},{where:{postId, userId, categoryId, }})
    }

    deletePost = async(postId)=>{
        return await Post.destroy({where:{postId}})
=======
    uploadPost = async(title, contents)=>{
        const uploadPostData = await Post.create({title, contents})
        return uploadPostData;
    }

    updatePost = async(postId, title, contents)=>{
        const updatePostData = await Post.update({contents,title},{where:{postId}})
        return updatePostData;
>>>>>>> Stashed changes
    }
}

module.exports = PostRepository;