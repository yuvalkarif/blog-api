import User from "../models/user";
//Bcrypt
import bcrypt from "bcrypt";
const saltRounds = 10;
//JWT
import jwt from "jsonwebtoken";
import "dotenv";

export const signup = async (req, res, next) => {
  const { username, displayname, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username,
    displayname,
    password: hashedPassword,
  });
  let savedUser;
  try {
    savedUser = await newUser.save();
  } catch (error) {
    next(error);
  }
  res.json({
    msg: "User Created Successfully",
    user: savedUser,
  });
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (error) {
    next(error);
  }

  if (existingUser) {
    let isAuth;
    try {
      isAuth = await bcrypt.compare(password, existingUser.password);
    } catch (error) {
      next(error);
    }
    if (isAuth) {
      let token;
      try {
        token = await jwt.sign({ existingUser }, process.env.JWT_KEY);
      } catch (err) {
        next(err);
      }
      try {
      } catch (error) {}
      res.json({
        msg: "User Authenticated Successfuly",
        isAuth,
        token,
      });
    } else {
      res.json({
        msg: "User Authenticated Failed",
        isAuth,
      });
    }
  }
};
