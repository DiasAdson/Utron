'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

//Allows us to process the date
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//ROUTES

app.get('/', function(req, res) {
    res.send("Oi eu sou utron")
})

// Facebok

app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] === "blondiebytes") {
        res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token") 
})

app.listen(app.get('port'), function() {
    console.log("running: port")
})

           