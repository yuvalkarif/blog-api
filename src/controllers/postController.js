import Post from "../models/post";
import { DateTime } from "luxon";
import { thisExpression } from "@babel/types";
const { body, validationResult } = require("express-validator");

export const postsRead = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find().sort({ date: "descending" });
  } catch (error) {
    next(error);
  }
  res.json({
    posts,
  });
};

export const postCreate = [
  body("title", "Fill in the title.").trim().isLength({ min: 1 }).escape(),
  body("body", "Fill in the body.").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { title, body, author } = req.body;
      const newPost = new Post({
        title,
        body,
        author,
      });
      let savedPost;
      try {
        savedPost = await newPost.save();
      } catch (error) {
        next(error);
      }
      res.json({
        msg: "Post Created Succesfully",
        post: savedPost,
      });
    } else {
      res.json({
        msg: "Post Creation Failed",
        errors,
      });
    }
  },
];

export const postRead = async (req, res, next) => {
  const { id } = req.params;
  let fetchedPost;
  try {
    fetchedPost = await Post.findById(id);
  } catch (error) {
    next(error);
  }
  res.json({
    msg: "Post fetched Successfuly",
    post: fetchedPost,
  });
};

export const postUpdate = [
  body("title", "Fill in the title.").trim().isLength({ min: 1 }).escape(),
  body("body", "Fill in the body.").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { id } = req.params;
      const { title, body } = req.body;
      let editedPost;
      try {
        editedPost = await Post.findByIdAndUpdate(
          id,
          {
            title: title,
            body: body,
            edited: DateTime.now().toLocaleString(DateTime.DATE_MED),
          },
          {
            new: true,
          }
        );
      } catch (error) {
        next(error);
      }
      res.json({
        msg: "Post Updated Succesfully",
        post: editedPost,
      });
    } else {
      res.json({
        msg: "Post Update Failed",
        errors,
      });
    }
  },
];

export const postCommentCreate = [
  body("username", "Fill in the username.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("body", "Fill in the body.").trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { id: postId } = req.params;
      const { body, username } = req.body;
      let editedPost;
      try {
        editedPost = await Post.findByIdAndUpdate(
          postId,
          {
            $push: { comments: { body: body, username: username } },
          },
          { new: true }
        );
      } catch (error) {
        next(error);
      }
      res.json({
        msg: "Comment Added Succesfully",
        editedPost,
      });
    } else {
      res.json({
        errors,
      });
    }
  },
];

// CRUD - Create Read Update Delete
