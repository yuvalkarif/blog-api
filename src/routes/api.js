import { Router } from "express";
import { postCreate, postsRead } from "../controllers/postController";

let router = Router();

router.get("/posts", postsRead);
router.post("/post-create", postCreate);
// router.get("/post/:id");

export default router;
