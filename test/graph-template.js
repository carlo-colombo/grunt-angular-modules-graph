'use strict';

var grunt = require('grunt');
var should = require('should');
var template = require('../src/graph-template')

describe('graph template', function(){
  var angular

  beforeEach(function() {
    angular = function () {
      var angularModulesGraph = require('angular-modules-graph')
      return angularModulesGraph([]).angular
    }() 
  })

  function renderTemplate(){
    return grunt.template.process(template, {
      data: {
        modules : angular.modules,
        modulesNames: angular.modulesNames,
        options:{
          externalDependenciesColor: 'red'
        }
      }
    })
  }

  it("first line shoudl be a valid graphviz dot file", function(){
    var res = renderTemplate()
    res.should.startWith('digraph dependencies{')
    res.should.endWith('}')
  })

  it("should write a line for every defined module", function(){
    angular.module('testModule1',[])
    angular.module('testModule2',[])

    var res = renderTemplate()

    res.should.match(/\n  "testModule1"\[label="{testModule1|}"]/)
    res.should.match(/\n  "testModule1"\[label="{testModule2|}"]/)
  })

  it("should list items of a module", function(){
    angular.module('testModule1',[])
      .controller('testController')
      .factory('testFactory')

    var res = renderTemplate()

    res.should.match(/\n  "testModule1"\[label="{testModule1\|testController\\ntestFactory}"]/)
  })

  it("should generate node graph", function(){
    angular.module('testModule1',[])
    angular.module('testModule2', ['testModule1'])

    var res = renderTemplate()

    res.should.match(/"testModule2"\s*->\s*"testModule1"\s*\[color="black"]/)
  })

  it("should list external dependencies with a different color", function(){
    angular.module('testModule2', ['testModule4'])

    var res = renderTemplate()

    res.should.match(/"testModule2"\s*->\s*"testModule4"\s*\[color="red"]/)
  })
})
