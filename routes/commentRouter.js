import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentControllers.js";
import { verifyToken } from "../verifyToken.js";
const commentsRouter = express.Router();

commentsRouter.post("/add", verifyToken, addComment);
commentsRouter.delete("/delete/:id", verifyToken, deleteComment);
commentsRouter.get("/getall/:videoId", getComments);

export default commentsRouter;
