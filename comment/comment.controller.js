const { Comment } = require('./comment.service');
const { jwt } = require('../util/jwt');
const { InvalidParamsError } = require('../util/exception');
const { saveProfImg } = require('../util/resize');


class CommentsController {

    getComment = async function(req, res, next) {
        const { postId } = req.body;
        const comments = await this.commentService.findComment(postId);
        res.status(200).json({data:comments});
    }

    // uploadComment = async function(req, res, next) {
    //     const { comment } = req.body;
    //     if (password !== confirm) 
    //         throw new InvalidParamsError('비밀번호가 일치하지 않습니다.');
    //     await User.signup({ email, password, nickname });

    //     res.status(200).json({
    //         message: "SUCCESS"
    //     });
    // }


    // updateComment = async function(req, res, next) {
    //     const { comment } = req.body;
    //     if (password !== confirm) 
    //         throw new InvalidParamsError('비밀번호가 일치하지 않습니다.');

    //     await User.signup({ email, password, nickname });

    //     res.status(200).json({
    //         message: "SUCCESS"
    //     });
    // }


    // deleteComment = async function(req, res, next) {
    //     const { comment } = req.body;
    //     if (password !== confirm) 
    //         throw new InvalidParamsError('비밀번호가 일치하지 않습니다.');

    //     await User.signup({ email, password, nickname });

    //     res.status(200).json({
    //         message: "SUCCESS"
    //     });
    // }

}


exports.User = new CommentsController();