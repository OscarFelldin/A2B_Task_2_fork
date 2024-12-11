const Account = require('./account');
const User = require('./user');
const Role = require('./role');
const AccountPrivileges = require('./accountPrivileges');
const AccountSettings = require('./accountSettings');
const UserSettings = require('./userSettings');

// Define relationships
Account.hasMany(User, { foreignKey: 'account_id' });
User.belongsTo(Account, { foreignKey: 'account_id' });

Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

Account.hasOne(AccountPrivileges, { foreignKey: 'account_id' });
AccountPrivileges.belongsTo(Account, { foreignKey: 'account_id' });

Account.hasMany(AccountSettings, { foreignKey: 'account_id' });
AccountSettings.belongsTo(Account, { foreignKey: 'account_id' });

User.hasMany(UserSettings, { foreignKey: 'user_id' });
UserSettings.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  Account,
  User,
  Role,
  AccountPrivileges,
  AccountSettings,
  UserSettings
}; 