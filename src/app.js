const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'/../public/')
const templateDirectoryPath = path.join(__dirname,'../templates/views')
const partialDirectoryPath = path.join(__dirname,'../templates/render')


//Se obtiene el contenido estatico de la carpeta public js,css,html
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialDirectoryPath)


//configuracion para utilizar handlebars
app.set('view engine', 'hbs')
app.set('views', templateDirectoryPath)

app.get('', (req,resp) => {
    resp.render('index', {
        title:'Index',
        author: 'Alberto Sergio Alaber Gómez'
    })
})

app.get('/about', (req,resp) => {
    resp.render('about', {
        title:'About',
        author: 'Alberto Sergio Alaber Gómez'
    })
})


app.get('/weather', (req,resp) => {
    const adress = req.query.adress

    if(!adress) {
        return resp.send({
            result:'Fail',
            error:'You must provide an adress to show the weather'
        })
    }
    geocode(adress, (error,{latitud,longitud,location} = {}) => {
        if(error) {
            return resp.send({
                error
            })
        }

        console.log(latitud, longitud)

        forecast(latitud,longitud, (error, {temperature, precipProbability} = {}) => {
            if(error) {
                return resp.send({
                    error
                })
            }

            resp.send({
                adress,
                temperature,
                precipProbability
            })
        })

    })
})

app.get('/help', (req,resp) => {
    resp.render('help', {
        title:'Help',
        author: 'Alberto Sergio Alaber Gómez'
    })
})


app.get('/help/*', (req,resp) => {

    resp.render('notfound', {
        title:'404',
        path:req.originalUrl,
        error:'the next article does not exist, try with other article',
        author: 'Alberto Sergio Alaber Gómez'
    })
})

app.get('*', (req,resp) => {

    resp.render('notfound',{
        title:'404',
        path:req.originalUrl,
        error:'the next path does not exist, try with another',
        author: 'Alberto Sergio Alaber Gómez'
    })
})


app.listen(port, () => {
    console.log('Server is already running on port ' + port)
})
