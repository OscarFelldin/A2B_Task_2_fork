const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  accountId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
});

module.exports = Setting; 