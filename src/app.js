const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weather');
let con = console.log;

const app = express();
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicPathDirectory  = path.join(__dirname, '../public')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);


app.use(express.static(publicPathDirectory))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Noah Pedraza'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        name: 'Noah Pedraza'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        message: 'call 911',
        name: 'Noah Pedraza'
    })
})



app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide a valid address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (err, {temperature, condition} = {})=>{
            if (err){
                return res.send({err})
            }
            res.send({location, latitude, longitude, temperature, condition})
        })
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'Noah Pedraza',
        message: 'Help article not found.'

    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        name: 'Noah Pedraza',
        message: '404: page not found!'
    })
})


app.listen(port, ()=>{
    console.log('server is up on port:' + port)
})