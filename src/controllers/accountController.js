const { Account } = require('../models');

const accountController = {
  getAllAccounts: async (req, res) => {
    try {
      const accounts = await Account.findAll();
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching accounts' });
    }
  },

  getAccountById: async (req, res) => {
    try {
      const account = await Account.findByPk(req.params.id);
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      res.json(account);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching account' });
    }
  },

  createAccount: async (req, res) => {
    try {
      const account = await Account.create(req.body);
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ message: 'Error creating account' });
    }
  },

  updateAccount: async (req, res) => {
    try {
      const account = await Account.findByPk(req.params.id);
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      await account.update(req.body);
      res.json(account);
    } catch (error) {
      res.status(500).json({ message: 'Error updating account' });
    }
  },

  deleteAccount: async (req, res) => {
    try {
      const account = await Account.findByPk(req.params.id);
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      await account.destroy();
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting account' });
    }
  }
};

module.exports = accountController; 