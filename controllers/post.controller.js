const PostService = require('../services/post.service');

class PostsController {
    postService = new PostService();

    uploadPost = async(req,res,next)=>{
        // const {user} = res.locals;
        // console.log(user)
        const { nickname, password, title, content } = req.body;
        const uploadPostData = await this.postService.uploadPost(nickname, password, title, content);
        res.status(201).json({data : uploadPostData});
    }
    updatePost = async(req,res,next)=>{
        const {postId} = req.params;
        const {password, title, content} = req.body;
        const updatePostData = await this.postService.updatePost(postId, password, title, content)
        res.status(201).json({data : updatePostData});
    }
}

module.exports = PostsController;