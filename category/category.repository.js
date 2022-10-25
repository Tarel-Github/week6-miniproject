<<<<<<< Updated upstream
const {Post} = require('../models/category')
=======
const {Post, Category} = require('../db/models')
>>>>>>> Stashed changes

class CategoryRepository {
    findCategoryPost = async(categoryId)=>{
        const categoryPost = await Post.findAll({
            where:{categoryId},
            // include: [{
            //     model: Post,
            //     exclude: ['contents']
            // }]
        })
        console.log(categoryPost)
        return categoryPost
    }    
}

module.exports = CategoryRepository;