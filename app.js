const express = require ('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=66538826eb71262703743008a9fcb91b&units=metric';
    
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            const humidity = weatherData.main.humidity;
            const icon = weatherData.weather[0].icon;
            res.write(`<h1>The temperature in London is ${temp} degrees celsius.</h1>`);
            res.write(`<h3>The weather is currently ${description}</h3>`);
            res.write(`<ul>
                <li>Minimum Temperature: ${minTemp}&deg</li>
                <li>Maximum Temperature: ${maxTemp}&deg</li>
                <li>Humidity: ${humidity}</li>
                </ul>`);
            res.write(`<img src='http://openweathermap.org/img/wn/${icon}@2x.png'/>`);
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});