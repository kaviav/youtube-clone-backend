import express from "express";
import {
  addVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
} from "../controllers/videoControllers.js";
import { verifyToken } from "../verifyToken.js";

const videoRouter = express.Router();

//create a video
videoRouter.post("/add", verifyToken, addVideo);
videoRouter.put("/update/:id", verifyToken, addVideo);
videoRouter.delete("/delete/:id", verifyToken, addVideo);
videoRouter.get("/getone/:id", getVideo);
videoRouter.put("/view/:id", addView);
videoRouter.get("/trend", trend);
videoRouter.get("/random", random);
videoRouter.get("/sub", verifyToken, sub);
//get videos by its tags
videoRouter.get("/tags", getByTag);
//get videos by its title
videoRouter.get("/search", search);

export default videoRouter;
