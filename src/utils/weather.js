const request = require('request');

const forecast = (altitude, longitute, callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=bd8a427328c2cfb4057a9f7e668f20b8&query=' +
        altitude +
        ',' +
        longitute;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('unexpected error: ' + body.error.info, undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                condition: body.current.weather_descriptions
            })
        }
    })
}


module.exports = forecast;