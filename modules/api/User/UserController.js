
const { validationResult } = require("express-validator");
const RoleModel = require("../../../models/Role");
const User = require("../../../models/User");
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require("../../../models/Role");



// 
// 
//@route api/v1/users/index/
const index = async (req,res) => {

    try {
           let respone = await User.findAll();
            return res.status(200).json({
                message:"User Get",
                data:respone
            });

    } catch (error) {
        return res.status(400).json({
            "message":"Failed Get Users",
        });
    }   

}

// 
// 
//@route api/v1/users/
const view = async (req,res) => {

    try {
           let respone = await User.findOne({where:{id:req.params.id}});
            return res.status(200).json({
                message:"User Get",
                data:respone
            });

    } catch (error) {
        return res.status(400).json({
            "message":"Failed Get Users",
        });
    }   

}


module.exports = {
    index,
    view
}