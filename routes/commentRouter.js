import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentControllers.js";
import { verifyToken } from "../verifyToken.js";
const commentsRouter = express.Router();

commentsRouter.post("/", verifyToken, addComment);
commentsRouter.delete("/:id", verifyToken, deleteComment);
commentsRouter.get("/:videoId", getComments);

export default commentsRouter;
