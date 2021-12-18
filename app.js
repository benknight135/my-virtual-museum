const express = require('express');
var enforce = require('express-sslify');
var favicon = require('serve-favicon');
const app = express();
const path = require('path');
const router = express.Router();

var templates = require(path.join(__dirname,'src','templates'));

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(favicon(path.join(__dirname,'data','images','favicon.ico')));

templates.load(app,__dirname);

// define static data folders
app.use('/images', express.static(path.join(__dirname,'data','images')));
app.use('/markers', express.static(path.join(__dirname,'data','markers')));
app.use('/models', express.static(path.join(__dirname,'data','models')));

//add the router
app.use('/', router);

// start app
var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';
app.listen(port, host, function() {
    console.log('Listening on port %d', port);
});