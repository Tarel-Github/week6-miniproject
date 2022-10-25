const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../db/models');
const env = require('../config.env');

module.exports = function() {
    passport.use(new KakaoStrategy(
        {
            clientID: env.REST_API_KEY,
            callbackURL: env.REDIRECT_URI
        },
        async function(accessToken, refreshToken, profile, done) {
            console.log('accessToken: ', accessToken);
            console.log('refreshToken: ', refreshToken);
            console.log('profile: ', profile);

            try {
                const user = await User.findOne({
                    where: { 
                        username: profile.username,
                        provider: 'kakao'
                    },
                    attributes: {
                        exclude: ['password']
                    }
                });
    
                if (user) {
                    console.log('KAKAO LOGIN: ', user);
                    const payload = {
                        userId: user.get().userId,
                        username: user.get().username,
                        nickname: user.get().nickname
                    }
                    return done(null, payload);
                } else {
                    const newUser = await User.create({
                        username: profile.username,
                        password: 'kakao',
                        nickname: profile.displayName,
                        provider: 'kakao'
                    });
                    console.log('KAKAO SIGNUP', newUser);
                    const payload = {
                        userId: newUser.get().userId,
                        username: newUser.get().username,
                        nickname: newUser.get().nickname
                    }
                    return done(null, payload)
                }

            } catch (error) {
                console.log('KAKAO STRATEGY ERROR');
                done(error);
            }
        }
    ));
}