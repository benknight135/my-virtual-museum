const path = require('path');
const fs = require('fs');

const load = function (app, root_path) {
    // load template views
    app.set("views", path.join(root_path, "views"));
    app.set("view engine", "pug");

    // load index template
    index_data = {
        title: "My Virtual Museum",
        description: "A collection of experiments with AR / VR content on the web."
    }
    app.get("/", (req, res) => {
        res.status(200).render("index", index_data);
    });

    // load treasure hunt templates
    const treasure_hunt_folder = path.join(root_path,'data','treasure_hunts');
    var hunts_array = []
    fs.readdirSync(treasure_hunt_folder).forEach(file => {
        var treasure_hunt = require(path.join(treasure_hunt_folder,file));
        hunts_array.push(treasure_hunt);
        app.get(treasure_hunt.url, (req, res) => {
            res.render("ar-hunt", treasure_hunt);
        });
    });
    var treasure_hunts = {
    "hunts": hunts_array
    }
    app.get("/ar-hunt-select", (req, res) => {
        res.status(200).render("ar-hunt-select", treasure_hunts);
    });
    app.post("/load-ar-hunt", (req, res) => {
        var tag = req.body.hunt;
        res.status(200).redirect('/'+tag+'-ar-hunt');
    });

    // load AR object collection templates
    const ar_collections_folder = path.join(root_path,'data','ar_collections');
    var collections_array = []
    fs.readdirSync(ar_collections_folder).forEach(file => {
        var collection = require(path.join(ar_collections_folder,file));
        collections_array.push(collection);
        app.get(collection.url, (req, res) => {
            res.render("ar-collection", collection);
        });
    });
    var ar_collections = {
        "collections": collections_array
    }
    app.get("/ar-collection-select", (req, res) => {
        res.status(200).render("ar-collection-select", ar_collections);
    });
    app.post("/load-ar-collection", (req, res) => {
        var tag = req.body.collection;
        res.status(200).redirect('/'+tag+'-ar-collection');
    });
}

module.exports.load = load;