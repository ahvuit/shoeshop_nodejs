const asyncHandler = require("express-async-handler");
const HttpStatusCode = require("../config/HttpStatusCode");
const Comment = require("../models/comment");
const Product = require("../models/product");

const createComment = asyncHandler(async (req, res) => {
    try {
      const id = req.body.productId;
      await Product.findOne({ _id: id }).then(async () => {
        const comment = await Comment.create(req.body);
        res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: comment });
      }).catch((err) => {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, status: 500, message: "An error occurred while comment.", data: null });
    });
      
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
  });

const getAllComments = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        await Comment.find({ productId: id }).then(comment => {
            res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: comment });
        }).catch((err) => {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, status: 500, message: "An error occurred while searching comment.", data: null });
        });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
});

module.exports = {
    createComment,
    getAllComments
};