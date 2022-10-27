// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req,res) {
  var dateParam = req.params.date
  var date = null
  if(dateParam == null)
     date = new Date()
  else
    date = getDate(dateParam)
  
  if(!dateIsValid(date)) {
    res.json({ error: "Invalid Date" })
    return
  }
  
  res.json({ unix: date.getTime(), utc: date.toUTCString() })
})

function getDate(param) {
  if(isNumeric(param))
    return new Date(parseFloat(param))
  else
    return new Date(param)
}

function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
