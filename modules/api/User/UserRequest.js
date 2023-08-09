const joi = require('joi'); //first we will import joi to our file
const User = require('../../../models/User');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');



  // 
  // 
  //@route api/v1/users/store 
  const StoreRequest = async (req,res,next) => {

    const schema = joi.object().options({ abortEarly: false }).keys({
      full_name: joi.string().min(5).required(),
      username: joi.string().min(5).required(),
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

    //Duplicate Email Validation Check
    const email_validation_response = await User.findOne({where:{email: req.body.email}});
    if(email_validation_response){
      return res.status(400).json({
        message:"SomeThing Went Wrong",
        errors:{email:"Email Allready Associat With Other Account"}
      });
    }

    //Duplicate Email Validation Check
    const username_validation = await User.findOne({where:{username: req.body.username}});
    if(username_validation){
      return res.status(400).json({
        message:"SomeThing Went Wrong",
        errors:{username:"Username Allready Associat With Other Account"}
      });
    }

    next();
};







  module.exports = {
    StoreRequest
  }