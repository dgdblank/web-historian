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
  'home' : path.join(__dirname, '../web/public/index.html'),
  'loading' : path.join(__dirname, '../web/public/loading.html')
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
exports.readListOfUrls = readListOfUrls = function(callback){
  fs.readFile(paths.list, function (err, data) {
  // what does sites.txt have? go get the html for that list.
    data = data.toString().split('\n');
    if (callback) {
      callback(data);
    }
  });
};


exports.downloadUrls = function(){
  // download html for that list.
  // clearning sites.txt
};

// SERVER
exports.isURLArchived = function(url, callback){
  fs.exists(paths.archivedSites + '/' + url, function(exists) {
    callback(exists);
  });
};


exports.isUrlInList = function(url, callback){
  // if that url is in sites.txt, serve waiting page.
    readListOfUrls(function(data){
      var exists = _.any(data, function(site){
        return site.match(url);
      })
      callback(exists);
    })
};
//serve loading page

exports.addUrlToList = addUrlToList = function(url, callback){
// we didnt have it - put it on list for worker.
// serve the loading page
  console.log("3. add the nonexistant link to list." + url)
  fs.appendFile(paths.list, url + '\n', function(err, file){
    if (err) throw err;
    callback();
  });

};

exports.loadingPage = loadingPage = function(url){
  helpers.headers.Location = '/loading.html'
}


