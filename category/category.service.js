const { any } = require('joi');
const CategoryRepository = require('./category.repository')

class CategoryService {
    categoryRepository = new CategoryRepository();

    getCategoryPost = async(categoryId)=>{
        const categoryPost = await this.categoryRepository.findCategoryPost(categoryId)
        return categoryPost
    }
}

module.exports = CategoryService;