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
    image:{
        type: DataTypes.STRING,
        allowNull:true,
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
    phone:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    about:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    company:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    job:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    country:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    state:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    city:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    address:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    facebook:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    twitter:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    instagram:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    linkedin:{
        type: DataTypes.STRING,
        allowNull:true,
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