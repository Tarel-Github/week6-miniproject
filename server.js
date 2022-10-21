const { app } = require('./app');
const env = require('./config.env');


app.listen(env.PORT, async() => {
    console.log(`SERVER RUNNING ON PORT: ${env.PORT}`);

    // try {
    //     await sequelize.authenticate();
    //     console.log('DB CONNECTED');
    // } catch (error) {
    //     console.error(error);
    //     console.log('DB CONNECTION FAIL');
    // }
});

