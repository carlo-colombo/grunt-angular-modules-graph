var should = require('should');

describe("angular", function() {

  var angular

  beforeEach(function() {
    angular = require('../src/fake-angular')()
  })

  it("should be defined", function() {
    should.exist(angular)
  })

  it("should be a different instance every time is required", function() {
    var angular1 = require('../src/fake-angular')()
    var angular2 = require('../src/fake-angular')()

    angular1.should.not.be.equal(angular2)

  })

  describe("module", function() {

    it("should define a module if called with an array as 2nd argument", function() {
      var module = angular.module("testModule", [])
      should.exist(module)
    })

    it("should return a defined method if called with a single argument", function() {
      angular.module('testModule', [])
      should.exist(angular.module('testModule'))
    })

    var methods = ['constant',
      'controller',
      'directive',
      'factory',
      'filter',
      'provider',
      'service',
      'value',
      'run',
      'config'
    ];

    describe("should have defined method", function() {
      methods.forEach(function(method) {
        it(method, function() {
          var module = angular.module('testModule', []);
          should.exist(module[method])
        })
      })
    })

    it("should define noop function", function(){
        should.exist(angular.noop)
        angular.noop.should.be.a.Function
    })

    it("should define identity function", function(){
        should.exist(angular.identity)
        angular.identity.should.be.a.Function
    })

    describe("every method should return module to allow chainability", function() {
      methods.forEach(function(method) {
        it('#' + method, function() {
          var module = angular.module('testModule', []);
          module.should.be.equal(module[method]())
        })
      })
    })

    it("should contains reference to modules on which it depenends", function() {
      var module1 = angular.module('testModule1', [])
      var modules = angular.module('testModule2', ['testModule1']).modules

      modules.should.have.a.lengthOf(1)
      modules[0].should.be.equal('testModule1')
    })

    describe('items', function() {
      it('should contains defined items', function() {
        var module = angular.module('testModule')
          .filter('testFilter')
          .controller('testController')

        module.items.should.have.a.lengthOf(2)
        module.items.should.containEql('testFilter')
        module.items.should.containEql('testController')
      })
    })

    describe("requiring module before declaring", function() {
      it("should return module definition even if module is not already defined", function() {
        var module = angular.module('testModule')
        should.exist(module)
      })

      it("should replace afterwise", function () {
        var module1 = angular.module('testModule1')
        var module = angular.module('testModule')
        var sameModule = angular.module('testModule', ['testModule1'])

				module.should.be.equal(sameModule)
        module.modules.should.have.a.lengthOf(1)
      })
    })
  })

  describe("modules", function() {
    it('property should contain all defined modules', function() {
      angular.module('testModule1', [])
      angular.module('testModule2', [])

      angular.modules.should.have.a.lengthOf(2)
      angular.modules[0].should.have.property('name', 'testModule1')
      angular.modules[1].should.have.property('name', 'testModule2')
    })
  })
})
