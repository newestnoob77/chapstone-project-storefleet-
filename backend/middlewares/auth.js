import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";
import UserModel from "../src/user/models/user.schema.js";

export const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler(401, "login to access this route!"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_Secret);
    const user = await UserModel.findById(decodedData.id);
    if (!user) return next(new ErrorHandler(404, "User not found"));
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(401, "Invalid or expired token!"));
  }
};

export const authByUserRole = (...roles) => {
  // fix this middleware for admin access only

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .send(`Role: ${req.user.role} is not allowed to access this resource`);
    }
    next();
  };
};
