"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      var bearer = bearerHeader.split(" ");
      var bearerToken = bearer[1];
      req.token = bearerToken;
      var verification;

      try {
        verification = yield _jsonwebtoken.default.verify(req.token, process.env.JWT_KEY);
        next();
      } catch (err) {
        console.log(process.env.JWT_KEY);
        res.status(403).send("Forbidden, Invalid Token");
      }
    } else {
      res.status(403).send("Forbidden, No Token in Header");
    }
  });

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = verifyToken;
exports.default = _default;
//# sourceMappingURL=verifyToken.js.map