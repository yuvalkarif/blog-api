"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//MongoDB Setup Connection
var connectDB = () => {
  var mongoDB = process.env.MONGODB_URI || process.env.DB_KEY;

  _mongoose.default.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Successfully connected to MongoDB");
  }).catch(err => {
    console.log("MongoDB connection failed. exiting now...");
    console.error(err);
    process.exit(1);
  });

  var db = _mongoose.default.connection;
};

var _default = connectDB;
exports.default = _default;
//# sourceMappingURL=database.js.map