const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
    default:"0"
  },
  role_id:{
    type:String,
    required:true
  },
  image:{
      type:String,
      required:false
  },
  status: {
    type: String, 
    enum: ['disable', 'active'],
    default: 'active'
  },
  is_email_verified: {
    type: Number, 
    default: false
  },
  forget_password_token: {
    type: String, 
    required:false,
  },
},{
    timestamps:true
});



module.exports = mongoose.model("User",UserSchema)