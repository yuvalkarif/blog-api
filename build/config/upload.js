"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  }
});

var fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("jpeg") || file.mimetype.includes("png") || file.mimetype.includes("jpg")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = (0, _multer.default)({
  storage: storage,
  fileFilter: fileFilter
});

var _default = upload.single("thumbnail");

exports.default = _default;
//# sourceMappingURL=upload.js.map