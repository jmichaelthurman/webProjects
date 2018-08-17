const express = require('express');
const bodyParser = require('body-parser');

let app = express();

const port = process.env.PORT || 3000;

let urlencodedParser = bodyParser.urlencoded({extended: false});
let jsonParser = bodyParser.json();

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.ip} ${req.method} ${req.url}`

    console.log(log);
});

app.use(express.static(__dirname + '/public'));

// Route Handlers

app.get('/', (req, res) => {
    res.render('landing-page.html')

});

