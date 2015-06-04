var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../web/archives/sites'),
  'list' : path.join(__dirname, '../web/archives/sites.txt'),
  'home' : path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// WORKER
exports.readListOfUrls = function(){
  // what does sites.txt have? go get the html for that list.
};


exports.downloadUrls = function(){
  // download html for that list.
  // clearning sites.txt
};

// SERVER
exports.isURLArchived = function(obj, res){
  var site = obj.url;
  var path = paths.archivedSites + '/' + site;
  console.log("2. is url archived" + path);
  fs.exists(path, function (exists) {
    exists ? helpers.headers.Location = '/' + site : addUrlToList(site);
  });
  // fs.exists
  // do we have the url archived?
  // have we downloaded it yet?
};

exports.isUrlInList = function(){
  // if that url is in sites.txt, serve waiting page.
};
//serve loading page

exports.addUrlToList = addUrlToList = function(url){
// we didnt have it - put it on list for worker.
  console.log("3. add the nonexistant link to list." + url)
  fs.appendFile(paths.list, url, function(err){
    if (err) throw err;
  });

  // serve the loading page

};


