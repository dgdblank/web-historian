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

    // req.addListener('end', function () {
      // fileServer.serveFile('/index.html');
      fs.readFile(archive.paths.home, function(err, content){
        if(err){
          res.writeHead(500, helpers.headers);
          res.end();
        } else {
          res.writeHead(200, helpers.headers);
          res.end(content, 'utf-8');
        }
      });
    // fileServer.serveFile('/index.html');


    // helpers.sendResponse(res, 200);
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
