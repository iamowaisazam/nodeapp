const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
},{
    timestamps:true
});



module.exports = mongoose.model("Permission",PermissionSchema)