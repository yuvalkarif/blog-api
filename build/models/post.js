"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _luxon = require("luxon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  Schema
} = _mongoose.default;
var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: String,
    default: undefined
  },
  datetime: {
    type: String,
    default: _luxon.DateTime.now().toLocaleString(_luxon.DateTime.DATE_MED)
  },
  public: {
    type: Boolean,
    default: false
  },
  comments: [{
    body: {
      type: String,
      required: true
    },
    username: {
      type: String,
      default: "Anon"
    },
    date: {
      type: Date,
      default: Date.now
    },
    datetime: {
      type: String,
      default: _luxon.DateTime.now().toLocaleString(_luxon.DateTime.DATE_MED)
    }
  }]
});

var Post = _mongoose.default.model("Post", postSchema);

var _default = Post;
exports.default = _default;
//# sourceMappingURL=post.js.map