const CategoryService = require('./category.service')

class CategoryController {
    categoryService = new CategoryService();

    getCategoryPosts = async(req,res,next)=>{
        try{
            const {categoryId} = req.params;
            const CategoryPost = await this.categoryService.getCategoryPost(categoryId)
            res.status(200).json({data: CategoryPost})
        }catch(error){
            console.log(error)
            res.status(400).send({errorMessage: "카테고리 조회에 실패하였습니다"})
        }
    }
}

module.exports = CategoryController;