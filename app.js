const express = require('express');
var enforce = require('express-sslify');
var favicon = require('serve-favicon');
const app = express();
const path = require('path');
const router = express.Router();

app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(favicon(path.join(__dirname,'data','images','favicon.ico')));

// serve index.html
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'web','index.html'));
});
router.get('/ar-pattern',function(req,res){
  res.sendFile(path.join(__dirname,'web','ar-pattern.html'));
});

// templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// load treasure hunt templates
// TODO: load this automatically from files in 'treausre_hunt' folder
var treasure_hunts = {
  "hunts":[
    {
      "name": "Barden Lake",
      "link": "/barden-lake-ar-hunt"
    }
  ]
}
app.get("/ar-hunt-select", (req, res) => {
  res.render("ar-hunt-select", treasure_hunts);
});
app.post("/load-ar-hunt", (req, res) => {
  //TODO: choose which ar hunt to load
  res.redirect('/barden-lake-ar-hunt');
});

var barden_lake_hunt = require(path.join(__dirname,'data','treasure_hunts','barden_lake.json'));
app.get("/barden-lake-ar-hunt", (req, res) => {
  res.render("ar-hunt", barden_lake_hunt);
});

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