const User = require("../models/user");
const validateMongoDbId = require('../utils/validateMongoDbId');
const ApiResult = require("../models/ApiResult");
const HttpStatusCode = require("../config/HttpStatusCode");
const asyncHandler = require("express-async-handler");

const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    //const response = new ApiResult(true,200,'ok',newUser);
    res.status(HttpStatusCode.OK).json({
      success: true,
      status: 200,
      message: "User created successfully",
      data: newUser,
      //response
    });
  } else {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: "User already exists",
      data: {},
    });
  }
};

const loginUser = asyncHandler(async(req, res)=>{
  const {email, password} = req.body;
  const findUser = await User.findOne({email});
  console.log(findUser);
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(HttpStatusCode.OK).json({
      success: true,
      status: 200,
      message: "User updated successfully",
      data: findUser,
      token: generateToken(findUser?._id),
    });
  } else {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: "Invalid Credentials",
      data: {},
    });
  }
});

module.exports = { createUser, loginUser };
