const passport = require('passport');
const local = require('./stratLocal');
const kakao = require('./stratKakao');

const User = require('../user/user.repository');

module.exports = function() {
    passport.serializeUser((user, done)=>{
        console.log('SERIALIZE USER: ', user);
        done(null, user); 
    });

    passport.deserializeUser(async(user, done)=>{
        console.log('DESERIALIZE USER: ', user);
        const result = await User.findOne(user.userId);

        if (!result) return done(new Error('no user found'));

        return done(null, result);
    });

    local(); 
    kakao();   
}


// passport.serializeUser((user, cb)=>{
    //     process.nextTick(()=>{
    //         return cb(null, {
    //             userId: user.id,
    //             username: user.username,
    //             nickname: user.nickname
    //         });
    //     });
    // });
    
    // passport.deserializeUser((user, cb)=>{
    //     process.nextTick(()=>{
    //         return cb(null, user);
    //     });
    // });

    // require(path.join(__dirname, 'stratLocal'));


// const KAKAO_HOST='kauth.kakao.com';
// const KAKAO_URL = '/oauth/authorize'
//     + '?client_id=' + env.REST_API_KEY
//     + '&redirect_uri=' + env.REDIRECT_URI
//     + '&response_type=code';

// const REQ_URL = `https://${KAKAO_HOST}${KAKAO_URL}`;

// async function kakao() {
//     const response = await fetch(REQ_URL);
//     console.log(response);
// }

// kakao();