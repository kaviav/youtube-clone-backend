import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import videoRouter from "./routes/videoRouter.js";
import commentsRouter from "./routes/commentRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/comment", commentsRouter);

///// middleware error handling

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

/////
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is listening to PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
