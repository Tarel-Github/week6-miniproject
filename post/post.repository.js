const { Posts } = require('../db/models');

class PostRepository {
    findPostById = async (postId) => {
        return await Posts.findByPk(postId);
    }

    findAllPost = async()=>{
        return await Posts.findAll({
            attributes: { exclude: ['contents'] }, order: [['createdAt', 'DESC']]
        })
    }

    uploadPost = async(userId, categoryId, title, contents)=>{
        return await Posts.create({categoryId, userId, title, contents})
    }

    updatePost = async(userId, categoryId, postId, title, contents)=>{
        return await Posts.update({title, contents},{where:{postId, userId, categoryId, }})
    }

    deletePost = async(postId)=>{
        return await Posts.destroy({where:{postId}})
    }
}

module.exports = PostRepository;