const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
    const {email, password} = req.body;
    const userDB = await userModel.findOne({email});
    if (userDB.password === password) {
        const token = jwt.sign({user_id: userDB._id, fullname: userDB.fullname, email: userDB.email}, `SECRET`);
        res.status(200).json({token});
    }
    next({error: `user does not exist`});
}

module.exports = {login}