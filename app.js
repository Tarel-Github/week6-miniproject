const express = require('express');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const path = require('path');
const { env } = require('./config.env');

const indexRouter = require('./index');

const port = env.PORT || 3000;


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


app.use('/', indexRouter);


app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT: ${port}`);
});