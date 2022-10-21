
const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken")

const app = express();
const router = express.Router();
const SECRET_KEY = `customized-secret-key`;
const routes = require('./routes');
const port = 3000

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use('/api', routes);

app.listen(port, ()=>{
    console.log(port, '포트로 서버가 열렸습니다')
})


