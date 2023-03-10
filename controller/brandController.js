const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const HttpStatusCode = require("../config/HttpStatusCode");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async (req, res) => {
  try {
    const brandName = req.body.brandName;
    const findBrand = await Brand.findOne({ brandName: brandName });
    if (findBrand) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        status: 400,
        message: "brand name is already in use",
        data: [],
      });
    }
    const newBrand = await Brand.create(req.body);
    res.status(HttpStatusCode.OK).json({
      success: true,
      status: 200,
      message: "Successfully",
      data: newBrand,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: error.message,
      data: [],
    });
  }
});

const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.status(HttpStatusCode.OK).json({
    success: true,
    status: 200,
    message: "Successfully",
    data: brands,
  });
});

const getBrandDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await Brand.findOne({ _id: id });

    if (brand) {
      res.status(HttpStatusCode.OK).json({
        success: true,
        status: 200,
        message: "Successfully",
        data: brand,
      });
    } res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        status: 401,
        message: "brand is not found",
        data: [],
      });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: error.message,
      data: [],
    });
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    validateMongoDbId(id);
    const brandName = req.body.brandName;
    const findBrand = await Brand.findOne({ brandName: brandName });
    if (!findBrand) {
      const updatedBrand = await Brand.findOneAndUpdate(
        { _id: id },
        {
          brandName: req?.body?.brandName,
          information: req?.body?.information,
          logo: req?.body?.logo,
        },
        {
          new: true,
        }
      );
      res.status(HttpStatusCode.OK).json({
        success: true,
        status: 200,
        message: "Successfully",
        data: updatedBrand,
      });
    } res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        status: 400,
        message: "brand name is already",
        data: [],
      });
  } catch (error) {
    res.status(HttpStatusCode.badRequest).json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
});

module.exports = {
  createBrand,
  getAllBrands,
  getBrandDetails,
  updateBrand,
};