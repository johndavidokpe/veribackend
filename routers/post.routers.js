import { Router } from "express";
import {
  createPost,
  deletePost,
  fetchPostsByLocation,
  fetchUserPosts,
  getAllPosts,
  postLikes,
  updatePost,
} from "../controllers/posts.controllers.js";
import userAuth from "../auth/authMiddleware.js";
import upload from "../utils/multer.js";

const postRouter = Router();

postRouter.post("/upload-post", userAuth, upload.single("media"), createPost);
postRouter.get("/get-all-posts", userAuth, getAllPosts);
postRouter.get("/get-user-posts", userAuth, fetchUserPosts);
postRouter.get(
  "/get-posts-by-location/:location",
  userAuth,
  fetchPostsByLocation
);
postRouter.put(
  "/update-post/:postId",
  userAuth,
  upload.single("media"),
  updatePost
);
postRouter.delete("/delete-post/:postId", userAuth, deletePost);
postRouter.post("/like-post/:postId", userAuth, postLikes);

export default postRouter;
