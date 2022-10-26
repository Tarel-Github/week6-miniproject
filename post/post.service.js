const PostRepository = require('./post.repository'); 

class PostService {
    postRepository = new PostRepository();

    findAllPost = async()=>{
        return await this.postRepository.findAllPost({})
    }

    findPostById = async(postId)=>{
        const findPostByIdData = await this.postRepository.findPostById(postId)
        if(!findPostByIdData)throw Error ("게시글이 존재하지 않습니다")
        return {
            postId: findPostByIdData.postId,
            userId: findPostByIdData.userId,
            categoryId: findPostByIdData.categoryId,
            title: findPostByIdData.title,
            contents: findPostByIdData.contents,
            likes: findPostByIdData.likes,
            createdAt: findPostByIdData.createdAt,
            updatedAt: findPostByIdData.updatedAt
        }
    }

    uploadPost = async(userId, categoryId, title, contents)=>{
        try{
            // 여기서 category name을 categoryId로 바꾸는 로직을 추가
            // const category = await this.postRepository.getCategoryByName(name); //{categoryId, name}
            // console.log(category)
            const uploadPostData = await this.postRepository.uploadPost(userId, categoryId, title, contents)
            // console.log(uploadPostData)
            if(!title || !contents) throw new Error ("게시글 내용을 작성해주세요")
            // 로직 수행 후 사용자에게 보여 줄 데이터 가공
            return {
                postId: uploadPostData.postId,
                userId: uploadPostData.userId,
                categoryId: uploadPostData.categoryId,
                title: uploadPostData.title,
                contents: uploadPostData.contents,
                likes: uploadPostData.likes,
                createdAt: uploadPostData.createdAt,
                updatedAt: uploadPostData.updatedAt
            }  
        }catch(error){
            console.log(error)
            return error;
        }
        
    }

    updatePost = async(postId, userId, categoryId,  title, contents)=>{
        const updatePostData = await this.postRepository.findPostById(postId)
        if(!updatePostData) throw new Error ("게시글이 존재하지 않습니다")
        if(updatePostData.userId !== userId) throw new Error ("게시글 작성자 본인이 아닙니다")
        await this.postRepository.updatePost(postId, userId, categoryId, title, contents);
        return {
            postId: updatePostData.postId,
            userId: updatePostData.userId,
            categoryId: updatePostData.categoryId,
            title: updatePostData.title,
            contents: updatePostData.contents,
            likes: updatePostData.likes,
            createdAt: updatePostData.createdAt,
            updatedAt: updatePostData.updatedAt,
        }
    }

    deletePost = async(postId, userId)=>{
        const deletePostData = await this.postRepository.findPostById(postId)
        if(!deletePostData) throw new Error ("게시글이 존재하지 않습니다")
        if(deletePostData.userId !== userId) throw new Error ("게시글 작성자 본인이 아닙니다")
        await this.postRepository.deletePost(postId, userId)
    }
}

module.exports = PostService;