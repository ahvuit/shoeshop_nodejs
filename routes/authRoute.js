const express = require('express');
const router = express.Router();
const { createUser, loginUser, index, detail } = require('../controller/userController');
const auth = require("../middleware/authMiddleware");
router.post('/register',createUser);
router.post('/login', loginUser);
router.get('/index',auth.authMiddleware,index);
router.get('/detail/:id',auth.authMiddleware, detail);
module.exports = router;