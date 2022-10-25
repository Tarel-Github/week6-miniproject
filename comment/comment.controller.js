const CommentService = require('./comment.service');

class CommentsController {
    commentService = new CommentService();

    getComments = async(req, res, next) => {
        const {postId} = req.params;//포스트의 아이디를 가져와야 함
        const comments = await this.commentService.findComment(postId);//포스트서비스의 findAllPost를 사용
        res.status(200).json({data:comments});//컨트롤러는 요청과 응답에 관여하니 응답만
    }

    createComment= async(req, res, next) =>{
        const { postId } = req.params;  //덧글을 작성할 포스트
        const { content } =req.body;    //덧글의 내용

        try{
            if (!content){
                res.status(400).send({errorMessage: '댓글 내용을 입력해주세요'});//덧글 내용이 없다면 덧글을 입력해달라는 메시지 출력
                return;
            } 

            //#########################
            //const userId = 1 //로그인 기능 구현시 수정 필요
            const user=res.locals.user;                     //로그인중인 유저의 정보를 가져온다.
            const userId = user.userId                       //로그인 유저의 아이디를 가져옴
            //#########################


            const post = await this.commentService.findPost(postId)//덧글을 달 포스트를 찾는다.
            const a = post.postId  
            const createCommentData = await this.commentService.createComment(content, userId, a )
            res.status(201).send({data: createCommentData});  
       
        }catch(error){
          return res.status(500).send({ errorMessage:error.message});
        }
    };

    updateComment = async (req, res, next) => {
        const {commentId} = req.params;     //수정하고자 하는 코멘트의 아이디를 가져옴
        const { content }= req.body;        //수정 내용을 가져오기

        //#########################
        //const userId = 1 //로그인 기능 구현시 수정 필요
        const user=res.locals.user;                     //로그인중인 유저의 정보를 가져온다.
        const userId = user.userId                       //로그인 유저의 아이디를 가져옴
        //#########################

        const updateComment = await this.commentService.updateComment(commentId,content,userId)

        if(!updateComment){
            res.status(400).send({errorMessage:"수정권한이 없습니다."})
            return;  
        }

        res.status(200).json({Message: "덧글 수정 성공"})
    };

    deleteComment = async (req, res, next) => {
        try{
        const {commentId} = req.params;   

        //#########################
        //const userId = 1 //로그인 기능 구현시 수정 필요
        const user=res.locals.user;                     //로그인중인 유저의 정보를 가져온다.
        const userId = user.userId                       //로그인 유저의 아이디를 가져옴
        //#########################

        const deleteComment = await this.commentService.deleteComment(commentId, userId);
        if(!deleteComment){
            res.status(400).send({errorMessage:"삭제권한이 없습니다."})
            return;  
        }
        res.status(200).json({data: deleteComment});
        }catch(error){
            return res.status(400).send({ errorMessage:"수정 실패."});
        }
    }

}
module.exports = CommentsController;