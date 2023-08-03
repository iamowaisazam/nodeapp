const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    title: {
        type: DataTypes.STRING,
        unique:false,
    },
    name: {
        type: DataTypes.STRING,
        unique:true,
    },
    type: {
        type: DataTypes.STRING,
        unique:false,
        allowNull:true,
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
    tableName:"permissions"
  });


module.exports = Permission