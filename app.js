const express = require ('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=66538826eb71262703743008a9fcb91b';
    
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            const humidity = weatherData.main.humidity;
            console.log(temp);

        });
    });
    
    res.send("Hello");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});