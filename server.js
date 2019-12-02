// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function(req, res, next){
  
  let options = {
    "year" : "numeric",
    "month": "long",
    "day" : "numeric"
  }
  let input = req.params.date_string ;
  let date = new Date(input);
  let time = new Date()
  let timeToUTC = time.toLocaleDateString("en-us", options)
  let dateToString = date.toString();
  let dateToUTC = date.toUTCString();
  let unixTime = date.getTime()*1000;
  
  
    if(!input)  {
     res.json({"unix": time, "UTC": timeToUTC}) 
    }
    
  else if (dateToString === "Invalid Date"){
    
    res.json({"error" : "Invalid Date" })
  }
  else{
    res.json({"unix" : unixTime , "UTC" : dateToUTC})
  }
  
  
  next();
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});