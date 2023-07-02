const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  slug:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:false
  },
  image:{
      type:String,
      required:false
  },
  status: {
    type: String, 
    enum: ['deactive', 'active'],
    default: 'active'
  },
},{
    timestamps:true
});



module.exports = mongoose.model("Category",CategorySchema)