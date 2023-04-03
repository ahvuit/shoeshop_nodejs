const Rating = require("../models/rating");
const asyncHandler = require("express-async-handler");
const HttpStatusCode = require("../config/HttpStatusCode");

const rating = asyncHandler(async (req, res) => {
    try {
        const productId = req.body.productId;
        const userId = req.body.userId;
        await Rating.findOneAndUpdate({ userId: userId, productId: productId },
            { rate: req.body.rate },
            { upsert: true, new: true })
            .exec()
            .then(rating => {
                res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: rating });
            })
            .catch(error => {
                console.error(error);
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, status: 500, message: "An error occurred while searching brand details.", data: null });
            });
    } catch (error) {
        res
            .status(HttpStatusCode.BAD_REQUEST)
            .json({
                success: false,
                status: 400,
                message: error.message,
                data: null,
            });
    }
});

module.exports = {
    rating,
};
