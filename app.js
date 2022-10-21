const express = require("express")
const cookieParser = require("cookie-parser")
const app = express();
const port = 3000
const router = require('./routes')

app.use(cookieParser())
app.use(express.json())
app.use('/', router)
app.listen(port, ()=>{
    console.log(port, '포트로 서버가 열렸습니다')
})