const User = require('./user.repository');
const bcrypt = require('bcrypt');
const env = require('../config.env');
const { InvalidParamsError } = require('../util/exception');


class UserService {

    signup = async function(user) {
        user.password = await bcrypt.hash(user.password, env.SALT_ROUND);

        return await User.signup(user);
    }

    signin = async function(username, password) {
        const user = await User.findOne(username);
        if (user === null || !(await bcrypt.compare(password, user.get().password))) {
            return new Error('아이디, 비밀번호가 일치하지 않습니다.');
        }

        return {
            userId: user.userId,
            username,
            nickname: user.nickname
        };
    }

    kakaoSign = async function(nickname) {
        const user = await User.findKakaoUser(nickname);

        if (user) {
            return {
                userId: user.get().userId,
                username: user.get().username,
                nickname: user.get().nickname
            }
            
        } else {
            const newUser = await User.signup({
                username,
                password: 'kakao',
                nickname: username,
                provider: 'kakao'
            });
            return {
                userId: newUser.get().userId,
                username: newUser.get().username,
                nickname: newUser.get().nickname
            };
        }
    }

    dupCheck = async function(value) {
        const result = await User.findOne(value);
        return Boolean(result);
    }

    nicknameUpdate = async function({ userId, nickname }) {
        const result = await User.findOne(nickname);
        if (result) throw new InvalidParamsError('이미 사용중인 닉네임입니다.');

        return await User.updateNickname({ userId, nickname });
    }

    profileUpdate = async function(userId, imgPath) {
        return await User.updateProfImg(userId, imgPath);
    }

    deleteUser = async function() {};

    findAll = async function() {
        return await User.findAll();
    };

    findOne = async function(value) {
        const result = await User.findOne(value);
        return {
            userId: result.userId,
            username: result.username,
            nickname: result.nickname,
            profComment: result.profComment,
            profMypage: result.profMypage
        };
    };

}


module.exports = new UserService();