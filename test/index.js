/*eslint no-unused-expressions: 0, no-unused-vars: 0*/
"use strict";

var should = require("should");

describe("angular-modules-graph", function() {
  var angularModulesGraph = require("../index.js");

  it("should accept an array", function() {
    should.exist(angularModulesGraph([]));
  });

  it("should return on object", function() {
    var res = angularModulesGraph([]);
    res.should.be.an.Object;
    res.should.have.properties("angular", "results");
  });

  describe("return object", function() {
    describe("angular property", function() {
      it("should return an object with an angular properties describing the graph ", function() {
        var script = {
          id: "example",
          text: "angular.module('TestModule',[])"
        };
        var res = angularModulesGraph([script]);

        res.angular.modulesNames.should.containEql("TestModule");
      });
    });

    describe("results property", function() {
      it("should be an array", function() {
        angularModulesGraph([]).results.should.be.an.Array;
      });
      it("should contain an item for any input script", function() {
        var script = {
          id: "example",
          text: "angular.module('TestModule',[])"
        };
        var res = angularModulesGraph([script]).results;

        res.should.have.a.lengthOf(1);
        res[0].should.have.properties("id", "error");
        res[0].id.should.be.eql("example");
      });
      it("should report if an error occured while evaluating", function() {
        var script = {
          id: "example",
          text: "undefined_global.module('TestModule',[])"
        };
        var res = angularModulesGraph([script]).results;

        res[0].should.have.properties("exception");
        res[0].error.should.be.true;
        res[0].exception.should.be.an.Exception;
      });
    });
  });
});
