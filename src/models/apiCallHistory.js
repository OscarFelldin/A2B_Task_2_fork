const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApiCallHistory = sequelize.define('ApiCallHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endpoint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = ApiCallHistory; 