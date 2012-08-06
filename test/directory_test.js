var path = require("path");
var assert = require("assert");
var vows = require("vows");
var mock = require("./../lib/mock");
var utils = require("./../lib/utils");
var directory = require("./../lib/directory");

vows.describe("directory").addBatch({
  "A directory middleware": {
    "when the request targets a directory that is present": {
      topic: function () {
        var app = directory(utils.notFound, __dirname);
        mock.request("/_files", app, this.callback);
      },
      "should return a directory listing of that directory": function (err, status, headers, body) {
        assert.equal(status, 200);
      }
    },
    "when the request targets a directory that is not present": {
      topic: function () {
        var app = directory(utils.notFound, __dirname);
        mock.request("/non-existant", app, this.callback);
      },
      "should pass the request downstream": function (err, status, headers, body) {
        assert.equal(status, 404);
      }
    },
    "when the request targets a file that is present": {
      topic: function () {
        var app = directory(utils.notFound, __dirname);
        mock.request("/" + path.basename(__filename), app, this.callback);
      },
      "should pass the request downstream": function (err, status, headers, body) {
        assert.equal(status, 404);
      }
    }
  }
}).export(module);
