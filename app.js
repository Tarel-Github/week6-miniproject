const express = require('express');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const path = require('path');
const { env } = require('./config.env');

const userRouter = require('./routes/user');


const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());
app.use(fileupload({
    limits: {
        fileSize: 10000000, // 10Mb
    },
    abortOnLimit: true,
}));

app.use('/', userRouter);


app.listen(env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${env.PORT}`);
});