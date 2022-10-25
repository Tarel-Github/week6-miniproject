const LikesService = require('./like.service');

class LikesController{
    likeService = new LikesService();
    //좋아요 게시글 조회 //없으면 빈 데이터를 반환해야 함.
    getPostLike = async (req, res, next) => {
        try {
            //#########################
            //const userId = 1 //로그인 기능 구현시 수정 필요
            const { userId } = res.locals.user;                             //로그인한 유저의 userId를 가져오고
            //#########################  

            const Likes = await this.likeService.getPostLike(userId, );     //그 데이터를 서비스에 보내고 받아온 정보를
            res.status(200).json({ data: Likes });                          //리스폰 상태에 넣는다.
        } catch (error) {
            next(error);
        }
    };

    //게시글 좋아요 등록 혹은 취소
    updatePostLike = async (req, res, next) => {
        try {
            const { postId } = req.params;                      //postId를 파람스로부터 가져옴

            //#########################
            //const userId = 2 //로그인 기능 구현시 수정 필요
            const { userId } = res.locals.user;                             //로그인한 유저의 userId를 가져오고
            //#########################     
            
            const Likes = await this.likeService.updatePostLike(userId, postId);    //위의 두개를 서비스로 보내고 받아온 값을
            res.status(200).json({ data: Likes });              //리스폰 상태창에 보낸다.
        } catch (error) {
            next(error);
        }
    };

}


module.exports = LikesController;