var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var urlParser = require('url');

var nodeStatic = require('node-static');
var fileServer = new nodeStatic.Server('./public ');

// Why do you think we have this here?
// HINT:It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";

var routes = {

  "/" : require("./request-handler").handleRequest,

  // "/loading.html" : require("./request-handler").index

}


var server = http.createServer(function (req, res){
  console.log("Serving request type " + req.method + " for url " + req.url);

  var parts = urlParser.parse(req.url);
  var route = routes[parts.pathname];

  if ( route ) {
    route(req, res);
  } else {
    // TODO send an error!!
  }

});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);



// req.addListener('end', function () {
//     fileServer.serve(req, res);
//   }).resume();
