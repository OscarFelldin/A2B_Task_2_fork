const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AccountSettings = sequelize.define('AccountSettings', {
  settings_id: {
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
  setting_key: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  setting_value: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'account_settings',
  timestamps: false
});

module.exports = AccountSettings; 