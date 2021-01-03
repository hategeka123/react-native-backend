const jwt = require("jsonwebtoken");
const AppError = require("../controllers/errorController");
const User = require("../models/user");
const { APP_KEY } = require("../config/AppConst");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({status:401, message:"you are not authorized"});
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, APP_KEY, async (err, payload) => {
    if (err) {
      return AppError.onError(res, "Authorization verification failed!");
    }
    const { userId } = payload;
    User.findById({_id:userId})
      .then((user) => {
        req.user = user;
        if(user.role !== "seller") return res.json({message:"Only seller is allowed"})
        next();
      })
      .catch((err) =>
        AppError.onError(res, "Authorization token is not valid")
      );
  });
};
