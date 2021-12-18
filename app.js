const express = require('express');
var enforce = require('express-sslify');
const app = express();
const path = require('path');
const router = express.Router();

app.use(enforce.HTTPS({ trustProtoHeader: true }));

// serve index.html
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/web/index.html'));
});
router.get('/ar-pattern',function(req,res){
  res.sendFile(path.join(__dirname+'/web/ar-pattern.html'));
});
router.get('/ar-gps',function(req,res){
  res.sendFile(path.join(__dirname+'/web/ar-gps.html'));
});

// define static data folders
app.use('/images', express.static(__dirname + '/images'));
app.use('/markers', express.static(__dirname + '/markers'));
app.use('/models', express.static(__dirname + '/models'));

//add the router
app.use('/', router);

// start app
var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';
app.listen(port, host, function() {
    console.log('Listening on port %d', port);
});