const PermissionModel = require("../models/Permission");
const Role = require("../models/Role");
const RolePermissionModel = require("../models/RolePermission");


const updatePermission= async (role_id,data) => {


    let DelRolePermission = await RolePermissionModel.deleteMany({role_id:role_id});

    let perms = [];
    if(data){
            data.forEach(element => {
            perms.push({
                role_id:role_id,
                permission_id:element
            })
        });   
     }
     DelRolePermission = await RolePermissionModel.insertMany(perms);

}

const getPermissions = async (role_id) => {

    let response = [];

    const permissionsTypes = await PermissionModel.distinct('type');
    const permissions = await PermissionModel.find();

    let selectedPermission = await RolePermissionModel.find({role_id:role_id}).distinct('permission_id');
    selectedPermission = selectedPermission.map(obj => obj.toString());
    

    permissionsTypes.forEach(type => {
      
        let tt = [];
        permissions.forEach(per => {
            if(per.type == type){

                // console.log(selectedPermission.includes(per.id));

                tt.push({
                    _id:per.id,
                    name:per.name,
                    title:per.title,
                    is_selected:selectedPermission.includes(per.id)
                });
            } 
        });
        response.push({
            "type":type,
            "permissions":tt
        });
    });


    // console.log(response);

    return response;

}


const userPermission = async (role_id) => {


    let selectedPermission = await RolePermissionModel.find({role_id:role_id}).distinct('permission_id');
    const permissions = await PermissionModel.find({ _id : { $in : selectedPermission } } ).distinct('name');
    return permissions;

}








module.exports = {
    updatePermission,
    getPermissions,
    userPermission
}