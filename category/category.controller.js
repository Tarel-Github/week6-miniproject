const CategoryService = require('./category.service')

class CategoryController {
    categoryService = new CategoryService();

    getCategoryPosts = async(req,res,next)=>{
        // feild 도 body?
        const {categoryId} = req.params;
        const name = "자기관리"
        // const {name} = res.body;
        const CategoryPost = await this.categoryService.getCategoryPost(categoryId, name)
        res.status(200).json({data: CategoryPost})
    }
}

module.exports = CategoryController;