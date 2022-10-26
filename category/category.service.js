const CategoryRepository = require('./category.repository')

class CategoryService {
    categoryRepository = new CategoryRepository();

    getCategoryPost = async(categoryId,name)=>{
        const categoryPost = await this.categoryRepository.findCategoryPost(categoryId)
        return categoryPost
    }
}

module.exports = CategoryService;