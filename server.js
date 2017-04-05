"use strict";

var PORT = 3000;

// start database server input
// Set up the database
var http = require('http');
var fileserver = require('./lib/fileserver');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('singlepage.sqlite3', function(err) {
  if(err) console.error(err);
});
var router = new (require('./lib/route')).Router(db);
/*
// Run the migrations
var migrate = require('../lib/migrate');
migrate(db, 'migrations', function(err){
  if(err) console.error(err);
  else console.log("Migrations complete!");
});
// end database server input
*/
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, name TEXT, description TEXT, image_url TEXT)");

  //db.run("INSERT INTO projects (id, name, description, image_url) values ('1', 'picture', 'item', 'lambo6.jpg')");
  //db.run("INSERT INTO projects (id, name, description, image_url) values ('2', 'discussions', 'hello', 'lambo7.jpg')");
  //db.run("INSERT INTO projects (id, name, description, image_url) values ('3', '3', 'hello', 'lambo8.jpg')");


  // db.each("SELECT id, name, description FROM pictureAlbum", function(err, row) {
  //     if(err) return console.error(err);
  //     console.log(row);
  // });
});
// Cache static directory in the fileserver
fileserver.loadDir('public');
// Define our routes
var project = require('./src/resource/project');
router.resource('/projects', project);
var server = new http.Server(function(req, res) {
  // Remove the leading '/' from the resource url

  var resource = req.url.slice(1);
  console.log(resource);
  // If no resource is requested, serve the cached index page.
  if(resource == '')
    fileserver.serveFile('public/index.html', req, res);
  // If the resource is cached in the fileserver, serve it
  else if(fileserver.isCached(resource))
    fileserver.serveFile(resource, req, res);
  // Otherwise, route the request
  else {
    router.route(req, res);
    console.log("hit");
  }
});

// Launch the server
server.listen(PORT, function(){
  console.log("listening on port " + PORT);
});
