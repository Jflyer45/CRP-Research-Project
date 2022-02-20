const PORT = process.env.PORT || 8000; //Port option for Heroku

// Packages
const express = require('express');
const axios = require('axios');
var xpath = require('xpath')
dom = require('xmldom').DOMParser

// Initionalization
const app = express();

app.get('/', (req, res) => {
    res.json("Documentation can be found at https://github.com/Jflyer45/CRP-Research-Project");
})


app.listen(PORT, () => console.log('Server running on port ' + PORT))