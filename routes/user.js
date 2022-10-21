const { Router } = require('express');
const { User } = require('../controllers/user');


const router = Router();


router.post('/user', (req, res, next) => {
    const { profImg } = req.files;
    console.log(profImg.name);
    console.log(profImg.mimetype);

    const splitName = profImg.name.split('.');
    const extension = splitName[splitName.length-1]
    console.log(extension);

    res.send(req.files)
});

router.get('/user', User.findAll);

router.post('/signup', User.signup);

router.post('/signin', User.signin);

router.post('/dup', User.dupCheck);

router.patch('/profnick', User.nicknameUpdate);

router.patch('/profimg', User.profileUpdate);

router.delete('/:userId', User.deleteUser);


module.exports = router;