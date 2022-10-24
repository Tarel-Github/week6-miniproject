const PostService = require('./post.service');

class PostsController {
    postService = new PostService();

    getPosts = async(req,res,next)=>{
        const findAllPost = await this.postService.findAllPost()
        res.status(200).json({data :findAllPost})
    }

    getPostById = async(req,res,next)=>{
        const {postId} = req.params;
        const findPostByIdData = await this.postService.findPostById(postId)
        res.status(200).json({data : findPostByIdData})
    }

    uploadPost = async(req,res,next)=>{
        // const {user} = res.app.locals;
        const userId = 1
        const categoryId = 2
        const { title, contents } = req.body;
        // const {categoryId, title, contents } = req.body;
        const uploadPostData = await this.postService.uploadPost(userId, categoryId, title, contents);
        res.status(201).json({data : uploadPostData, msg : "게시글이 작성되었습니다"});
    }
    updatePost = async(req,res,next)=>{
        const {postId} = req.params;
        const userId = 1
        const categoryId = 2
        const {title, contents} = req.body;
        const updatePostData = await this.postService.updatePost(postId, userId, categoryId, title, contents)
        res.status(201).json({data : updatePostData});
    }
    deletePost = async(req,res,next)=>{
        const {postId} = req.params;
        await this.postService.deletePost(postId)
        res.status(200).json({msg : "게시글이 삭제되었습니다"})
    }
}

module.exports = PostsController;