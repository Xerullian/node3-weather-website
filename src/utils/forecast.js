const request = require("postman-request");

const forecast = ( latitude, longitude, callback) =>
{
    const url = `http://api.weatherstack.com/current?access_key=19ade49b8f2e3e30ff963a8844c88f51&query=${latitude},${longitude}&units=f`;
    
    request( {url, json: true}, (error, { body }) =>
    {
        if(error)
        {
            callback('Unable to connect to weather service', undefined);
        }
        else if(body.error)
        {
            callback('Unable to find location', undefined);
        }
        else
        {
            const currentWeather = body.current;

            callback(undefined,
            {
                description: currentWeather.weather_descriptions[0],
                temperature: currentWeather.temperature,
                rain_probability: currentWeather.precip
            })
        }
    })
}

module.exports = forecast;