
const { validationResult } = require("express-validator");
const RoleModel = require("../../../models/Role");
const User = require("../../../models/User");
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role = require("../../../models/Role");



// 
// 
//@route api/v1/register
const register = async (req,res) => {

    try {

            let newPassword = await bcrypt.hash(req.body.password,10);
            let token = newPassword;
            const createdUser = await  User.create({
                full_name:req.body.name,
                username:null,
                email:req.body.email,
                password:newPassword,
                role_id:0,
            });

            return res.status(200).json({
                message:"Login Success",
                data:{
                    token:token,
                    "id": createdUser.id,
                    "full_name": createdUser.full_name,
                    "username": createdUser.username,
                    "email": createdUser.email,
                    "roleId": createdUser.roleId,
                }
            });

    } catch (error) {
        return res.json({
            "message":"Register Failed",
            "data":u,
        });
    }   

}



// 
// 
//@route api/v1/login 
const login = async (req,res) => {

    try {

        let data = req.login;
        const token = jwt.sign({user_id: data.id},
             process.env.TOKEN_KEY,{expiresIn: "24h"}
        );

        return res.status(200).json({
            message:"Login Success",
            data:{
                token:token,
                "id": data.id,
                "full_name": data.full_name,
                "username": data.username,
                "email": data.email,
                "roleId": data.roleId,
            }
        });

    } catch (error) {
        return res.status(400).json({
            message:"Something Went Wrong' Login Failed ",
          });
    }

}


// 
// 
//@route api/v1/getProfile 
const getProfile = async (req,res) => {

    try {
        let data = req.user;
        let role = await Role.findOne({where:{id:data.roleId},attributes:['id','name']});
        return res.status(200).json({
            message:"Get Auth Success",
            data:{
                "id": data.id,
                "full_name": data.full_name,
                "username": data.username,
                "email": data.email,
                "roleId": role,
            }
        });

    } catch (error) {
        return res.status(400).json({
            message:"Something Went Wrong' Login Failed ",
          });
    }

}



module.exports = {
    login,
    register,
    getProfile
}