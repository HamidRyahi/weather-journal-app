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
const port = 3001;
const listening = () => {
  console.log(`Running on localhost ${port}`);
}
app.listen(port, listening);
// GET route that returns the projectData object
app.get('/allData', (req, res) => {
  res.send(projectData);
});
// POST route that adds incoming data to projectData
app.post('/addData', (req, res) => {
  projectData['temperature'] = req.body.temperature;
  projectData['cityName'] = req.body.cityName;
  projectData['zipCountry'] = req.body.zipCountry;
  projectData['date'] = req.body.date;
  projectData['userResponse'] = req.body.userResponse;
  console.log(projectData);
});
