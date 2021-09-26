"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _database = _interopRequireDefault(require("./config/database"));

var _api = _interopRequireDefault(require("./routes/api"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Initiating Express
var app = (0, _express.default)();
app.use((0, _helmet.default)());
app.use((0, _compression.default)()); //Allowing other sites to fetch

app.use((0, _cors.default)()); //Parsing the Body for Post Requests

app.use(_express.default.json());
app.use(_express.default.static("./public"));
app.use("/uploads", _express.default.static("uploads"));
app.use(_bodyParser.default.json({
  limit: "30mb",
  extended: true
}));
app.use(_bodyParser.default.urlencoded({
  limit: "30mb",
  extended: true
})); //Connecting to MongoDB

var db = (0, _database.default)();
app.use("/api", _api.default);
app.listen(8080, function () {
  console.log("--WORKING IN PORT:8080--");
});
//# sourceMappingURL=index.js.map