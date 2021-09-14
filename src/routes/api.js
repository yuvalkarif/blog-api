import { Router } from "express";
import {
  postCreate,
  postsRead,
  postRead,
  postUpdate,
  postCommentCreate,
} from "../controllers/postController";
import { login, signup } from "../controllers/userController";

let router = Router();

router.get("/posts", postsRead);
router.get("/post/:id", postRead);
router.post("/post/:id/update", postUpdate);
router.post("/post/:id/comment-create", postCommentCreate);
router.post("/post-create", postCreate);
router.post("/signup", signup);
router.post("/login", login);

// router.get("/post/:id");

export default router;
