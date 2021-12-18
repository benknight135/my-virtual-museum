const express = require('express');
var enforce = require('express-sslify');
var favicon = require('serve-favicon');
const app = express();
const path = require('path');
const router = express.Router();

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(favicon(path.join(__dirname,'images','favicon.ico')));

// serve index.html
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'web','index.html'));
});
router.get('/ar-hunt',function(req,res){
  res.sendFile(path.join(__dirname,'web','ar-hunt.html'));
});
router.get('/ar-gps',function(req,res){
  res.sendFile(path.join(__dirname,'web','ar-gps.html'));
});

// templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/test", (req, res) => {
  res.render("index", { title: "Home" });
});

// define static data folders
app.use('/images', express.static(path.join(__dirname,'/images')));
app.use('/markers', express.static(path.join(__dirname,'/markers')));
app.use('/models', express.static(path.join(__dirname,'/models')));

//add the router
app.use('/', router);

// start app
var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';
app.listen(port, host, function() {
    console.log('Listening on port %d', port);
});