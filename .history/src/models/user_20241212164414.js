const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  first_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  last_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  profile_picture: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  user_password: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User; 