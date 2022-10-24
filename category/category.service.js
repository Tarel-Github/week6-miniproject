const CategoryRepository = require('./category.repository')

class CategoryService {
    categoryRepository = new CategoryRepository();
}

module.exports = CategoryService;