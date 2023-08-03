const RoleModel = require("../models/Role");
const UserModel = require("../models/User");
const { userPermission } = require("../utils/Permission");


const getAuthDetail = async (token) => {
    
   
    let user = await UserModel.findOne({id:token});
    if(user == undefined){
        return false;
    }
    
    let userPerm = await userPermission(user.roleId)
    let role = await RoleModel.findOne({id:user.roleId});
  
    user.role = role.title;
    user.permissions = userPerm;
    return user;

}


module.exports = {
    getAuthDetail
}