//로그인 확인 미들웨어
const jwt = require("../util/jwt");
// const { User } = require("../db/models"); 
const User = require("../user/user.repository")
const env = require('../config.env')

module.exports = async (req, res, next) => {
  const { authorization, refreshtoken } = req.headers;//##
  const [authType, authToken] = (authorization || "").split(" ");

  if (!authToken || authType !== "Bearer") {
      res.status(401).send({
          errorMessage: "로그인 후 이용 가능한 기능입니다.(1)",
      });
      return;
  }
  try {
    // const { userId } = jwt.verify(authToken, env.JWT_KEY); //################
    // const user = await User.findOne({where:{userId:id}})//###################
    const payload = jwt.verify(authToken);
    req.app.locals.user = payload;
    next();
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",errorMessage:error.message
    });
  }
};