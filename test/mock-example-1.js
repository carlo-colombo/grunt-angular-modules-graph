/*eslint no-unused-vars: 0, no-unused-expr: 0*/
"use strict";

var should = require("should");

describe("process factories", function() {
  var angular;

  function assertions(example1) {
    // Factories with no dependencies
    example1.factories[0].name.should.be.equal("NoDependenciesService1");
    example1.factories[1].name.should.be.equal("NoDependenciesService2");
    example1.factories[0].deps.should.have.a.lengthOf(0);
    example1.factories[1].deps.should.have.a.lengthOf(0);

    // Factories with angular dependencies
    example1.factories[2].name.should.be.equal("OneAngularDependencyService1");
    example1.factories[3].name.should.be.equal("OneAngularDependencyService2");
    example1.factories[2].deps.should.have.a.lengthOf(1);
    example1.factories[3].deps.should.have.a.lengthOf(1);
    example1.factories[2].deps[0].should.be.equal("$http");
    example1.factories[3].deps[0].should.be.equal("$http");

    // Factories with angular and other dependencies
    example1.factories[4].name.should.be.equal("MixedDependenciesService1");
    example1.factories[5].name.should.be.equal("MixedDependenciesService2");
    example1.factories[4].deps.should.have.a.lengthOf(3);
    example1.factories[5].deps.should.have.a.lengthOf(3);

    // Controllers with no dependencies
    example1.controllers[0].name.should.be.equal("NoDependenciesCtrl1");
    example1.controllers[1].name.should.be.equal("NoDependenciesCtrl2");
    example1.controllers[0].deps.should.have.a.lengthOf(0);
    example1.controllers[1].deps.should.have.a.lengthOf(0);


    // Controllers with angular dependencies
    example1.controllers[2].name.should.be.equal("OneAngularDependencyCtrl1");
    example1.controllers[3].name.should.be.equal("OneAngularDependencyCtrl2");
    example1.controllers[2].deps.should.have.a.lengthOf(1);
    example1.controllers[3].deps.should.have.a.lengthOf(1);
    example1.controllers[2].deps[0].should.be.equal("$http");
    example1.controllers[3].deps[0].should.be.equal("$http");

    // Controllers with angular and other dependencies
    example1.controllers[4].name.should.be.equal("MixedDependenciesCtrl1");
    example1.controllers[5].name.should.be.equal("MixedDependenciesCtrl2");
    example1.controllers[4].deps.should.have.a.lengthOf(3);
    example1.controllers[5].deps.should.have.a.lengthOf(3);
  }

  describe("in chained definition", function () {
    beforeEach(function() {
      angular = require("../src/fake-angular")();
      require("../test-mocks/example1-chained")(angular);
    });

    it("process factories names and dependencies", function () {
      assertions(angular.modulesMap.example1);
    });
  });

  describe("in not-chained definition", function () {
    beforeEach(function() {
      angular = require("../src/fake-angular")();
      require("../test-mocks/example1")(angular);
    });

    it("process factories names and dependencies", function () {
      assertions(angular.modulesMap.example1);
    });
  });
});
