const jwt = require('jsonwebtoken');
const { User, Account, Role } = require('../models');

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('Login attempt for username:', username);

      const user = await User.findOne({
        where: { username },
        include: [
          {
            model: Account,
            attributes: ['account_name']
          },
          {
            model: Role,
            attributes: ['role_name']
          }
        ],
        attributes: ['user_id', 'username', 'user_password', 'first_name', 'last_name', 'account_id', 'role_id']
      });

      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      console.log('Stored password:', user.user_password);
      console.log('Provided password:', password);
      
      if (password !== user.user_password) {
        console.log('Invalid password');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { 
          user_id: user.user_id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          account_id: user.account_id,
          role_id: user.role_id,
          role_name: user.Role?.role_name
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('Login successful for user:', username);
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed: ' + error.message });
    }
  },

  logout: async (req, res) => {
    res.json({ message: 'Logged out successfully' });
  }
};

module.exports = authController; 