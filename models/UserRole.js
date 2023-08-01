const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const User = require('./User');
const Role = require('./Role');


const UserRole = sequelize.define('UserRole', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    userId: {
        type: DataTypes.BIGINT,
        references: {
            model: User,
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
    tableName:"user_roles"
  });


module.exports = UserRole