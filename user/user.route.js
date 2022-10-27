const { Router } = require('express');
const User = require('./user.controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();


router.get('/users', User.findAll);

router.get('/user/', authMiddleware, User.findOne);

router.get('/user/profile', authMiddleware, User.profImage);


router.post('/signup', User.signup);

router.post('/dup', User.dupCheck);


router.patch('/profile/nickname', authMiddleware, User.nicknameUpdate);

router.patch('/profile/image', authMiddleware, User.profileUpdate);

router.delete('/:userId', authMiddleware, User.deleteUser);


router.post('/signin', User.localSign);

router.get('/signin/kakao/callback', User.kakaoSign);

router.get('/signout/:refreshToken', User.signout);


router.post('/form', (req, res, next)=>{
    console.log(req)

    res.json({
        body: req.body,
        files: req.files
    })
})


module.exports = router;