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

// load AR object collection templates
// TODO: load this automatically from files in 'ar_collections' folder
var ar_collections = {
  "collections":[
    {
      "name": "Animals",
      "link": "/animal-ar-collection"
    }
  ]
}
app.get("/ar-collection-select", (req, res) => {
  res.render("ar-collection-select", ar_collections);
});
app.post("/load-ar-collection", (req, res) => {
  //TODO: choose which ar collection to load
  res.redirect('/animal-ar-collection');
});

var animal_obj_collection = require(path.join(__dirname,'data','ar_collections','animals.json'));
app.get("/animal-ar-collection", (req, res) => {
  res.render("ar-collection", animal_obj_collection);
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