"use strict";

var PORT = 3000;

var http = require('http');
var fileserver = require('./lib/fileserver');

// Cache static directory in the fileserver
fileserver.loadDir('public');

var server = new http.Server(function(req, res) {
  // Remove the leading '/' from the resource url
  var resource = req.url.slice(1);
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
