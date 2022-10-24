const { Post, Like } = require('../models');
const { Op } = require('sequelize');


class LikesRepository {
    constructor(){
        this.Post = Post;
    }
    
    //Id를 기반으로 post를 찾는다.
    findPostById = async (postId) => {
        const post = await this.Post.findByPk(postId); //받아온 아이디로 post를 찾아서 리턴
        return post;
    };

    //좋아요 게시물 조회 : 토큰필요
    getPostLike = async ({ userId }) => {               //서비스로부터 userId를 받아온다.
        const Likes = await Like.findAll({              //모델의 like.js 파일에서 모든것을 찾아오나
        where: { userId },                              //유저아이디가 일치하는 것을 가져온다.
        include: [
            {
                model: Post,                                //모델의 Post값을 가져온다.
                key: 'postId',
                attributes: ['postId', 'userId', 'nickname', 'title', 'createdAt', 'updatedAt', 'likes'],
            },
        ],
        });
    
        return Likes;   //그렇게 찾아온 값을 서비스로 보낸다.
    };

    //좋아요 게시글이 없다면
    findPostLike = async ({ userId, postId }) => {
        const isLike = await Like.findOne({
        where: {
            [Op.and]: [{ userId }, { postId }],
        },
        });

        return isLike;
    };

    //좋아요 등록
    createPostLike = async ({ userId, postId }) => {
        await Post.increment({ likes: 1 }, { where: { postId } });
        const createLikeData = await Like.create({ postId, userId });
        return createLikeData;
    };

    //좋아요 취소
    deletePostLike = async ({ userId, postId }) => {
        await Post.decrement({ likes: 1 }, { where: { postId } });
        const deleteLikeData = await Like.destroy({
        where: {
            [Op.and]: [{ userId }, { postId }],
        },
        });

        return deleteLikeData;
    };


}

module.exports = LikesRepository
