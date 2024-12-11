const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Account = sequelize.define('Account', {
  account_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  account_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'accounts',
  timestamps: false
});

module.exports = Account; 