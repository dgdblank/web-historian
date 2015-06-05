var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html",
  'Location': '/'
};

exports.sendResponse = sendResponse = function(res, obj, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  res.end(obj);
}


exports.serveAssets = function(res, asset, callback) {
  console.log('3. serve assets' + asset);

  // is in public folder?
  fs.readFile(archive.paths.siteAssets + asset, function(err, content){
    if(err){
      // else if, is in archive folder?
      fs.readFile(archive.paths.archivedSites + asset, function(err, content){
        if(err){
          // else, 404 error
          callback ? callback() : exports.send404(res);
        } else {
          exports.sendResponse(res, content);
        }
      });
    } else {
      exports.sendResponse(res, content);
    }
  });
}

exports.collectData = function(req, callback){
  var data = '';
    req.on('data', function(chunk){
      data += chunk;
    });

    req.on('end', function(){
      console.log('1. collectData ', data)
      callback(data);
    })
}

exports.sendRedirect = function(response, location, status) {
  console.log('5. its redirected ' + location);
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
}


exports.send404 = function(res) {
  sendResponse(res, "404 not found", 404);
}





// As you progress, keep thinking about what helper functions you can put here!
