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


app.get('/api/timestamp', (req, res) => {
    const currentTime = new Date();
    res.json({
      unix: currentTime.getTime(),
      utc: currentTime.toUTCString()
    });
});

app.get('/api/timestamp/:date', (req, res) => {
  // chequeo por medio de expresion regular que este bien
  const regexp = /^(?:\d{4})?(?:\d{6,}|(-(0[0-9]|1[0-2])-(0[0-9]|1[0-9]|2[0-9]|3[0-1])))$/g;
  
  const parsedTime = req.params.date.includes('-') ? 
        new Date(req.params.date) :
        new Date(fillingWithZeros(req.params.date));
  
  regexp.test(req.params.date) ?
      res.json({
        unix: parsedTime.getTime(),
        utc: parsedTime.toUTCString()
      })
    :
      res.json({
      error : "Invalid Date"
      })
  
});

// getting numeric, return a int value.
const fillingWithZeros = (number, limit = 13) => {
  // calculo el largo de la palabra, para asi vo cuantas veces hay que repetir el 0.
  const sizeToRepeat = limit - number.length;
  
  // agrego los ceros restantes, concateno y devuelvo.
  let result =  sizeToRepeat < 0 ?
         number :
         number + '0'.repeat(sizeToRepeat);
  
  return parseInt(result);
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});