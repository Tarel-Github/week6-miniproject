const passport = require('passport');
const User = require('./user.service');
const { addUserToken, removeUserToken } = require('../db/cache');
const jwt = require('../util/jwt');
const ResizeAndSave = require('../util/resize');
const { signupSchema, signinSchema } = require('../util/validation');
const { InvalidParamsError } = require('../util/exception');


class UserController {
    signup = async function(req, res, next) {
        try {
            const { username, password, confirm, nickname }
                = await signupSchema.validateAsync(req.body);
            if (password !== confirm)
                throw new InvalidParamsError('비밀번호가 일치하지 않습니다.');
    
            await User.signup({ username, password, nickname });
    
            res.status(200).json({
                message: 'SUCCESS'
            });
            
        } catch (error) {
            next(error);
        }
    }

    dupCheck = async function(req, res, next) {
        try {
            const { value } = req.body;
            if (!value) throw new InvalidParamsError('입력값이 없습니다.');
    
            const result = await User.dupCheck(value);
    
            res.status(200).json({
                result,
            });
            
        } catch (error) {
            next(error)
        }
    }

    nicknameUpdate = async function(req, res, next) {
        try {
            const { nickname } = req.body;
            const { userId } = req.app.locals.user;
            
            await User.nicknameUpdate({ userId, nickname });
    
            res.status(200).json({
                message: 'SUCCESS'
            });
            
        } catch (error) {
            next(error);
        }
    }

    profileUpdate = async function(req, res, next) {
        try {
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
            
        } catch (error) {
            next(error);
        }
    }

    deleteUser = async function() {};

    findAll = async function(req, res, next) {
        try {
            const userList = await User.findAll();
    
            res.status(200).json({
                data: userList,
                session: req.session
            });
            
        } catch (error) {
            next(error);
        }
    };

    findOne = async function(req, res, next) {
        try {
            const { authorization, refreshtoken } = req.headers;
            if (!authorization || !refreshtoken) {
                    throw new Error('INVALID HEADER');
            }
            const accessToken = authorization.split(' ')[1];
            const { userId } = jwt.verify(accessToken);
            const user = await User.findOne(userId);
    
            res.status(200).json({
                data: user
            })
            
        } catch (error) {
            next(error);
        }
    }

    profMy = async function(req, res, next) {
        try {
            const { authorization, refreshtoken } = req.headers;
            if (!authorization || !refreshtoken) {
                    throw new Error('INVALID HEADER');
            }
            const accessToken = authorization.split(' ')[1];
            const { userId } = jwt.verify(accessToken);
            const user = await User.findOne(userId);
            es.sendFile(user.profMypage);
        } catch (error) {
            next(error);
        }
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
            if (payload instanceof Error) throw payload;

            const accessToken = jwt.sign(payload);
            const refreshToken = jwt.refresh();
            await addUserToken(refreshToken, payload.userId);
    
            res.cookie('Authorization', `Bearer ${accessToken}`);
            res.cookie('refreshToken', `Bearer ${refreshToken}`);
            res.status(200).json({
                message: '로그인되었습니다.',
                Authorization: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`
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

                    res.cookie('Authorization', `Bearer ${accessToken}`);
                    res.cookie('refreshToken', `Bearer ${refreshToken}`);
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
            message: 'SUCCESS'
        });
    }
}


module.exports = new UserController();