const { Router } = require('express');
const passport = require('passport');
const { User } = require('./user.controller');

const router = Router();


router.get('/user', User.findAll);

router.post('/signup', User.signup);

router.post('/signin', passport.authenticate('local'), User.localSign);

router.get('/auth/kakao', passport.authenticate('kakao'));

router.get('/callback', User.kakaoSign);

router.post('/dup', User.dupCheck);

router.patch('/profnick', User.nicknameUpdate);

router.patch('/profimg', User.profileUpdate);

router.delete('/:userId', User.deleteUser);


/**
 * refreshToken 정보를 저장하는 서버 DB를 날려버립니다.
 * 절대주의!!
 */
router.get('/reloadCache', User.reloadCache);




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