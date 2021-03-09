// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Require Body-Parser
const bodyParser = require('body-parser');

// Require Cors
const cors = require('cors');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

// GET route that returns the projectData object
app.get('/allData', function (req, res) {
    res.send(projectData);
});

// POST route that adds incoming data to projectData
app.post('/addData', function (req, res){
  console.log(req.body);
  let newEntry = {
      temperature: req.body.temp,
      date: req.body.date,
      userResponse: req.body.userResponse
  }
  Object.assign(projectData, newEntry);
  res.send(projectData);
});

