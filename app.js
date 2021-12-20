const express = require('express');
const enforce = require('express-sslify');
const favicon = require('serve-favicon');
var bodyParser = require('body-parser')
const app = express();
const path = require('path');
const router = express.Router();

const templates = require(path.join(__dirname,'src','templates'));

// enforce https (required for ar.js to work)
app.use(enforce.HTTPS({ trustProtoHeader: true }));

// load favicon
app.use(favicon(path.join(__dirname,'data','images','favicon.ico')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// load app templates
templates.load(app,__dirname);

// define static data folders
app.use('/data/images', express.static(path.join(__dirname,'data','images')));
app.use('/data/markers', express.static(path.join(__dirname,'data','markers')));
app.use('/data/models', express.static(path.join(__dirname,'data','models')));

//add the router
app.use('/', router);

// start app
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
app.listen(port, host, function() {
    console.log('Listening on port %d', port);
});