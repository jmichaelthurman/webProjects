const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

const port = process.env.PORT || 3000;

let urlencodedParser = bodyParser.urlencoded({extended: false});

let jsonParser = bodyParser.json();

app.use((req,res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.ip} ${req.method} ${req.method} ${req.url} ${req.protocol}`

    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err){
        console.log('Unable to write to server.log.');
      }
      });
      next();
});

app.use(express.static(__dirname + '/public'));

// Route handlers

app.post('/', urlencodedParser, function (req,res) {
    res.send({
      status:'OK',
      status_code: '200'
    })
    console.log(req.body);
    });

app.get('/bad',(req,res)=>{
    res.send({
      status: 'Bad Request',
      status_code: 400,
      errorMessage: 'Unable to process bad request(400).'
    })
  })
  app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
  });