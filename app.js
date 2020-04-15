const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/world-wide", function(req, res) {
    const url = "https://covid19.mathdro.id/api"
    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            const JSONdata = JSON.parse(data)
            const cases = JSONdata.confirmed.value
            const recovered = JSONdata.recovered.value
            const deaths = JSONdata.deaths.value

            res.write("<p><h2>Data of COVID-19 across the world!</h2></p>")
            res.write("<p>Cases: " + cases + "</p>")
            res.write("<p>Recovered: " + recovered + "</p>")
            res.write("<p>Deaths: " + deaths + "</p>")
            res.send()
        })
    })
})

app.post("/country", function(req, res) {
    const country = req.body.countryName
    console.log(country)
    
    const url = "https://covid19.mathdro.id/api/countries/" + country

    https.get(url, function(response) {
        console.log(response.statusCode)
        if(response.statusCode === 200) {
            response.on("data", function(data) {
                const JSONdata = JSON.parse(data)
                const cases = JSONdata.confirmed.value
                const recovered = JSONdata.recovered.value
                const deaths = JSONdata.deaths.value
    
                res.write("<p><h2>Data of COVID-19 of " + country + " country</h2></p>")
                res.write("<p>Cases: " + cases + "</p>")
                res.write("<p>Recovered: " + recovered + "</p>")
                res.write("<p>Deaths: " + deaths + "</p>")
                res.send()
            })    
        } else {
            res.write("<p><h3>OOps! something wrnt wrong try after some time</h3></p>")
            res.send()
        }        
    })
})

app.get("/world-wide", function(req, res) {
    res.redirect("/")
})

app.listen(3000, function() {
    console.log("Serer started at port 3000")
})
