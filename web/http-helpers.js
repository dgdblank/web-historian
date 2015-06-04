var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(res, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  console.log(statusCode, headers);
  res.end();
}


exports.serveAssets = function(res, asset) {
  fs.readFile(asset, function(err, content){
        if(err){
          res.writeHead(500, headers);
          res.end();
        } else {
          res.writeHead(200, headers);
          res.end(content, 'utf-8');
        }
      });
}





// As you progress, keep thinking about what helper functions you can put here!
