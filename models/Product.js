const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  slug:{
    type:String,
    required:true
  },
  price:{
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
  category_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required:true
  },
  
  status: {
    type: String, 
    enum: ['deactive', 'active'],
    default: 'active'
  },
},{
    timestamps:true
});



module.exports = mongoose.model("Product",ProductSchema)