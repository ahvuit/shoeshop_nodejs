const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const HttpStatusCode = require("../config/HttpStatusCode");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const name = req.body.name;
    const findProduct = await Product.findOne({ name: name });
    if (!findProduct) {
      const newProduct = await Product.create(req.body);
      res.status(HttpStatusCode.OK).json({
        success: true,
        status: 200,
        message: "Successfully",
        data: newProduct,
      });
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        status: 400,
        message: "product name is already in use",
        data: [],
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: error.message,
      data: [],
    });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(HttpStatusCode.OK).json({
    success: true,
    status: 200,
    message: "Successfully",
    data: products,
  });
});

const getProductDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });

    if (product !== null) {
      res.status(HttpStatusCode.OK).json({
        success: true,
        status: 200,
        message: "Successfully",
        data: product,
      });
    }
    res.status(HttpStatusCode.NOT_FOUND).json({
      success: false,
      status: 401,
      message: "product is not found",
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

const updatedProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    validateMongoDbId(id);
    const name = req.body.name;
    const findProduct = await Product.findOne({ name: name });
    if (!findProduct) {
      const updatedProfile = await Product.findOneAndUpdate(
        {_id:id},
        {
          name: req?.body?.name,
          description: req?.body?.description,
          brandId: req?.body?.brandId,
          categoryId: req?.body?.categoryId,
          price: req?.body?.price,
          rate: req?.body?.rate,
          productNew: req?.body?.productNew,
          purchase: req?.body?.purchase,
          stock: req?.body?.stock,
          active: req?.body?.active,
          image: req?.body?.image,
          createdDate: req?.body?.createdDate,
          dateUpdated: req?.body?.dateUpdated,
          updateBy: req?.body?.updateBy,
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
    } else {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        status: 400,
        message: "product name is already in use",
        data: [],
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.badRequest).json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductDetails,
  updatedProduct,
};
