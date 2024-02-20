const axios = require('axios');

exports.getWeather = async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City parameter is missing' });
        }

        const apiKey = '6f72488daa00c3999f171ec0a72f7403';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
};
