const https = require("https");
const http = require("http");
const api = require('./api.json');

function printWeather(weather) {
    const message = `current temprature in ${weather.name} is ${weather.main.temp} C'`;
    console.log(message);
}

function printError(errorMsg) {
    console.error(errorMsg.message);
}

function get(query) {
    const readbleQuery = query.replace('_', ' ');
    try {
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?${query}&APPID=${api.Key}`,
            response => {
                if (response.statusCode === 200) {
                    let body = "";
                    //Read the data
                    response.on('data',
                        data => {
                            body += data.toString();
                        });

                    response.on('end',
                        () => {
                            try {
                                //Parse the data
                                const weather = JSON.parse(body);
                                if (weather.main.temp)
                                    printWeather(weather);
                                else {
                                    const queryError = new Error(`The location "${readbleQuery} was not found.`);
                                    printError(queryError);
                                }
                                //Print the data
                            } catch (e) {
                                const message = `Couldn't parse the JSON ${e.message}`;
                                const errorMessage = new error(message);
                                printError(errorMessage);
                            }
                        });
                } else {
                    const message = `There was an error getting the message for ${query}.  (${http.STATUS_CODES[response.statusCode]})`;
                    const statusCodeError = new Error(message);
                    printError(statusCodeError);

                }
            });
    } catch (e) {
        printError(e);
    }
}

module.exports.get = get;