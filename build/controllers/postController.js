"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCommentRemove = exports.postCommentCreate = exports.postUpdate = exports.postRead = exports.postRemove = exports.postCreate = exports.postsRead = void 0;

var _post = _interopRequireDefault(require("../models/post"));

var _luxon = require("luxon");

var _types = require("@babel/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  body,
  validationResult
} = require("express-validator");

var postsRead = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    var posts;

    try {
      posts = yield _post.default.find().sort({
        date: "descending"
      });
    } catch (error) {
      next(error);
    }

    res.json({
      posts
    });
  });

  return function postsRead(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postsRead = postsRead;
var postCreate = [body("title", "Fill in the title.").trim().isLength({
  min: 1
}).escape(), body("body", "Fill in the body.").trim().isLength({
  min: 1
}).escape(), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    var errors = validationResult(req);

    if (errors.isEmpty()) {
      var {
        title,
        body: _body,
        author,
        thumbnail
      } = req.body;
      var newPost = new _post.default({
        title,
        body: _body,
        author,
        thumbnail
      });
      var savedPost;

      try {
        savedPost = yield newPost.save();
      } catch (error) {
        next(error);
      }

      res.json({
        msg: "Post Created Succesfully",
        post: savedPost
      });
    } else {
      res.json({
        msg: "Post Creation Failed",
        errors: errors.array()
      });
    }
  });

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()];
exports.postCreate = postCreate;

var postRemove = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.params;
    var deletedPost;

    try {
      deletedPost = yield _post.default.findByIdAndDelete(id);
      res.json({
        msg: "Post Removed Successfuly",
        post: deletedPost
      });
    } catch (error) {
      next(error);
      res.json({
        msg: "Post Remove Failed",
        error
      });
    }
  });

  return function postRemove(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postRemove = postRemove;

var postRead = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    var {
      id
    } = req.params;
    var fetchedPost;

    try {
      fetchedPost = yield _post.default.findById(id);
    } catch (error) {
      next(error);
    }

    res.json({
      msg: "Post fetched Successfuly",
      post: fetchedPost
    });
  });

  return function postRead(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postRead = postRead;
var postUpdate = [body("title", "Fill in the title.").trim().isLength({
  min: 1
}).escape(), body("body", "Fill in the body.").trim().isLength({
  min: 1
}).escape(), /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res, next) {
    var errors = validationResult(req);

    if (errors.isEmpty()) {
      var {
        id
      } = req.params;
      var {
        title,
        body: _body2,
        thumbnail
      } = req.body;
      var editedPost;

      try {
        editedPost = yield _post.default.findByIdAndUpdate(id, {
          title: title,
          body: _body2,
          edited: _luxon.DateTime.now().toLocaleString(_luxon.DateTime.DATE_MED),
          thumbnail
        }, {
          new: true
        });
      } catch (error) {
        next(error);
      }

      res.json({
        msg: "Post Updated Succesfully",
        post: editedPost
      });
    } else {
      res.json({
        msg: "Post Update Failed",
        errors
      });
    }
  });

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}()];
exports.postUpdate = postUpdate;
var postCommentCreate = [body("username", "Fill in the username.").trim().isLength({
  min: 1
}).escape(), body("body", "Fill in the body.").trim().isLength({
  min: 1
}).escape(), /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res, next) {
    var errors = validationResult(req);

    if (errors.isEmpty()) {
      var {
        id: postId
      } = req.params;
      var {
        body: _body3,
        username
      } = req.body;
      var editedPost;

      try {
        editedPost = yield _post.default.findByIdAndUpdate(postId, {
          $push: {
            comments: {
              body: _body3,
              username: username
            }
          }
        }, {
          new: true
        });
      } catch (error) {
        next(error);
      }

      res.json({
        msg: "Comment Added Succesfully",
        editedPost
      });
    } else {
      res.json({
        errors
      });
    }
  });

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}()];
exports.postCommentCreate = postCommentCreate;

var postCommentRemove = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res, next) {
    var {
      postID,
      commentID
    } = req.params;
    var fetchedPost;

    try {
      fetchedPost = yield _post.default.findById(postID);
      var removedComments = fetchedPost.comments.filter(comment => comment.id != commentID);

      if (removedComments.length == fetchedPost.comments.length) {
        throw {
          msg: "Comment to remove not Found",
          commentID,
          postID
        };
      }

      fetchedPost.comments = removedComments;
      fetchedPost.save();
      res.json({
        msg: "Post Comment Removed Successfuly",
        post: fetchedPost
      });
    } catch (error) {
      next(error);
      res.json({
        msg: "Post Comment Removal Failed",
        error
      });
    }
  });

  return function postCommentRemove(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}(); // CRUD - Create Read Update Delete


exports.postCommentRemove = postCommentRemove;
//# sourceMappingURL=postController.js.map