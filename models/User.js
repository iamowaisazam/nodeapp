const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  about:{
    type:String,
    required:false
  },
  company:{
    type:String,
    required:false
  },
  job:{
    type:String,
    required:false
  },
  country:{
    type:String,
    required:false
  },
  state:{
    type:String,
    required:false
  },
  city:{
    type:String,
    required:false
  },
  street_address:{
    type:String,
    required:false
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:false
  },
  password:{
    type:String,
    required:true,
    default:"0"
  },
  role_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
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
  facebook:{
    type:String,
    required:false
  },
  twitter:{
    type:String,
    required:false
  },
  instagram:{
    type:String,
    required:false
  },
  linkedin:{
    type:String,
    required:false
  },
},{
    timestamps:true
});



module.exports = mongoose.model("User",UserSchema)