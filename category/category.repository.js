const {Posts} = require('../db/models')

class CategoryRepository {
    findCategoryPost = async(categoryId, name)=>{
        const categoryPost = await Posts.findAll({
            where:{categoryId}, order: [['createdAt', 'DESC']]
        })
        return categoryPost
    }    
}

module.exports = CategoryRepository;