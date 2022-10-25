const passport = require('passport');
const User = require('./user.service');
const { addUserToken, removeUserToken } = require('../db/cache');
const jwt = require('../util/jwt');
const ResizeAndSave = require('../util/resize');
const { InvalidParamsError } = require('../util/exception');


class UserController {
    signup = async function(req, res, next) {
        const { username, password, confirm, nickname } = req.body;
        if (password !== confirm) {
            next(new InvalidParamsError('비밀번호가 일치하지 않습니다.'));
        }

        await User.signup({ username, password, nickname });

        res.status(200).json({
            message: "SUCCESS"
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
        
        await User.nicknameUpdate({ userId, nickname });

        res.status(200).json({
            message: 'SUCCESS'
        });
    }

    profileUpdate = async function(req, res, next) {
        if (!req.files) throw new InvalidParamsError('이미지를 업로드해 주세요.');
        const { profImg } = req.files;
        // const { userId } = req.app.locals.user;
        const userId = 1;

        if (profImg.mimetype.split('/')[0] !== 'image')
            throw new InvalidParamsError('이미지를 업로드해 주세요.');

        const imgPath = await ResizeAndSave.profImg(userId, profImg);
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
            data: userList,
            session: req.session
        });
    };

    findOne = async function(req, res, next) {
        const { userId } = req.params;
        const user = await User.findOne(userId);

        res.status(200).json({
            data: user
        });
    }

    // signin = async function(req, res, next) {
    //     const { username, password } = req.body;        

    //     const payload = await User.signin({ username, password });
    //     const accessToken = jwt.sign(payload);
    //     const refreshToken = jwt.refresh();
    //     await cache.addUserToken(refreshToken, payload.userId);

    //     res.set({
    //         Authorization: `Bearer ${accessToken}`,
    //         refreshToken
    //     });
    //     res.status(200).json({
    //         message: '로그인되었습니다.'
    //     });
    // }

    localSign = async function(req, res, next) {
        console.log('req.user: ', req.user);
        try {
            const payload = req.user;
            const accessToken = jwt.sign(payload);
            const refreshToken = jwt.refresh();
            await addUserToken(refreshToken, payload.userId);
    
            res.set({
                Authorization: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`
            });
            res.status(200).json({
                message: '로그인되었습니다.'
            });
            
        } catch (error) {
            next(error);
        }
    }

    kakaoSign = async function(req, res, next) {
        try {
            passport.authenticate(
                'kakao',
                { failureRedirect: '/user' }, // 프론트 페이지 연결
                async (err, user, info) => {
                    if (err) return next(err);
    
                    const accessToken = jwt.sign(user);
                    const refreshToken = jwt.refresh();
                    await addUserToken(refreshToken, user.userId);

                    res.set({
                        Authorization: `Bearer ${accessToken}`,
                        refreshToken: `Bearer ${refreshToken}`
                    });
                    res.status(200).json({
                        message: '로그인되었습니다.'
                    });
                }
            )(req, res, next);
          } catch (error) {
            next(error);
          }
    }

    signout = async function(req, res, next) {
        const refreshToken = req.headers?.refreshtoken.split(' ')[1];
        await removeUserToken(refreshToken)

        res.status(200).json({
            message: "SUCCESS"
        });
    }
}


module.exports = new UserController();