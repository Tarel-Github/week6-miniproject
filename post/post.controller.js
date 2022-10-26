const PostService = require('./post.service');

class PostsController {
    postService = new PostService();

    getPosts = async(req,res,next)=>{
        try{
            const findAllPost = await this.postService.findAllPost()
            res.status(200).json({data :findAllPost})
        }catch(error){
            console.log(error)
            res.status(400).send({errorMessage : "게시글을 불러오는 데에 실패하였습니다"})
        }
        
    }

    getPostById = async(req,res,next)=>{
        try{
            const {postId} = req.params;
            const findPostByIdData = await this.postService.findPostById(postId)
            res.status(200).json({data : findPostByIdData}) 
        }catch(error){
            console.log(error)
            res.status(400).send({errorMessage : "게시글을 불러오는 데에 실패하였습니다"})
        }
    }

    uploadPost = async(req,res,next)=>{
        try{
            const { userId } = res.locals.user;
            const { name, title, contents } = req.body;
            const uploadPostData = await this.postService.uploadPost(userId, name, title, contents);
            res.status(201).json({data : uploadPostData, msg : "게시글이 작성되었습니다"});
        }catch(error){
            console.log(error)
            res.status(400).send({msg:"게시글 작성하는 데에 실패하였습니다"})
        }
    }

    updatePost = async(req,res,next)=>{
        try{
            const { postId } = req.params;
            const { userId } = res.locals.user;
            const {categoryId, title, contents} = req.body;
            const updatePostData = await this.postService.updatePost(postId, userId, categoryId, title, contents)
            res.status(201).json({data : updatePostData});
        }catch(error){
            console.log(error)
            res.status(400).send({errorMessage : "게시글을 수정하는 데에 실패하였습니다"})
        }
    }

    deletePost = async(req,res,next)=>{
        try{
            const {postId} = req.params;
            const { userId } = res.locals.user;
            const deletePostData = await this.postService.deletePost(postId, userId)
            res.status(200).json({data : deletePostData, msg : "게시글이 삭제되었습니다"})
        }catch(error){
            console.log(error)
            res.status(400).send({errorMessage : "게시글을 삭제하는 데에 실패하였습니다"})
        }
    }
}

module.exports = PostsController;