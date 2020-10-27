const express = require ('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = '66538826eb71262703743008a9fcb91b';
    const units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + units;
   
 
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
            res.write(`<h1>The temperature in ${query} is ${temp} degrees celsius.</h1>`);
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