const db  = require("../config/mysql");
const { QueryTypes } = require('sequelize');
const PermissionModel = require("../models/Permission");
const Role = require("../models/Role");
const RolePermissionModel = require("../models/RolePermission");


const getPermissionsGroup = async () => {
    return db.query("SELECT type,GROUP_CONCAT(permissions.name) as name,GROUP_CONCAT(permissions.id) as id,GROUP_CONCAT(permissions.title) as title from permissions GROUP BY type",{ type: QueryTypes.SELECT });
}

const selectedPermission = async (role_id) => {
    let selectedPermission = await db.query(`select role_permissions.permissionId as id from role_permissions WHERE roleId = ${role_id};`,{ type: QueryTypes.SELECT });
    return selectedPermission.map(obj => obj.id.toString() );
}



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



    
    return {
        permissions: await getPermissionsGroup(),
        selectedPermission : await selectedPermission(role_id)
    }

}


const userPermission = async (role_id) => {

    let selectedPermission = await RolePermissionModel.findAll({where:{roleId:role_id}});
    const permissions = await PermissionModel.findAll({where:{id:selectedPermission}});
    return permissions;

}








module.exports = {
    updatePermission,
    getPermissions,
    userPermission
}