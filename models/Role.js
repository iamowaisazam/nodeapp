const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
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
    tableName:"roles"
  });


module.exports = Role