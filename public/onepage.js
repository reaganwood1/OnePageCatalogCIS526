(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Main entry point */

var project = require('./project');

$.get('/projects', function(projects){
  $('body').html(project.list(projects));
});

},{"./project":2}],2:[function(require,module,exports){
module.exports = {
  list
};

/* Given a list of projects, create a table */
function list(projects){
  var table = $('<table>').addClass('table');
  var head = $('<tr>').append('<th>Name</th>').appendTo(table);
  projects.forEach(function(project) {
    var row = $('<tr>').append(
      $('<td>').text(project.name)
    ).appendTo(table);
  });
  return table;
}

},{}]},{},[1]);
