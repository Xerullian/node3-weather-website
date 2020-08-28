const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const devPort = 30001;

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// hbs template
app.get('', (request, response) =>
{
    response.render('index',
    {
        title: 'Weather App',
        name: 'Patrick Nolen',
    });
});

// hbs template
app.get('/about', (request, response) =>
{
    response.render('about',
    {
        title: 'About',
        name: 'Patrick Nolen',
    });
});

// hbs template
app.get('/help', (request, response) =>
{
    response.render('help',
    {
        title: 'Help',
        message: 'This is the help page',
        name: 'Patrick Nolen',
    });
});

// hbs template
app.get('/weather', (request, response) =>
{
    if(!request.query.address)
    {
        return response.send({error: 'You must provide an address.'});
    }

    geocode(request.query.address, (error, {latitude, longitude, location} = {}) => 
    {
        if(error)
        {
            return response.send({error});
        }
        
        forecast(latitude, longitude, (error, forecastData) =>
        {
            if(error)
            {
                return response.send({error});
            }

            response.send
            ({
                forecast: forecastData,
                location,
                address: request.query.address,
            });
        });
    });
});

app.get('/help/*', (request, response) =>
{
    response.render('404',
    {
        title: 404,
        name: 'Patrick Nolen',
        errorMessage: 'Help article not found.',
    });
});

app.get('*', (request, response) =>
{
    response.render('404',
    {
        title: 404,
        name: 'Patrick Nolen',
        errorMessage: 'Page not found',
    });
});

app.listen(devPort, () =>
{
    console.log(`Server is up on port ${devPort}.`);
});