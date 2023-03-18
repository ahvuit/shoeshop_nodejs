const SaleDetails = require("../models/saleDetails");
const Sales = require("../models/sales");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const HttpStatusCode = require("../config/HttpStatusCode");

const createSaleDetails = asyncHandler(async (req, res) => {
  try {
    const findSales = await Sales.findOne({ _id: req.body.salesId });
    const findProduct = await Product.findOne({ _id: req.body.productId });
    const saleDetails = await SaleDetails.findOne({ productId: req.body.productId });
    console.log(saleDetails);
    if (!saleDetails) {
      const newSaleDetails = await new SaleDetails({
        salesId: req.body.salesId,
        productId: req.body.productId,
        salesPrice:
          findProduct.price - (findProduct.price * findSales.percent) / 100,
        updateBy: req.body.updateBy,
      }).save();
      res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: newSaleDetails });
    } else {
      res.status(HttpStatusCode.HTTP_NOT_IMPLEMENTED).json({ success: false, status: 401, message: "The product already exists in another promotion.", data: null });
    }
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
  }
});

const getSaleDetailsBySalesId = asyncHandler(async (req, res) => {
  try {
    const salesId = req.params.id;
    await SaleDetails.find({ salesId: salesId })
      .then((details) => {
        res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: details });
      })
      .catch((err) => {
        console.error(err);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, status: 500, message: "An error occurred while searching for sales details.", data: null });
      });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
  }
});

const deleteSaleDetails = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    await SaleDetails.findOneAndDelete({ productId: productId })
      .then((details) => {
        if (details) {
          res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: null });
        }
        else{
          res.status(HttpStatusCode.NOT_FOUND).json({ success: false, status: 404, message: "Sale Details is not found", data: null });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, status: 500, message: "An error occurred while deleting the sales details.", data: null });
      });
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
  }
});

module.exports = {
  createSaleDetails,
  getSaleDetailsBySalesId,
  deleteSaleDetails,
};
