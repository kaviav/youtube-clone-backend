usersRimport express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const usersRouter = express.Router();

//update user
usersRouter.put("/:id", verifyToken, update);

//delete user
usersRouter.delete("/:id", verifyToken, deleteUser);

//get a user
usersRouter.get("/find/:id", getUser);

//subscribe a user
usersRouter.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
usersRouter.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
usersRouter.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default usersRouter;
