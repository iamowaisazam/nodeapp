const joi = require('joi'); //first we will import joi to our file
const User = require('../../../models/User');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');



  // 
  // 
  //@route api/v1/Register 
  const RegisterRequest = async (req,res,next) => {

    const schema = joi.object().options({ abortEarly: false }).keys({
      name: joi.string().min(5).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(30).required(),
    });

    const result = await schema.validate(req.body);
    if(result.error){
      return res.status(400).json({
        message:"SomeThing Went Wrong",
        errors:result.error.details
      });
    }

    //finding User
    const response = await User.findOne({where:{email: req.body.email}});
    if(response){
      return res.status(400).json({
        message:"SomeThing Went Wrong",
        errors:{email:"Email Allready Associat With Other Account"}
      });
    }

  

    next();
};


  // 
  // 
  //@route api/v1/login 
  const LoginRequest = async (req,res,next) => {

        const schema = joi.object().options({ abortEarly: false }).keys({
          email: joi.string().email().required(),
          password: joi.string().min(6).max(30).required(),
        });

        const result = await schema.validate(req.body);
        if(result.error){
          return res.status(400).json({
            message:"SomeThing Went Wrong",
            errors:result.error.details
          });
        }

        //finding User
        const response = await User.findOne({where:{email: req.body.email}});
        if(response.length == 0){
          return res.status(400).json({
            message:"SomeThing Went Wrong",
            errors:{email:"Incorrect Email Or Password"}
          });
        }
        req.login = response;

        //matching password
        let compare = await bcrypt.compare(req.body.password,req.login.password);
        if(compare == false){
          return res.status(400).json({
            message:"SomeThing Went Wrong",
            errors:{email:"Incorrect Email Or Password"}
          });
        }

        next();
  };






  module.exports = {
    LoginRequest,
    RegisterRequest
  }