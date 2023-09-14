import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import videoRouter from "./routes/videos";
import usersRouter from "./routes/users";
import commentsRouter from "./routes/comments";

dotenv.config();
const app = express();

//middlewares
// app.use(cookieParser())
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/videos", videoRouter);
app.use("/comments", commentsRouter);
/////
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is listening to PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
