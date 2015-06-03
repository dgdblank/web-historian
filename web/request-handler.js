var path = require('path');
var archive = require('../helpers/archive-helpers');
var nodeStatic = require('node-static');
// require more modules/folders here!
var fileServer = new nodeStatic.Server('./public');
exports.handleRequest = function (req, res) {
  req.addListener('end', function () {
    fileServer.serve(req, res);
  }).resume();
  // res.end(archive.paths.list);
};
