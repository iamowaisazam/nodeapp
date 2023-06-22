const express = require('express')
const app =  express.Router()


//Dashboard
app.get('/',(req,res) => {
    res.end("Test");
});

module.exports = app