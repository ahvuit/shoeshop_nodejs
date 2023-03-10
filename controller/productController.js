const Product = require("../models/product");
const SizeTable = require("../models/sizeTable");
const asyncHandler = require("express-async-handler");
const HttpStatusCode = require("../config/HttpStatusCode");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const name = req.body.name;
    const findProduct = await Product.findOne({ name: name });
    if (findProduct) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        status: 400,
        message: "product name is already in use",
        data: [],
      });
    }
    const newProduct = await Product.create(req.body);
    const newSizeTable = await new SizeTable({
      productId: newProduct._id,
    }).save();
    newProduct.sizeTable = newSizeTable;
    res.status(HttpStatusCode.OK).json({
      success: true,
      status: 200,
      message: "Successfully",
      data: newProduct,
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
    validateMongoDbId(id);
    const product = await Product.findOne({ _id: id });
    if (product) {
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
      message: "cannot find product",
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

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    validateMongoDbId(id);
    const findProduct = await Product.findOne({ _id: id });
    if (!findProduct) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        status: 401,
        message: "cannot find product",
        data: [],
      });
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
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
      data: updatedProduct,
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
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
};
