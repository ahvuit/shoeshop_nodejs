const Product = require("../models/product");
const Brand = require("../models/brand");
const Category = require("../models/category");
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
        message: "product name is already",
        data: null,
      });
    }
    const newProduct = await Product.create(req.body);
    const newSizeTable = await new SizeTable({
      productId: newProduct._id,
    }).save();
    newProduct.sizeTable = newSizeTable;
    const findBrand = await Brand.findOne({ _id:  newProduct.brandId});
    const findCategory = await Category.findOne({ _id:  newProduct.categoryId });
    newProduct.brandName = findBrand.brandName;
    newProduct.categoryName = findCategory.categoryName;
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
      data: null,
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
      const findSizeTable = await SizeTable.findOne({ productId:  product._id});
      const findBrand = await Brand.findOne({ _id:  product.brandId});
      const findCategory = await Category.findOne({ _id:  product.categoryId });
      product.brandName = findBrand.brandName;
      product.categoryName = findCategory.categoryName;
      product.sizeTable = findSizeTable;
      res.status(HttpStatusCode.OK).json({
        success: true,
        status: 200,
        message: "Successfully",
        data: product,
      });
    }
    res.status(HttpStatusCode.NOT_FOUND).json({
      success: false,
      status: 404,
      message: "cannot find product",
      data: null,
    });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: error.message,
      data: null,
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
        status: 404,
        message: "cannot find product",
        data: null,
      });
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        name: req?.body?.name ?? updatedProduct.name,
        description: req?.body?.description ?? updatedProduct.description,
        brandId: req?.body?.brandId ?? updatedProduct.brandId,
        categoryId: req?.body?.categoryId ?? updatedProduct.categoryId,
        price: req?.body?.price ?? updatedProduct.price,
        rate: req?.body?.rate ?? updatedProduct.rate,
        productNew: req?.body?.productNew ?? updatedProduct.productNew,
        purchase: req?.body?.purchase ?? updatedProduct.purchase,
        stock: req?.body?.stock ?? updatedProduct.stock,
        active: req?.body?.active ?? updateProduct.active,
        image: req?.body?.image ?? updateProduct.image,
        dateUpdated: Date.now(),
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
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      status: 400,
      message: error.message,
      data:null
    });
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
};
