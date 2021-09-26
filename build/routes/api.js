"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _upload = _interopRequireDefault(require("../config/upload"));

var _postController = require("../controllers/postController");

var _userController = require("../controllers/userController");

var _verifyToken = _interopRequireDefault(require("../middlewares/verifyToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)(); //---POST ACTIONS---//npm

router.patch("/images/upload", _upload.default, (req, res, next) => {
  res.send(req.file);
}); //View all Posts ✔️

router.get("/post/all", _postController.postsRead); //View specific Post by ID ✔️

router.get("/post/:id", _postController.postRead); //Update specific Post by ID ❌

router.put("/post/:id", _postController.postUpdate); //Add new Post ✔️

router.post("/post", _verifyToken.default, _postController.postCreate); //Remove Post by ID ✔️

router.delete("/post/:id", _verifyToken.default, _postController.postRemove); //Add Comment specific for a Post by ID ✔️

router.post("/post/:id/comment", _postController.postCommentCreate); //Remove Comment by ID and Post ID ✔️

router.delete("/post/:postID/:commentID", _verifyToken.default, _postController.postCommentRemove); //---USER ACTIONS---//

router.post("/signup", _userController.signup); // ❌

router.post("/login", _userController.login); //✔️

var _default = router;
exports.default = _default;
//# sourceMappingURL=api.js.map