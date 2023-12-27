const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

exports.verifyToken = async (req, res, next) => {
  let authorization = req.headers["authorization"];
  if (authorization !== "undefined") {
    let token = authorization.split(" ")[1];
    // console.log(token);
    let { userid } = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(userid);
    req.user = await User.findById(userid);
    // console.log(req.user);
    if (req.user !== "undefined") {
      next();
    } else {
        res.json({Message: 'user invalid'});
    }
  } else {
    res.json({ messgae: "Invalid Token" });
  }
};
