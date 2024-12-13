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
         console.log('User ID from token:', req.user.user_id);
         
         // Construct the SQL query
         const sqlQuery = `
           SELECT 
             u.user_id, u.username, u.first_name, u.last_name, u.email,
             u.profile_picture, u.phone, u.user_password,
             a.account_name,
             ap.demo, ap.resource_management, ap.analytics_plus, ap.automation, ap.ai_assist,
             r.role_name,
             acs.setting_key AS account_setting_key, acs.setting_value AS account_setting_value,
             us.setting_key AS user_setting_key, us.setting_value AS user_setting_value
           FROM users u
           LEFT JOIN accounts a ON u.account_id = a.account_id
           LEFT JOIN account_privileges ap ON a.account_id = ap.account_id
           LEFT JOIN roles r ON u.role_id = r.role_id
           LEFT JOIN account_settings acs ON a.account_id = acs.account_id
           LEFT JOIN user_settings us ON u.user_id = us.user_id
           WHERE u.user_id = 1
         `;
     
         // Execute the query
         const results = await sequelize.query(sqlQuery, {
           replacements: [req.user.user_id], // Replaces $1
           type: Sequelize.QueryTypes.SELECT
         });
     
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
//     try {
//       console.log('User ID from token:', req.user.user_id);
//       const user = await User.findOne({
//         where: { user_id: req.user.user_id },
//         include: [
//           {
//             model: Account,
//             attributes: ['account_name'],
//             include: [{
//               model: AccountPrivileges,
//               attributes: ['demo', 'resource_management', 'analytics_plus', 'automation', 'ai_assist']
//             }]
//           },
//           {
//             model: Role,
//             attributes: ['role_name']
//           }
//         ],
//         raw: true,
//         nest: true
//       });

//       if (!user) {
//         console.log('No user found for ID:', req.user.user_id);
//         return res.status(404).json({ message: 'User not found' });
//       }

//       console.log('Found user data:', user);
//       res.json(user);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       res.status(500).json({ message: 'Error fetching user profile' });
//     }
//   }
};

module.exports = userController; 