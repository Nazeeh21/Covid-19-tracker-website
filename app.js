const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const ejs = require('ejs')
const _ = require('lodash')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get("/", function(req, res) {
    const url = "https://covid19.mathdro.id/api"

    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            const JSONdata = JSON.parse(data)
            const confirmed = JSONdata.confirmed.value
            const recovered = JSONdata.recovered.value
            const death = JSONdata.deaths.value

            res.render('home', {confirmed: confirmed, recovered: recovered, deaths: death})
        })
    })
})

app.post("/", function(req, res) {
    const countryName = req.body.country
    res.redirect("/country/" + countryName)
})

app.get("/country/:country", function(req, res) {
    const country = req.params.country

    const url = "https://covid19.mathdro.id/api/countries/" + country

    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            const JSONdata = JSON.parse(data)
            const confirmed = JSONdata.confirmed.value
            const recovered = JSONdata.recovered.value
            const death = JSONdata.deaths.value

            res.render('country', {countryName: country, confirmed: confirmed, recovered: recovered, deaths: death})
        })
    })

})

app.listen(3000, function() {
    console.log("Server started on port 3000")
})