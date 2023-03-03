const express = require('express');
const router = express.Router();
const { createUser, loginUser, index, detail } = require('../controller/userController');
const auth = require("../middleware/authMiddleware");
router.post('/register',createUser);
router.post('/login', loginUser);
router.get('/getAllUser',auth.authMiddleware,index);
router.get('/getUserById/:id',auth.authMiddleware, detail);
module.exports = router;