const sequelize = require('./config/connection');


module.exports = {
    createMemory: async function() {
        await sequelize.query(`
            CREATE TABLE refresh (
                refreshToken VARCHAR(255), 
                userId SMALLINT,
                timestamp BIGINT,
                UNIQUE(refreshToken),
                FOREIGN KEY(userId) REFERENCES Users(userId)
            ) ENGINE = MEMORY;
        `);
    },
    dropMemory: async function() {
        await sequelize.query(`
            DROP TABLE IF EXISTS refresh;
        `);
    },
    refreshTokenToMemory: async function(refreshToken, userId) {
        const time = Date.now() + 60*60*24;
        await sequelize.query(`
            INSERT INTO refresh (refreshToken, userId, timestamp)
            VALUES ('${refreshToken}', ${userId}, ${time});
        `);
    },
    findUserByRefresh: async function(refreshToken) {
        const result = await sequelize.query(`
            SELECT refreshToken, Users.userId, Users.username, Users.nickname
            FROM refresh
            INNER JOIN Users
            ON refresh.userId = Users.userId
            WHERE refreshToken = '${refreshToken}';
        `);
        console.log(result[0]);
        if (result[0].length === 0) return null;
        return result[0][0];
    },
    refreshMemory: async function() {
        const time = Date.now();
        await sequelize.query(`
            DELETE FROM refresh
            WHERE timestamp < ${time};
        `);
    }
}