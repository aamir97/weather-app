const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));
const app = express()
//dfine paths for express config
const  publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlers engine or view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
// app.engine('hbs', require('hbs').__express);
//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'weather app',
        name:'aamir khan'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'about me',
        name:'this robot'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpname:'which help you want',
        title:'abcd',
        name:'this robot'
    })
})

// app.get('',(req,res) => {
//     res.send('<h1>hello Express....! </h1>')
// })
// app.get('/help',(req,res) => {
//     res.send([{
//         name:'Aamir khan',
//         place:'mumbai',
//         pin:400078
//     },{
//         name:'Aamir khan',
//         place:'mumbai',
//         pin:400078
//     }])
// })
// app.get('/about',(req,res) => {
//     res.send('<h2>WHATS ABOUT PAGE!</h2>')
// })

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error:'you must provide a address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })
    })
})
    // res.send({
    //     forecast:'today weather is very cloudy ',
    //     location:'mumbai',
    //     address:req.query.address
    // })


app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'robo',
        errormessage:'help article not found.'
    })

})
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'robo',
        errormessage:'page not found.'

    })

})
app.listen(3000,() => {
    console.log('server is up on port 3000.')
})