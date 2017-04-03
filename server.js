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
  // Otherwise, serve a 404 error
  else {
    res.statusCode = 404;
    res.statusMessage = "Resource not found";
    res.end("Resource not found");
  }
});

// Launch the server
server.listen(PORT, function(){
  console.log("listening on port " + PORT);
});
