const sequelize = require('./config/connection');


module.exports = {
    createMemory: async function() {
        await sequelize.query(`
            CREATE TABLE refresh (
                refreshToken VARCHAR(255), 
                userId SMALLINT, 
                UNIQUE(refreshToken),
                FOREIGN KEY(userId) REFERENCES Users(userId)
            ) ENGINE = MEMORY;
        `);
    },
    dropMemory: async function() {
        await sequelize.query(`
            DROP TABLE refresh;
        `);
    },
    refreshTokenToMemory: async function(refreshToken, userId) {
        await sequelize.query(`
            INSERT INTO refresh (refreshToken, userId)
            VALUES (${refreshToken}, ${userId});
        `);
    },
    findUserByRefresh: async function(refreshToken) {
        const result = await sequelize.query(`
            SELECT refreshToken, Users.userId, Users.username, Users.nickname
            FROM refresh
            INNER JOIN Users
            ON refresh.userId = Users.userId
            WHERE refreshToken = ${refreshToken};
        `);

        if (result.length === 0) return null;
        return result;
    }
}