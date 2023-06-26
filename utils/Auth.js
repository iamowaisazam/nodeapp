const RoleModel = require("../models/Role");
const UserModel = require("../models/User");
const { userPermission } = require("../utils/Permission");


const getAuthDetail = async (token) => {
    
   
    let user = await UserModel.findOne({_id:token});
    if(user == undefined){
        return false;
    }
    
    let userPerm = await userPermission(user.role_id)
    let role = await RoleModel.findOne({_id:user.role_id});
  
    user.role = role.title;
    user.permissions = userPerm;
    return user;

}


module.exports = {
    getAuthDetail
}