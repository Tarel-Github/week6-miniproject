const { User } = require('./user.repository');
const bcrypt = require('bcrypt');
const env = require('../config.env');
const { InvalidParamsError } = require('../util/exception');


class UserService {

    signup = async function(user) {
        user.password = await bcrypt.hash(user.password, env.SALT_ROUND);

        return await User.signup(user);
    }

    signin = async function({ email, password }) {
        const user = await User.findEmail(email);
        if (user === null || !(await bcrypt.compare(password, user.get().password))) {
            throw new Error('아이디, 비밀번호가 일치하지 않습니다.');
        }

        return {
            userId: user.userId,
            email,
            nickname: user.nickname
        };
    }

    dupCheck = async function(value) {
        const result = await User.dupCheck(value);
        return Boolean(result);
    }

    nicknameUpdate = async function({ userId, nickname }) {
        const result = await User.dupCheck(nickname);
        if (result) throw new InvalidParamsError('이미 사용중인 닉네임입니다.');

        return await User.updateNickname({ userId, nickname });
    }

    profileUpdate = async function(userId, imgPath) {
        // const splitName = name.split('.');
        // const extension = splitName[splitName.length-1];
        // const filename = `${userId}.${extension}`;
        // const profImgPath = env.ROOT + env.PROF_DIR + filename;

        const result = await User.updateProfImg(userId, imgPath);
        console.log('service result: ', result);

        return result;
    }

    deleteUser = async function() {};

    findAll = async function() {
        return await User.findAll();
    };

}


exports.User = new UserService();