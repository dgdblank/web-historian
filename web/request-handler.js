var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs')
var urlParse = require('url')
// require more modules/folders here!

var actions = {
  'POST': function (req, res) {
    helpers.collectData(req, function(data){
      var url = data.split('=')[1];
    // is it in sites.txt?
      // helpers.serveAssets(res, url, function() {
        archive.isUrlInList(url, function(exists){
          // YES - is it archived?
          if (exists) {
            archive.isURLArchived(url, function(found){
              // YES - redirect to page.
              if (found) {
                helpers.sendRedirect(res, '/' + url);
              // redirect to loading page
              } else {
                helpers.sendRedirect(res, '/loading.html')
              }
            })
          } else {
            // write to text
            archive.addUrlToList(url, function(){
              helpers.sendRedirect(res, '/loading.html')})
          }
        })
      // })
    })
  },

  'GET': function (req, res) {
    var parts = urlParse.parse(req.url);
    var pathName = parts.pathname === '/' ? '/index.html' : parts.pathname;
    helpers.serveAssets(res, pathName, function(){
      // check in List
      archive.isUrlInList(pathName.slice(1), function(found){
        // if it is
        if (found){
          // redirect to loading
          helpers.sendRedirect(res, '/loading.html')
        } else {
          helpers.send404(res);
        }
      })
    })
  },

  'OPTIONS': function (req, res) {
    helpers.sendResponse(res, 200);
  }
}

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if ( action ) {
    action (req, res)
  } else {
    helpers.send404(res);
  }

};

