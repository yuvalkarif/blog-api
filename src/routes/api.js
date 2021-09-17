import { Router } from "express";
import {
  postCreate,
  postsRead,
  postRead,
  postUpdate,
  postCommentCreate,
  postRemove,
  postCommentRemove,
} from "../controllers/postController";
import { login, signup } from "../controllers/userController";

let router = Router();

//---POST ACTIONS---//
//View all Posts
router.get("/post/all", postsRead);
//View specific Post by ID
router.get("/post/:id", postRead);
//Update specific Post by ID
router.put("/post/:id", postUpdate);
//Add new Post
router.post("/post", postCreate);
//Remove Post by ID
router.delete("/post/:id", postRemove);

//Add Comment specific for a Post by ID
router.post("/post/:id/comment", postCommentCreate);
//Remove Comment by ID and Post ID
router.delete("/post/:postID/:commentID", postCommentRemove);

//---USER ACTIONS---//
router.post("/signup", signup);
router.post("/login", login);

export default router;
