const Product = require("../models/product");
const Brand = require("../models/brand");
const Sales = require("../models/sales");
const SaleDetails = require("../models/saleDetails");
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
      res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: "product name is already", data: null });
    }
    else {
      const newProduct = await Product.create(req.body);
      const newSizeTable = await new SizeTable({
        productId: newProduct._id,
      }).save();
      newProduct.sizeTable = newSizeTable;
      const findBrand = await Brand.findOne({ _id: newProduct.brandId });
      const findCategory = await Category.findOne({ _id: newProduct.categoryId });
      newProduct.brandName = findBrand.brandName;
      newProduct.categoryName = findCategory.categoryName;
      res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: newProduct });
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    return Promise.all([fastFunction(products), slowFunction(products, res)]);
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
  }
});

function fastFunction(products) {
  return new Promise((resolve) => {
    setTimeout(function () {
      products.forEach(async (element) => {
        const findSizeTable = await SizeTable.findOne({ productId: element._id });
        const findBrand = await Brand.findOne({ _id: element.brandId });
        const findCategory = await Category.findOne({ _id: element.categoryId });
        const saleDetails = await SaleDetails.findOne({ productId: element._id });
        if (saleDetails) {
          const sales = await Sales.findOne({ _id: saleDetails.salesId });
          element.sales = sales;
        } else {
          element.sales = null;
        }
        element.brandName = findBrand.brandName;
        element.categoryName = findCategory.categoryName;
        element.sizeTable = findSizeTable;
      });
      resolve()
    }, 100)
  })
}

function slowFunction(products, res) {
  return new Promise((resolve) => {
    setTimeout(function () {
      res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: products });
      resolve()
    }, 300)
  })
}

const getProductDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    validateMongoDbId(id);
    const product = await Product.findOne({ _id: id });
    if (product) {
      const findSizeTable = await SizeTable.findOne({ productId: product._id });
      const findBrand = await Brand.findOne({ _id: product.brandId });
      const findCategory = await Category.findOne({ _id: product.categoryId });
      const saleDetails = await SaleDetails.findOne({ productId: product._id });
      if (saleDetails) {
        const sales = await Sales.findOne({ _id: saleDetails.salesId });
        product.sales = sales;
      } else {
        product.sales = null;
      }
      product.brandName = findBrand.brandName;
      product.categoryName = findCategory.categoryName;
      product.sizeTable = findSizeTable;
      res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: product, });
    }
    else {
      res.status(HttpStatusCode.NOT_FOUND).json({ success: false, status: 404, message: "cannot find product", data: null });
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    validateMongoDbId(id);
    const findProduct = await Product.findOne({ _id: id });
    if (!findProduct) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 404, message: "cannot find product", data: null });
    }
    else {
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
          name: req?.body?.name ?? findProduct.name,
          description: req?.body?.description ?? findProduct.description,
          brandId: req?.body?.brandId ?? findProduct.brandId,
          categoryId: req?.body?.categoryId ?? findProduct.categoryId,
          price: req?.body?.price ?? findProduct.price,
          rate: req?.body?.rate ?? findProduct.rate,
          productNew: req?.body?.productNew ?? findProduct.productNew,
          purchase: req?.body?.purchase ?? findProduct.purchase,
          stock: req?.body?.stock ?? findProduct.stock,
          active: req?.body?.active ?? findProduct.active,
          image: req?.body?.image ?? findProduct.image,
          dateUpdated: Date.now(),
          updateBy: req?.body?.updateBy,
        }, { new: true }
      );
      res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: updatedProduct });
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
};
