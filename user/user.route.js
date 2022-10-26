const { Router } = require('express');
const passport = require('passport');
const User = require('./user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
// const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

const router = Router();


router.get('/users', User.findAll);

router.get('/user/', authMiddleware, User.findOne);

router.get('/user/profile', authMiddleware, User.profMy);

router.post('/signup', User.signup);

router.post('/dup', User.dupCheck);

router.patch('/profile/nickname', authMiddleware, User.nicknameUpdate);

router.patch('/profile/image', authMiddleware, User.profileUpdate);

router.delete('/:userId', authMiddleware, User.deleteUser);


router.post('/signin', passport.authenticate('local'), User.localSign);

router.get('/auth/kakao', passport.authenticate('kakao'));

router.get('/auth/kakao/callback', User.kakaoSign);

router.get('/signout', User.signout);



/**
 * 개발용 도구
 * 배포 전에 삭제
 */
router.get('/user/session', (req, res, next)=>{
    console.log('req.user: ', req.user);

    res.json({
        session: req.session,
        cookies: req.cookies
    })
})

router.get('/logout', (req, res, next)=>{
    console.log("LOGOUT ROUTE");
    req.logout((error)=>{
        console.log("LOGOUT CALLED");
        if (error) throw new Error('LOGOUT ERROR');
        res.json({ message: "LOGOUT SUCCESS" });
    })
})

router.get('/me', passport.authorize('local'), (req, res, next)=>{
    console.log('req.user: ', req.user);

    res.json({
        user: req.user
    })
})


router.post('/user', async(req, res, next) => {
    res.send('TEST');
});


module.exports = router;