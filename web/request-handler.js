var path = require('path');
var archive = require('../helpers/archive-helpers');
var nodeStatic = require('node-static');
var helpers = require('./http-helpers');
var fs = require('fs')
// require more modules/folders here!
var fileServer = new nodeStatic.Server('./public');


var actions = {
  'POST': function (req, res) {
    helpers.sendResponse(res, 201);
  },
  // send response
  // check if we have HTML for URL in sites folder
    // if not add URL to our sites.txt


  'GET': function (req, res) {
    var path = archive.paths.archivedSites + req.url;
    if(req.url === '/'){
      path = archive.paths.home;
    }

    helpers.serveAssets(res, path);
  },

  'OPTIONS':function (req, res) {
    helpers.sendResponse(res, 200);
  }
}

exports.handleRequest = function (req, res) {
  var action = actions[req.method];
  if ( action ) {
    action (req, res)
  } else {
    helpers.sendResponse(res, 404);
  }
  // res.end(archive.paths.list);

};

// exports.index = function(req, res){
//   req.addListener('end', function () {
//     fileServer.serve(req, res);
//   }).resume();
// }
