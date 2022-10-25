const { app } = require('./app');
const sequelize = require('./db/config/connection');
const { refreshMemory } = require('./db/cache');
const env = require('./config.env');


app.listen(env.PORT, async() => {
    console.log(`SERVER RUNNING ON PORT: ${env.PORT}`);

    try {
        await sequelize.authenticate();
        setInterval(refreshMemory, 1000*60*60);
        console.log('DB CONNECTED');
    } catch (error) {
        console.error(error);
        console.log('DB CONNECTION FAIL');
    }
});

