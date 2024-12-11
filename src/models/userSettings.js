const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserSettings = sequelize.define('UserSettings', {
  setting_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
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
  tableName: 'user_settings',
  timestamps: false
});

module.exports = UserSettings; 