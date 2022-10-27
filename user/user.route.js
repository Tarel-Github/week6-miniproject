const { Router } = require('express');
const User = require('./user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
// const authLoginUserMiddleware = require('../middlewares/authLoginUserMiddleware');

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

router.get('/signout', User.signout);



router.get('/logout', (req, res, next)=>{
    console.log("LOGOUT ROUTE");
    req.logout((error)=>{
        console.log("LOGOUT CALLED");
        if (error) throw new Error('LOGOUT ERROR');
        res.json({ message: "LOGOUT SUCCESS" });
    })
})



module.exports = router;