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
var imageSchema = new Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String
  }
});

var Image = _mongoose.default.model("Image", imageSchema);

var _default = Image;
exports.default = _default;
//# sourceMappingURL=image.js.map