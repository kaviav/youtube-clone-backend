import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password);
    const newUser = new User({ ...req.body, password: hashedPassword });

    await newUser.save();
    res.status(200).json(newUser);
    // console.log(newUser)
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    //
    const { password, ...others } = user._doc;
    //mongoDb stores user data in the form of _doc object inside user object
    res
      .cookie("access_token", token, {
        httpOnly: true,
        // secure: true, // Set to true if your server uses HTTPS
        // sameSite: "none", // Adjust this based on your needs (strict, lax, none)
        // // Other cookie options like 'maxAge', 'domain', etc. can be set here.
      })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
  // HTTP-only cookies are a security feature in web applications. When the httpOnly flag is set to true, it prevents JavaScript running on the client side from accessing the cookie. This can enhance the security of your application by protecting sensitive information, such as authentication tokens, from being accessed or manipulated by malicious JavaScript code.

  // cookie: This is likely a function or middleware used to set cookies in the HTTP response. The first argument is the name of the cookie ("access_token" in this case), the second argument is the value of the cookie (token), and the third argument is an options object that includes the httpOnly property.

  // httpOnly: true: This option ensures that the cookie is marked as HTTP-only, which means it cannot be accessed or modified by JavaScript running in the browser. It's a security measure to protect sensitive data like authentication tokens.
  //TO USE, INSTALLL cookie parser, nd setup cokkie middleware in app.js
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
