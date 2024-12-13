const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
   {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
   }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('[=======FROM ENDER=======]✅ Database connection has been established successfully.');
    
    // Test query to check users table
    const [results] = await sequelize.query('SELECT username FROM users');
    console.log('Available usernames:', results.map(r => r.username));
    
  } catch (error) {
    console.error('[=======FROM ENDER=======]❌ Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = { sequelize }; 