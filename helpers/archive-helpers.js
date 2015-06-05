var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers');
var request = require('request');
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


exports.readListOfUrls = readListOfUrls = function(callback){
  fs.readFile(paths.list, function (err, data) {
    data = data.toString().split('\n');
    if (callback) {
      callback(data);
    }
  });
};


exports.downloadUrls = function(sites){
  _.each(sites, function(site){
    if (!site) { return; }
    request('http://' + site).pipe(fs.createWriteStream(paths.archivedSites + '/' + site))
  })
};

exports.isURLArchived = function(url, callback){
  fs.exists(paths.archivedSites + '/' + url, function(exists) {
    callback(exists);
  });
};


exports.isUrlInList = function(url, callback){
    readListOfUrls(function(data){
      var exists = _.any(data, function(site){
        return site.match(url);
      })
      callback(exists);
    })
};

exports.addUrlToList = addUrlToList = function(url, callback){
  fs.appendFile(paths.list, url + '\n', function(err, file){
    if (err) throw err;
    callback();
  });

};

exports.loadingPage = loadingPage = function(url){
  helpers.headers.Location = '/loading.html'
}


