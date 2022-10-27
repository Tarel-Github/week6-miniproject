const { Posts, Categories } = require('../db/models');

class PostRepository {
    findPostById = async (postId) => {
        return await Posts.findByPk(postId);
    }

    findAllPost = async()=>{
        return await Posts.findAll({
            order: [['createdAt', 'DESC']]
        })
    }

    uploadPost = async(userId, categoryId, title, contents, postImg)=>{
        return await Posts.create({userId, categoryId, title, contents, postImg})
    }

    updatePost = async(postId, userId, categoryId, title, contents, postImg)=>{
        await Posts.update({categoryId, title, contents, postImg},{where:{postId, userId}})
    }

    deletePost = async(postId, userId)=>{
        return await Posts.destroy({where:{postId, userId}})
    }

    getCategoryByName = async(name) => {
        return await Categories.findOne({
            where: { name }
          })
    }
}

module.exports = PostRepository;