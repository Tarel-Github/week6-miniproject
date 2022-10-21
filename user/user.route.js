const { Router } = require('express');
const { User } = require('./user.controller');
const sharp = require('sharp');


const router = Router();


router.post('/user', async(req, res, next) => {
    const { profImg } = req.files;
    console.log(profImg);

    const { env } = require('../config.env');

    const dirPath = env.ROOT + env.PROF_DIR;

    const buffer = profImg.data;
    const output = await sharp(buffer)
        .toFormat('webp')
        .resize({
            width: 200,
            height: 200,
            fit: 'cover'
        })
        .toFile(`${dirPath}cover.webp`);
    console.log(output);
    // const splitName = profImg.name.split('.');
    // const extension = splitName[splitName.length-1]
    // console.log(extension);

    res.send(output)
});

router.get('/user', User.findAll);

router.post('/signup', User.signup);

router.post('/signin', User.signin);

router.post('/dup', User.dupCheck);

router.patch('/profnick', User.nicknameUpdate);

router.patch('/profimg', User.profileUpdate);

router.delete('/:userId', User.deleteUser);


module.exports = router;