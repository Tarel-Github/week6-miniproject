const CategoryService = require('./category.service')

class CategoryController {
    categoryService = new CategoryService();

    getCategoryPosts = async(req,res,next)=>{
        // feild 도 body?
        const {categoryId} = req.params;
        const {name} = res.body;

    }
}

module.exports = CategoryController;