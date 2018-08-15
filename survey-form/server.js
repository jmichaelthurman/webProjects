const express = require('express');
const fs = require('fs');

let app = express();

const port = process.env.PORT || 3000;


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

app.get('/', (req,res) => {
    res.render('index.html');
})

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