const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const HttpStatusCode = require("../config/HttpStatusCode");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        status: 401,
        message: "Not Authorized token expired, Please Login again",
      });
    }
  } else {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 401,
      message: "There is no token attached to header",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.uType !== "ADM") {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 401,
      message: "You are not an admin",
    });
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
