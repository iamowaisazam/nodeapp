const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;


const RolePermissionSchema = mongoose.Schema({
  role_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required:true
  },
  permission_id:{
    type: ObjectId,
    ref: 'Permission',
    required:true
  },
},{
    timestamps:true
});



ObjectId.prototype.valueOf = function () {
	return this.toString();
};



module.exports = mongoose.model("RolePermission",RolePermissionSchema)