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

  getUserProfile: async (req, res) => {
    try {
      console.log('User ID from token:', req.user.user_id);
      const user = await User.findOne({
        where: { user_id: req.user.user_id },
        include: [
          {
            model: Account,
            attributes: ['account_name'],
            include: [{
              model: AccountPrivileges,
              attributes: ['demo', 'resource_management', 'analytics_plus', 'automation', 'ai_assist']
            }]
          },
          {
            model: Role,
            attributes: ['role_name']
          }
        ],
        raw: true,
        nest: true
      });

      if (!user) {
        console.log('No user found for ID:', req.user.user_id);
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('Found user data:', user);
      res.json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Error fetching user profile' });
    }
  }
};

module.exports = userController; 