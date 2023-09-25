import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  // console.log(req.cookies);

  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;

    // we r assaigning this JWT user object to our req.user. so we able to use this req.user in any api request.
    next(); // calls next middleware in the app.js file, after calling the verityToken functn.
  });
};
