const express = require('express');
const router = express.Router();
const { createUser, loginUser, index, detail, updateUser } = require('../controller/userController');
const { getProfile, updateProfile } = require('../controller/profileController');
const { createProduct, getAllProducts, getProductDetails, updateProduct } = require('../controller/productController');
const { createBrand, getAllBrands, getBrandDetails, updateBrand } = require('../controller/brandController');
const { createCategory, getAllCategories, getCategoryDetails, updateCategory } = require('../controller/categoryController');
const { getAllSizeTables, getSizeTableDetails, updateSizeTable } = require('../controller/sizeTableController');
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
router.get('/getAllProducts',auth.verifyToken ,getAllProducts);
router.get('/getProductDetails/:id',auth.verifyToken ,getProductDetails);
router.put('/updateProduct/:id',auth.verifyToken ,updateProduct);
//router brand
router.post('/insertBrand',auth.verifyToken ,createBrand);
router.get('/getAllBrands',auth.verifyToken ,getAllBrands);
router.get('/getBrandDetails/:id',auth.verifyToken ,getBrandDetails);
router.put('/updateBrand/:id',auth.verifyToken ,updateBrand);
//router category
router.post('/insertCategory',auth.verifyToken ,createCategory);
router.get('/getAllCategories',auth.verifyToken ,getAllCategories);
router.get('/getCategoryDetails/:id',auth.verifyToken ,getCategoryDetails);
router.put('/updateCategory/:id',auth.verifyToken ,updateCategory);
//router size table
router.get('/getAllSizeTables',auth.verifyToken ,getAllSizeTables);
router.get('/getSizeTableDetails/:id',auth.verifyToken ,getSizeTableDetails);
router.put('/updateSizeTable/:id',auth.verifyToken ,updateSizeTable);
module.exports = router;