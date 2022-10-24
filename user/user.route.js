const { Router } = require('express');
const { User } = require('./user.controller');

const router = Router();


router.post('/user', async(req, res, next) => {
    res.send('TEST');
});

router.get('/user', User.findAll);

router.post('/signup', User.signup);

router.post('/signin', User.signin);

router.post('/dup', User.dupCheck);

router.patch('/profnick', User.nicknameUpdate);

router.patch('/profimg', User.profileUpdate);

router.delete('/:userId', User.deleteUser);


/**
 * refreshToken 정보를 저장하는 서버 DB를 날려버립니다.
 * 절대주의!!
 */
router.get('/reloadCache', User.reloadCache);


module.exports = router;