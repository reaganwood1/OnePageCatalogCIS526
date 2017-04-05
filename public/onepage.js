//(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Main entry point */

//var project = require('./project');

jQuery.ajax('/projects/', {
  type: "GET",
  success: function(data) {
    data.forEach(function(car) {
      var item = document.createElement("li");
      item.innerHTML = car.name;
      item.onclick = function () { displayCarInfo(car.id); console.log("I've been clicked")};
      $("#pictures").append(item);
    });
  },
  error: function(xhr, status) {
    // If the status was not OK (200), we had an error
    console.log('Error: ' + status);
  }
});

function displayCarInfo (id) {

  console.log("car id" + id);
}


// Source: http://stackoverflow.com/questions/13888093/how-to-show-hide-a-form-on-button-click-in-jquery
$(".uploadContainer").submit(function() {
  /* AJAX calls and insertion into #productionForm */
  console.log("yellow");
  return false;
});

function submitClicked(){
  var img_url = $("#uploadImage").val();
  var title = $("#uploadTitle").val();
  var description = $("#uploadDescription").val();
  jQuery.ajax('/projects/', {
    method: 'POST',
    data: JSON.stringify({name: title, description: description, img_url: img_url}),
    success: function(data) {
        // make ajax request to retrieve item to add it to the page without reloading
        jQuery.ajax('/projects/', {
          method: 'GET',
          success: function(data) {
              var car = data[data.length - 1];
              var item = document.createElement("li");
              item.innerHTML = car.name;
              item.onclick = function () { displayCarInfo(car.id); console.log("I've been clicked")};
              $("#pictures").append(item);
            
          },
          error: function(xhr, status) {
            // If the status was not OK (200), we had an error
            console.log('Error: ' + status);
          }
        });
      },
    error: function(xhr, status) {
      // If the status was not OK (200), we had an error
      console.log('Error: ' + status);
    }
  });
}

// Source: http://stackoverflow.com/questions/13888093/how-to-show-hide-a-form-on-button-click-in-jquery
$(".createContainer").submit(function() {
  /* AJAX calls and insertion into #productionForm */
  $(".uploadContainer").show();
  return false;
});
// $.get('/projects', function(projects){
//   $('body').html(project.list(projects));
// });
//
// },{"./project":2}],2:[function(require,module,exports){
// module.exports = {
//   list
// };
//
// /* Given a list of projects, create a table */
// function list(projects){
//   var table = $('<table>').addClass('table');
//   var head = $('<tr>').append('<th>Name</th>').appendTo(table);
//   projects.forEach(function(project) {
//     var row = $('<tr>').append(
//       $('<td>').text(project.name)
//     ).appendTo(table);
//   });
//   return table;
// }

//},{}]},{},[1]);
