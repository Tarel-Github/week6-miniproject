//로그인 확인 미들웨어
const jwt = require("../util/jwt");
// const { User } = require("../db/models"); 
const UserRepo = require("../user/user.repository")
const env = require('../config.env')
const { findUserByToken } = require('../db/cache');
const { InvaliadAccessError } = require('../util/exception');

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
    const payload = jwt.verify(authToken);

    if (payload) {
      req.app.locals.user = payload;
      next();
    } else {
      const verifyRefresh = jwt.verify(refreshtoken);

      if (verifyRefresh) {
        const userId = await findUserByToken(refreshtoken);
        const user = await UserRepo.findOne(userId);

        const newPayload = {
          userId,
          username: user.username,
          nickname: user.nickname
        }
        const newAccessToken = jwt.sign(newPayload);

        res.cookie("accessToken", `Bearer ${newAccessToken}`);
        next();
      } else {
        next(new InvaliadAccessError("유효하지 않은 refreshToken", 401));
      }
    }
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",errorMessage:error.message
    });
  }
};