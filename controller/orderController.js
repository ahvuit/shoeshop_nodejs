const Product = require("../models/product");
const Status = require("../models/status");
const Order = require("../models/order");
const OrderDetails = require("../models/orderDetails");
const OrderOrderDetails = require("../models/OrderOrderDetails");
const asyncHandler = require("express-async-handler");
const HttpStatusCode = require("../config/HttpStatusCode");

const createOrder = asyncHandler(async (req, res) => {
    try {
        const orderModel = await req.body.orderModel;
        const listOrderDetails = await req.body.listOrderDetails;
        const newOrder = await Order.create({
            userId: orderModel.userId,
            firstName: orderModel.firstName,
            lastName: orderModel.lastName,
            phone: orderModel.phone,
            email: orderModel.email,
            note: orderModel.note,
            address: orderModel.address,
        });
        const newArray = [];
        return Promise.all([fastFunction(listOrderDetails, newOrder, newArray), slowFunction(newOrder, newArray, res)]);
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
});

function fastFunction(listOrderDetails, newOrder, newArray) {
    return new Promise((resolve) => {
        setTimeout(async function () {
            listOrderDetails.forEach(async (element) => {
                const newOrderDetails = await OrderDetails.create({
                    orderId: newOrder._id,
                    productId: element.productId,
                    quantity: element.quantity,
                    size: element.size,
                    price: element.price,
                    total: element.price * element.quantity
                });
                newOrder.total+=newOrderDetails.total;
                newArray.push(newOrderDetails);
            });
            const findStatus = await Status.find();
            const firstValue = findStatus[0]._id._id;
            newOrder.statusId = firstValue;
            resolve()
        }, 100)
    })
}

function slowFunction(newOrder, newArray, res) {
    return new Promise((resolve) => {
        setTimeout(function () {
            const orderOrderDetails = new OrderOrderDetails(newOrder, newArray);
            res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: orderOrderDetails });
            resolve()
        }, 300)
    })
}

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(HttpStatusCode.OK).json({ success: true, status: 200, message: "Successfully", data: orders });
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
});

const getOrderDetails = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
});

const payment = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
});

const cancelOrder = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, status: 400, message: error.message, data: null });
    }
});

module.exports = {
    createOrder,
    getAllOrders,
    getOrderDetails,
    updateOrder,
    payment,
    cancelOrder,
    getOrderByUserId
};
