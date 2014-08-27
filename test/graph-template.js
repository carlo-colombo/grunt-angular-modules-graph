'use strict';

var grunt = require('grunt');
var should = require('should');
var templates = require('../src/diagrams-rendered')(grunt);

describe('graph template', function(){
  var angular

  beforeEach(function() {
    angular = {}
    angular = function () {
      var angularModulesGraph = require('angular-modules-graph')
      return angularModulesGraph([]).angular
    }()
  })

  it("first line shoudl be a valid graphviz dot file", function(){
    var res = templates.renderModulesTemplate(angular);
    res.should.startWith('digraph dependencies {')
    res.should.endWith('}')
  })

  it("should list controllers and services", function () {

    angular
      .module('testModule', ['ngDep', 'ngDep2'])
      .controller('testController', function (testService, foo, bar) {})
      .controller('testController2', function (testService2, delta) {})
      .factory('testService', function (dep3, serviceFoo) {
        return {
          doFoo: function () {},
          isBar: function () {},
        }
      })
      .factory('testService2', function (dep4, serviceBar) {
        return {
          getName: function () {}
        }
      })
    angular
      .module('testModule2')
      .controller('testController3', function (testService3, anotherService) {})
      .controller('testController4', function (testService4, yetAnotherService) {})
      .factory('testService3', function (dep3) {
        return {
          doFoo: function () {},
          isBar: function () {},
        }
      })
      .factory('testService4', function (dep4) {
        return {
          getName: function () {}
        }
      })

    var res  = templates.renderModulesTemplate(angular)
    angular.modules.forEach(function (module) {
      var res2 = templates.renderModuleTemplate(module);
    });
  })
})
