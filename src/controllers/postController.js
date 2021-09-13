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
  const { title, body, author } = req.body;
  const newPost = new Post({
    title,
    body,
    author,
  });
  let savedPost;
  btoa;
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

// CRUD - Create Read Update Delete
