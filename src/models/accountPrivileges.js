const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AccountPrivileges = sequelize.define('AccountPrivileges', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'account_id'
    }
  },
  demo: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  resource_management: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  analytics_plus: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  automation: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ai_assist: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'account_privileges',
  timestamps: false
});

module.exports = AccountPrivileges; 