import jw from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie
  token = req.cookie.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Autorisation refusée, token non valid");
    }
  } else {
    res.status(401);
    throw new Error("Autorisation refusée, token invalide");
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Autorisation refusée, vous n'êtes pas  admin");
  }
};

export { protect, admin };
