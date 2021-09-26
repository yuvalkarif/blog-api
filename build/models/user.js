"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  Schema
} = _mongoose.default;
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  displayname: {
    type: String,
    default: "Anon"
  },
  password: {
    type: String,
    required: true
  },
  token: String
});

var User = _mongoose.default.model("User", userSchema);

var _default = User;
exports.default = _default;
//# sourceMappingURL=user.js.map