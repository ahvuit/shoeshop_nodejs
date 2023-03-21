const express = require('express');
const router = express.Router();
const { createUser, loginUser, index, detail, updateUser } = require('../controller/userController');
const { getAllComments, createComment } = require('../controller/commentController');
const { insertOrUpdateKeyword, getProductByUserId } = require('../controller/searchHistoryController');
const { getProfile, updateProfile } = require('../controller/profileController');
const { createProduct, getAllProducts, getProductDetails, updateProduct } = require('../controller/productController');
const { createBrand, getAllBrands, getBrandDetails, updateBrand } = require('../controller/brandController');
const { createCategory, getAllCategories, getCategoryDetails, updateCategory } = require('../controller/categoryController');
const { getAllSizeTables, getSizeTableDetails, updateSizeTable } = require('../controller/sizeTableController');
const { getAllSales, getSalesById, createSales, updateSales } = require('../controller/salesController');
const { getSaleDetailsBySalesId, createSaleDetails, deleteSaleDetails } = require('../controller/saleDetailsController');
const { getStatusDetails, createStatus, deleteStatus, updateStatus,getAllStatus } = require('../controller/StatusController');
const { createOrder, getAllOrders, getOrderDetails, getOrderByUserId,updateOrder,payment,cancelOrder } = require('../controller/OrderController');
const auth = require("../middleware/authMiddleware");

//router auth & user
router.post('/register',createUser);
router.post('/login', loginUser);
router.get('/getAllUser',auth.verifyToken ,index);
router.get('/getUserDetails/:id',auth.verifyToken , detail);
router.put('/updateUser/:id',auth.verifyToken,updateUser);
//router profile
router.get('/getProfileDetails/:id',auth.verifyToken ,getProfile);
router.put('/updateProfile/:id',auth.verifyToken ,updateProfile);
//router product
router.post('/insertProduct',auth.verifyToken ,createProduct);
router.get('/getAllProducts',getAllProducts);
router.get('/getProductDetails/:id',auth.verifyToken ,getProductDetails);
router.put('/updateProduct/:id',auth.verifyToken ,updateProduct);
//router brand
router.post('/insertBrand',auth.verifyToken ,createBrand);
router.get('/getAllBrands',getAllBrands);
router.get('/getBrandDetails/:id',auth.verifyToken ,getBrandDetails);
router.put('/updateBrand/:id',auth.verifyToken ,updateBrand);
//router category
router.post('/insertCategory',auth.verifyToken ,createCategory);
router.get('/getAllCategories',getAllCategories);
router.get('/getCategoryDetails/:id',auth.verifyToken ,getCategoryDetails);
router.put('/updateCategory/:id',auth.verifyToken ,updateCategory);
//router size table
router.get('/getAllSizeTables',auth.verifyToken,getAllSizeTables);
router.get('/getSizeTableDetails/:id', getSizeTableDetails);
router.put('/updateSizeTable/:id',auth.verifyToken ,updateSizeTable);
//router sales
router.get('/getAllSales',getAllSales);
router.get('/getSalesById/:id',getSalesById);
router.post('/insertSales',auth.verifyToken ,createSales);
router.put('/updateSales/:id',auth.verifyToken ,updateSales);
//router saleDetails
router.get('/getSaleDetailsBySalesId/:id',getSaleDetailsBySalesId);
router.post('/insertSalesDetails',auth.verifyToken ,createSaleDetails);
router.delete('/deleteSaleDetails/:id',auth.verifyToken ,deleteSaleDetails);
//router status
router.post('/insertStatus',auth.verifyToken ,createStatus);
router.get('/getAllStatus',auth.verifyToken,getAllStatus);
router.get('/getStatusDetails/:id',auth.verifyToken ,getStatusDetails);
router.put('/updateStatus/:id',auth.verifyToken ,updateStatus);
router.delete('/deleteStatus/:id',auth.verifyToken ,deleteStatus);
//router Order
router.post('/insertOrder',auth.verifyToken ,createOrder);
router.get('/getAllOrders',auth.verifyToken,getAllOrders);
router.get('/getOrderDetails/:id',auth.verifyToken ,getOrderDetails);
router.get('/getOrderByUserId/:id',auth.verifyToken ,getOrderByUserId);
router.put('/updateOrder/:id',auth.verifyToken ,updateOrder);
router.put('/paymentOrder/:id',auth.verifyToken ,payment);
router.put('/cancelOrder/:id',auth.verifyToken ,cancelOrder);
//router Comment
router.post('/insertComment',auth.verifyToken ,createComment);
router.get('/getAllComments/:id',getAllComments);
//router search history
router.put('/insertOrUpdateKeyword',auth.verifyToken ,insertOrUpdateKeyword);
router.get('/getProductByUserId/:id',auth.verifyToken ,getProductByUserId);
module.exports = router;