import Post from "../models/post";

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

export const postCreate = async (req, res, next) => {
  console.log(req.body);
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
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
};

// CRUD - Create Read Update Delete
