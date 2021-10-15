const jwt = require("jsonwebtoken");
const config = require('config');
const secret = config.get('jwt_secret');


function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {

      if (err) return res.status(401).json({
        isLoggedIn: false,
        message: "Failed to authenticate"
      });

      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });

  } else {
    res.status(401).json({message: "Incorrect token given", isLoggedIn: false});
  }


}

module.exports = verifyJWT;
