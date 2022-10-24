
const LikesRepository = require('./like.repository');

class LikesService {
    likeRepository = new LikesRepository();

    //좋아요 게시글 조회
    getPostLike = async (userId ) => {                                      //컨트롤러로부터 userId를 가져오고
        const Likes = await this.likeRepository.getPostLike({userId});      //리포지토리에 userId를 보내고 그 결과를 Likes에 받아온다.
        let likeList = [];                                                  //배열을 만들고
        for( const like of Likes ){
            likeList.push({ Post : like.Post })                 //리포에서 받아온 결과를 순차적으로 배열에 넣는다.
        }
        return likeList.sort((a, b) => {                        //그 배열을 정렬한후 다시 컨트롤러에 보낸다.
        return b.likes - a.likes;
        });

    };

    //좋아요 버튼을 누른 경우
    updatePostLike = async (userId, postId) => {                            //컨트롤러로부터 userId와 postId를 받아옴
        const findPost = await this.likeRepository.findPostById(postId);    //리포에서 postId를 바탕으로 좋아요를 할 포스트를 찾아옴
        //if (!findPost) throw new InvalidParamsError('게시글이 없음.');      //만약 없는 포스트라면 에러, 단 아직 관련 파일을 만들지 않았음!
        const isLike = await this.likeRepository.findPostLike({ userId, postId });  // userId와 postId를 리포로 보내서 좋아요 여부를 확인해옴
        if (!isLike) {
          const LikeData = await this.likeRepository.createPostLike({userId, postId});//없다면 좋아요를 하지 않았다는 뜻이니 좋아요를 한 것으로 만들어주자
          return {
           LikeData                                                     //좋아요를 했으니 해당 값을 서비스로 보낸다.
          };
        } else if (isLike) {
          const LikeData = await this.likeRepository.deletePostLike({userId,postId,});  //있다면 좋아요를 했다는 뜻이니 취소해주자.
          return {
            LikeData                                                //좋아요 취소를 했으니 해당 값을 서비스로 보낸다.
          };
        } else {
          throw new ValidationError('싫어요');
        }
      };

}

module.exports = LikesService;
