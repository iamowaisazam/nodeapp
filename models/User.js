const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
const Role = require('./Role');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    full_name: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false,
    },
    roleId: {
        type: DataTypes.BIGINT,
        references: {
            model: Role,
            key: 'id'
        }
        
    },
    createdBy: {
        type: DataTypes.INTEGER,
        defaultValue:0,
        
    },
    updatedBy: {
        type: DataTypes.INTEGER,
    }
  },{
    tableName:"users"
  });


module.exports = User