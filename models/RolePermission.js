const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
const Permission = require('./Permission');
const Role = require('./Role');



const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    permissionId: {
        type: DataTypes.BIGINT,
        references: {
            model: Permission,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.BIGINT,
        references: {
            model: Role,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue:1,
        allowNull:false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        defaultValue:0,
    }
  },{
    tableName:"role_permissions"
  });


module.exports = RolePermission