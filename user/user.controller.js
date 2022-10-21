const { User } = require('./user.service');
const { jwt } = require('../util/jwt');
const { InvalidParamsError } = require('../util/exception');
const { saveProfImg } = require('../util/resize');


class UserController {
    signup = async function(req, res, next) {
        const { email, password, confirm, nickname } = req.body;
        if (password !== confirm) 
            throw new InvalidParamsError('비밀번호가 일치하지 않습니다.');

        await User.signup({ email, password, nickname });

        res.status(200).json({
            message: "SUCCESS"
        });
    }

    signin = async function(req, res, next) {
        const { email, password } = req.body;        

        const payload = await User.signin({ email, password });
        const accessToken = jwt.sign(payload);
        const refreshToken = jwt.refresh();
        // cache refreshToken > redis!

        res.set({
            Authorization: `Bearer ${accessToken}`,
            refreshToken
        });
        res.status(200).json({
            message: '로그인되었습니다.'
        });
    }

    dupCheck = async function(req, res, next) {
        const { value } = req.body;

        const result = await User.dupCheck(value);

        res.status(200).json({
            result,
        });
    }

    nicknameUpdate = async function(req, res, next) {
        const { nickname } = req.body;
        const { userId } = req.app.locals.user;
        
        const result = User.nicknameUpdate({ userId, nickname });
        if (result) {
            const message = '';
        }

        res.status(200).json({
            message
        });
    }

    profileUpdate = async function(req, res, next) {
        if (!req.files) throw new InvalidParamsError('이미지를 업로드해 주세요.');
        const { profImg } = req.files;
        // const { userId } = req.app.locals.user;
        const userId = 1;

        if (profImg.mimetype.split('/')[0] !== 'image') throw new InvalidParamsError('이미지를 업로드해 주세요.');

        const imgPath = await saveProfImg(userId, profImg);
        const profImgPath = await User.profileUpdate(userId, imgPath);
        console.log(imgPath);

        res.status(200).json({
            message: 'SUCCESS',
        });
    }

    deleteUser = async function() {};

    findAll = async function(req, res, next) {
        const userList = await User.findAll();

        res.status(200).json({
            userList
        });
    };
}


exports.User = new UserController();