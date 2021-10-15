const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../../models/User');
const jwt = require("jsonwebtoken");
const config = require("config");

const secret = config.get("jwt_secret");


router.post(
  '/register',
  async (req, res, next) => {

    const user = new User(req.body);
    const takenUsername = await User.findOne({username: user.username});
    const takenEmail = await User.findOne({email: user.email});

    if (takenUsername || takenEmail) {
      res.json({message: "Username or email has already been taken"})
    } else {

      user.save().then(() => {
        res.status(200).json({
          message: 'Registration successful',
          user: user
        });
      })
      .catch((err) => {
        res.json({
          error: err
        })

      })
    }
  }
);

router.post(
  '/login',
  async (req, res) => {
    let user = req.body;

    let dbuser = await User.findOne({username: user.username});

    if (!dbuser) {
      return res.status(401).json({message: "Invalid useranme or password"});
    }

    let validPassword = await dbuser.isValidPassword(user.password);

    if (validPassword) {
      let payload = {
        id: dbuser._id,
        username: dbuser.username,
      }
      let token = await jwt.sign(
        payload,
        secret
      )

      res.status(200).json({
        message: "Success",
        token: token
      })

    } else {
      res.status(401).json({message: "Invalid useranme or password"});

    }

  }
)


module.exports = router;
