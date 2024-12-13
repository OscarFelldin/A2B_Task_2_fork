const { sequelize } = require('../config/database');
const { Sequelize } = require('sequelize');
const { User, Account, AccountPrivileges, Role } = require('../models');

const userController = {
   getAllUsers: async (req, res) => {
      try {
         const users = await User.findAll({
            where: { accountId: req.user.accountId }
         });
         res.json(users);
      } catch (error) {
         res.status(500).json({ message: 'Error fetching users' });
      }
   },

   getUserById: async (req, res) => {
      try {
         const user = await User.findByPk(req.params.id);
         if (!user) {
            return res.status(404).json({ message: 'User not found' });
         }
         res.json(user);
      } catch (error) {
         res.status(500).json({ message: 'Error fetching user' });
      }
   },

   updateUser: async (req, res) => {
      try {
         const user = await User.findByPk(req.params.id);
         if (!user) {
            return res.status(404).json({ message: 'User not found' });
         }
         await user.update(req.body);
         res.json(user);
      } catch (error) {
         res.status(500).json({ message: 'Error updating user' });
      }
   },

   deleteUser: async (req, res) => {
      try {
         const user = await User.findByPk(req.params.id);
         if (!user) {
            return res.status(404).json({ message: 'User not found' });
         }
         await user.destroy();
         res.json({ message: 'User deleted successfully' });
      } catch (error) {
         res.status(500).json({ message: 'Error deleting user' });
      }
   },

   // getUserProfile: async (req, res) => {
   //    try {
   //       const userId = req.user.user_id;
   //       console.log('User ID from token:', userId);
   //       const user = await sequelize.query(sql`SELECT * FROM users WHERE user_id = ${userId}`);

   //       res.json(user);
   //    } catch (error) {
   //       console.error('Error fetching user profile:', error);
   //       res.status(500).json({ message: 'Error fetching user profile' });
   //    }
   // },

   getUserProfile: async (req, res) => {
      try {
         //console.log('Requestet:', req);
         console.log('User ID from token:', req.user.user_id);
         // Construct the SQL query
         const sqlQuery = `
            SELECT 
               users.user_id, users.username, users.first_name, users.last_name, users.email,
               users.profile_picture, users.phone, users.user_password, roles.role_name,
               user_settings.setting_key AS user_setting_key, user_settings.setting_value AS user_setting_value,
               accounts.account_name,
               account_privileges.demo, account_privileges.resource_management, account_privileges.analytics_plus, account_privileges.automation, account_privileges.ai_assist,
               account_settings.setting_key AS account_setting_key, account_settings.setting_value AS account_setting_value
            FROM users
            INNER JOIN user_settings
            ON users.user_id = user_settings.user_id
            INNER JOIN roles
            ON users.role_id = roles.role_id
            INNER JOIN accounts
            ON users.account_id = accounts.account_id
            INNER JOIN account_privileges
            ON accounts.account_id = account_privileges.account_id
            INNER JOIN account_settings
            ON accounts.account_id = account_settings.account_id
            WHERE users.user_id = ${req.user.user_id}
         `;

         // {
         //    user_id: 1,
         //    username: 'jdoe',
         //    first_name: 'John',
         //    last_name: 'Doe',
         //    email: 'jdoe@example.com',
         //    profile_picture: null,
         //    phone: '555-1234',
         //    user_password: 'jdoe',
         //    account_name: 'Alpha Inc.',
         //    demo: 1,
         //    resource_management: 1,
         //    analytics_plus: 1,
         //    automation: 0,
         //    ai_assist: 0,
         //    role_name: 'Admin',
         //    account_setting_key: 'theme',
         //    account_setting_value: 'dark',
         //    user_setting_key: 'language',
         //    user_setting_value: 'en'
         //  }

         // Execute the query
         const results = await sequelize.query(sqlQuery, {
            replacements: [req.user.user_id], // Replaces $1
            type: Sequelize.QueryTypes.SELECT
         });
         // const results = await sequelize.query(sqlQuery, {
         //   replacements: [req.user.user_id], // Replaces $1
         //   type: Sequelize.QueryTypes.SELECT
         // });

         console.log('Found user data:', results);

         if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
         }

         res.json(results[0]);
      } catch (error) {
         console.error('Error fetching user profile:', error);
         res.status(500).json({ message: 'Error fetching user profile' });
      }
   }

//   getUserProfile: async (req, res) => {
//       try {
//          console.log('User ID from token:', req.user.user_id);
//          const user = await User.findOne({
//             where: { user_id: req.user.user_id },
//             include: [
//                {
//                   model: Account,
//                   attributes: ['account_name'],
//                   include: [{
//                      model: AccountPrivileges,
//                      attributes: ['demo', 'resource_management', 'analytics_plus', 'automation', 'ai_assist']
//                   }]
//                },
//                {
//                   model: Role,
//                   attributes: ['role_name']
//                }
//             ],
//             raw: true,
//             nest: true
//          });

//          if (!user) {
//             console.log('No user found for ID:', req.user.user_id);
//             return res.status(404).json({ message: 'User not found' });
//          }

//          console.log('Found user data:', user);
//          res.json(user);
//       } catch (error) {
//          console.error('Error fetching user profile:', error);
//          res.status(500).json({ message: 'Error fetching user profile' });
//       }
//    }
};

module.exports = userController; 