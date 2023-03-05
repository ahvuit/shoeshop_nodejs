const Profile = require("../models/profile");
const validateMongoDbId = require('../utils/validateMongoDbId');
const HttpStatusCode = require("../config/HttpStatusCode");
const asyncHandler = require("express-async-handler");

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const profile = await Profile.findOne({ userId: userId });

  if(profile!==null){
    res.status(HttpStatusCode.OK).json({
      success: true,
      status: 200,
      message: "Successfully",
      data: profile,
    });
  }res.status(HttpStatusCode.NOT_FOUND).json({
    success: false,
    status: 401,
    message: "profile is not found",
    data: [],
  });
});

const updatedProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  validateMongoDbId(userId);

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      {userId: userId},
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        phone: req?.body?.phone,
        address: req?.body?.address,
        imageUrl: req?.body?.imageUrl,
      },
      {
        new: true,
      }
    );
    res.status(HttpStatusCode.OK).json({
      success: true,
      status: 200,
      message: "Successfully",
      data: updatedProfile,
    });
  } catch (error) {
    res.status(HttpStatusCode.badRequest).json({
      success: false,
      status: 400,
      message: error,
    });
  }
});

module.exports = { getProfile, updatedProfile };