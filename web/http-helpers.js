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

exports.sendResponse = function(res, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);
  // console.log(statusCode, headers);
  res.end();
}


exports.serveAssets = function(res, asset, url) {
  console.log('3. serve assets' + asset);
  fs.readFile(asset, function(err, content){
        if(err){
          res.writeHead(500, headers);
          res.end();
        } else {
          console.log('in serveAssets /' + url);
          // headers.Location = url;
          res.writeHead(200, headers);
          res.end(content, 'utf-8');
        }
      });
}

exports.collectData = function(req, res){
  var url = '';
    req.on('data', function(chunk){
      url += chunk;
    });

    req.on('end', function(){
      url = createObj(url);
      console.log(url);
      archive.isURLArchived(url, res);
    })
}

exports.createObj = createObj = function(dataString){
  // 'url=www.google.com'
  var url = dataString.split('=');
  var obj = {};
  obj['url'] = url[1];
  return obj;
}






// As you progress, keep thinking about what helper functions you can put here!
