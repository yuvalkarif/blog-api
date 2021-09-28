"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = void 0;

var _old_upload = _interopRequireDefault(require("../config/old_upload"));

var _image = _interopRequireDefault(require("../models/image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadImage = (req, res, next) => {
  if (req.file === undefined) return res.send("you must select a file.");
  var imgUrl = "http://localhost:8080/file/".concat(req.file.filename);
  return res.send(imgUrl);
};

exports.uploadImage = uploadImage;
//# sourceMappingURL=imageController.js.map