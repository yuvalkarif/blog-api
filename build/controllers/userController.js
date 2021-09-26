"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.signup = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var saltRounds = 10; //JWT

var signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var {
      username,
      displayname,
      password
    } = req.body;
    var hashedPassword = yield _bcrypt.default.hash(password, saltRounds);
    var newUser = new _user.default({
      username,
      displayname,
      password: hashedPassword
    });
    var savedUser;

    try {
      savedUser = yield newUser.save();
    } catch (error) {
      next(error);
    }

    res.json({
      msg: "User Created Successfully",
      user: savedUser
    });
  });

  return function signup(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var {
      username,
      password
    } = req.body;
    var existingUser;

    try {
      existingUser = yield _user.default.findOne({
        username: username
      });
    } catch (error) {
      next(error);
    }

    if (existingUser) {
      var isAuth;

      try {
        isAuth = yield _bcrypt.default.compare(password, existingUser.password);
      } catch (error) {
        next(error);
      }

      if (isAuth) {
        var token;

        try {
          token = yield _jsonwebtoken.default.sign({
            existingUser
          }, process.env.JWT_KEY);
        } catch (err) {
          next(err);
        }

        try {} catch (error) {}

        res.json({
          msg: "User Authenticated Successfuly",
          isAuth,
          token,
          user: existingUser
        });
      } else {
        res.json({
          msg: "User Authenticated Failed",
          isAuth
        });
      }
    } else {
      res.status(401).json({
        msg: "Wrong Credentials"
      });
    }
  });

  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;
//# sourceMappingURL=userController.js.map