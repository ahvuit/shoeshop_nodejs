const express = require('express');
const router = express.Router();
const { createUser, loginUser, index, detail, updatedUser } = require('../controller/userController');
const { getProfile, updatedProfile } = require('../controller/profileController');
const { createProduct, getAllProducts, getProductDetails, updatedProduct } = require('../controller/productController');
const auth = require("../middleware/authMiddleware");

//router auth & user
router.post('/register',createUser);
router.post('/login', loginUser);
router.get('/getAllUser',auth.verifyToken ,index);
router.get('/getUserDetails/:id',auth.verifyToken , detail);
router.put('/updatedUser/:id',auth.verifyToken ,auth.isAdmin,updatedUser);
//router profile
router.get('/getProfileDetails/:id',auth.verifyToken ,getProfile);
router.put('/updatedProfile/:id',auth.verifyToken ,updatedProfile);
//router product
router.post('/insertProduct',auth.verifyToken ,createProduct);
router.get('/getAllProducts',auth.verifyToken ,getAllProducts);
router.get('/getProductDetails/:id',auth.verifyToken ,getProductDetails);
router.put('/updatedProduct/:id',auth.verifyToken ,updatedProduct);
module.exports = router;