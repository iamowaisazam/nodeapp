
const { validationResult } = require("express-validator");
const RoleModel = require("../../../models/Role");
const User = require("../../../models/User");
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require("../../../models/Role");
const { getCurrentTimeStump } = require("./UserUtil");



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
const find = async (req,res) => {

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


// 
// 
//@route api/v1/users/store
const store = async (req,res) => {

    try {

            let roleId = await Role.findOne({where:{"name":"Admin"}});
            let password = await bcrypt.hash(req.body.password,10);

            let data = {
                full_name:req.body.full_name,
                username:req.body.username,
                email: req.body.email,
                password:password,
                status:1,
                roleId:roleId.id,
                created_at:getCurrentTimeStump(),
                createdBy: req.user.id,
            };

        
           let respone = await User.create(data);
            return res.status(200).json({
                message:"User Created Successfully",
                data:{respone}
            });

    } catch (error) {
        return res.status(400).json({
            "message":"Failed Create Users",
        });
    }   

}

// 
// 
//@route api/v1/users/store
const update = async (req,res) => {

    try {
           let respone = await User.create({

           });
            return res.status(200).json({
                message:"User Created Successfully",
                data:respone
            });

            // let data = {
            //     full_name:req.body.full_name,
            //     username:req.body.username,
            //     email: req.body.email,
            //     password:req.body.password,
            //     status:req.body.status,
            //     roleId:req.body.roleId,
                
            //     phone:req.body.phone,
            //     about:req.body.about,
            //     company:req.body.about,
            //     job:req.body.about,
            //     state:req.body.about,
            //     city:req.body.about,
            //     address:req.body.about,
            //     facebook:req.body.about,
            //     twitter:req.body.about,
            //     instagram:req.body.about,
            //     linkedin:req.body.about,
            //     createdBy: req.body.about,
            //     image:null,
            //     updatedBy:req.body.about,
            // }

    } catch (error) {
        return res.status(400).json({
            "message":"Failed Create Users",
        });
    }   

}





module.exports = {
    index,
    find,
    update,
    store
}