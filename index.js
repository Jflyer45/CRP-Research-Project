const PORT = process.env.PORT || 8000; //Port option for Heroku

// Packages
const express = require('express');
const axios = require('axios');
var xpath = require('xpath')
dom = require('xmldom').DOMParser
const appLogic = require("./app.js")
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

// Initionalization
const app = express();
app.use(cors(corsOptions)) // Use this after the variable declaration

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/', (req, res) => {
    res.json("Documentation can be found at https://github.com/Jflyer45/CRP-Research-Project");
})

app.get('/getData', (req, res) => {
    res.json(appLogic.getCRPData())
})

app.get('/getYearlyTotals', (req, res) => {
    res.json(appLogic.getYearlyTotals())
})

app.get('/getAggregatedCRP', (req, res) => {
    res.json(appLogic.getAggregatedCRPJSON())
})

app.listen(PORT, () => console.log('Server running on port ' + PORT))