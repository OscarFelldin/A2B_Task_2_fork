const ApiCallHistory = require('../models/apiCallHistory');

const getWeather = async (req, res) => {
    try {
        const { city } = req.params;
        
        // Log the API call
        await ApiCallHistory.create({
            userId: req.user.userId,
            userName: req.user.userName,
            endpoint: `Weather API - ${city}`
        });

        // Mock weather data (replace with actual API call)
        const weatherData = {
            temperature: Math.floor(Math.random() * 30),
            description: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)]
        };

        res.json(weatherData);
    } catch (error) {
        console.error('Error in weather API:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getApiHistory = async (req, res) => {
    try {
        const history = await ApiCallHistory.findAll({
            order: [['timestamp', 'DESC']],
            limit: 50
        });
        
        res.json(history);
    } catch (error) {
        console.error('Error fetching API history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getWeather,
    getApiHistory
}; 