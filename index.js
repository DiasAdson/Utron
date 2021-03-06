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

// let token = "EAAIXRThNnBMBAPnlXmUA3LvRKmsZAKwvjCZC7ZB1Or7wifhIVbBXQqzqytNMTGRQtGYRH40Pf4JsZCxG5c8vVEYJO8d9m5bpg"
let token = "EAAIXRThNnBMBAMBKvKpPUxZBUKdShzDieSTCOVsHFz4JrHGTXQ1xSLQLAtFTDywZBC5V8sbLYalcxYV5TUDNyCRogZBT9SSkroMdI90syZAQhcVagImO6EZBa4IeKcK4HpKcub9SAYdZCc2VzVuBpZBZCuOYEJMFnTlPFW550U0kNlNAJw4yXXMs"
// Facebok

app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] === "utron") {
        res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token") 
})

app.post('/webhook/', function(req, res) {
    let messaging_events = req.body.entry[0].messaging
    
    for (let i = 0; i < messaging_events.length; i++) {
        let event = messaging_events[i]
        let sender = event.sender.id
        console.log( event.message.text )
        if (event.message && event.message.text) {
            let text = event.message.text
            sendText(sender, "Text echo: " + text.substring(0, 100))
        }    
    }
    res.sendStatus(200)
})

function sendText(sender, text) {
    let messageData = {text: text}
    request({
        url:"https://graph.facebook.com/v2.6/me/messages",
        qs : {access_token : token},
        method: "POST",
        json: {
            recipient: {id: sender},
            message : messageData
        }
    }, function(error, response, body) {
        if (error) {
            console.log("sending error")
            console.log(error)
        } else if (response.body.error) {
            console.log(response.body.error)
            console.log("response body error") 
        }
    })   
}

app.listen(app.get('port'), function() {
    console.log("running: port")
})

           