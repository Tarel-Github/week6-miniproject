const { Post } = require('../db/models');

class PostRepository {
    findPostById = async (postId) => {
        return await Post.findByPk(postId);
    }

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
    }
}

module.exports = PostRepository;