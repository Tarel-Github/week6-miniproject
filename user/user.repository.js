const { Users } = require('../db/models');
const { Op } = require('sequelize');


class UserRepository extends Users {
    constructor() {
        super();
    }

    signup = async function(user) {
        return Users.create(user);
    }

    findAll = async function() {
        return Users.findAll();
    }

    findOne = async function(value) {
        return await Users.findOne({
            where: {
                [Op.or]: [{userId: value}, {username: value}, {nickname: value}]
            }
        });
    }
    
    findKakaoUser = async function(username) {
        return await Users.findOne({
            where: { 
                username: username,
                provider: 'kakao'
            },
            attributes: {
                exclude: ['password']
            }
        });
    }

    updateNickname = async function({ userId, nickname }) {
        return await Users.update({ nickname }, {
            where: { userId }
        });
    }    

    updateProfImg = async function(userId, [profComment, profMypage]) {
        return await Users.update({ profComment, profMypage }, {
            where: { userId }
        });
    }

    deleteOne = async function() {}    
}


module.exports = new UserRepository();