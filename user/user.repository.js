const { User } = require('../db/models');
const { Op } = require('sequelize');


class UserRepository extends User {
    constructor() {
        super();
    }

    signup = async function(user) {
        return User.create(user);
    }

    findAll = async function() {
        return User.findAll();
    }

    findusername = async function(username) {
        return await User.findOne({
            where: { username }
        });
    }

    findNickname = async function(nickname) {
        return await User.findOne({
            where: { nickname }
        });
    }

    dupCheck = async function(value) {
        return await User.findOne({
            where: {
                [Op.or]: [{username: value}, {nickname: value}]
            }
        });
    }

    updateNickname = async function({ userId, nickname }) {
        return await User.update({ nickname }, {
            where: { userId }
        });
    }    

    updateProfImg = async function(userId, [profComment, profMypage]) {
        return await User.update({ profComment, profMypage }, {
            where: { userId }
        });
    }

    deleteOne = async function() {}    
}


module.exports = new UserRepository();