const User = require('../models/user');
const ApiResult = require('../models/ApiResult');
const HttpStatusCode = require('../config/HttpStatusCode');
const createUser = async (req, res)=>{
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if(!findUser){
        const newUser = await User.create(req.body);
        res.status(HttpStatusCode.OK).json({
            success: true,
            status:200,
            message: 'User created successfully',
            data: newUser
        })
    }else{
        res.json({
            msg: 'User already exists',
            success: false
        });
    }
}

module.exports = {createUser};