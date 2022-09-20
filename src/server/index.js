const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const cors = require('cors');
dotenv.config();

// Initialize app
const app = express();

// Configure express to use body-parser as middle-ware.
app.use ( bodyParser.urlencoded({ extended: false }) );
app.use ( bodyParser.json() );
// Configure express to use cors
app.use( cors() );

// Initialize the project folder
app.use(express.static('dist'))

// Create server listening on port 3000
const port = 3000;
app.listen(port, function () {
    console.log(`Running localhost: ${port}`)
});

app.get('/', (request, response) => {
    response.sendFile('dist/index.html');
});

// MeaningCloud url and key
const app_url  = 'https://api.meaningcloud.com/sentiment-2.1';
const app_key = process.env.API_KEY;

// Retrieve the url sent from client and send request to MeaningCloud for sentiment analysis
app.post('/analyzeText', async (req, res) => {
    // Retrieve the info inside the body of the request
    urlInput = req.body.urlInput;

    // Display the data received on terminal console
    console.log("URL received from client: ", urlInput);

    // Create a GET request and send request to Meaningcloud
    let apiCall = app_url + "?key=" + app_key + "&lang=auto&url=" + urlInput; 
    console.log("Sending API call ", apiCall);
    getDataFromAPI(apiCall)
    // Now send back the info received from the API to client. Filter the info we need
    .then ( function(data) {
        let dataObj = {};
        if (data.status.code == 200 || data.status.code == 100){
            dataObj = {
              status: data.status.code
            }
        } else {
            dataObj = {
              confidence: data.confidence,
              agreement: data.agreement,
              irony: data.irony,
              subjectivity: data.subjectivity,
              text_analysis_snippet: JSON.stringify(data.sentence_list[0].text)
            }
        }
        res.send(dataObj);
    });
});

// GET function to request info from MeaningCloud providing the URL inputted by user
const getDataFromAPI = async (getRequest)=>{
    // Fetch the data from the web api
    const rawDataFromAPI = await fetch (getRequest);
    try {
      const dataInJson = await rawDataFromAPI.json();
      console.log("Data received from weather api: ", dataInJson);
      // Return to this data in order to pass it to the next promise call
      return dataInJson;
    } catch (e){
      console.log("Error getting data from Web API ", e);
    }
  }