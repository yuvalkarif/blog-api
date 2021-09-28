import upload from "../config/old_upload";
import Image from "../models/image";

export const uploadImage = (req, res, next) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
  return res.send(imgUrl);
};
