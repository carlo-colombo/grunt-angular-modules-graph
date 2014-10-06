/*eslint no-unused-vars: 0, no-unused-expr: 0, no-unused-expressions: 0*/
"use strict";

var should = require("should");

describe("angular ui", function () {
  var angular, keypress;

  beforeEach(function() {
    angular  = require("../src/fake-angular")();
    require("../test-mocks/ui-utils-keypress")(angular);
  });

  it("ui-utils keypress", function () {
    var directives = angular.modules[0].directives;
    var factories = angular.modules[0].factories;

    // Directives
    directives[0].name.should.be.equal("uiKeydown");
    directives[0].deps.should.containEql("keypressHelper");
    directives[1].name.should.be.equal("uiKeypress");
    directives[1].deps.should.containEql("keypressHelper");
    directives[2].name.should.be.equal("uiKeyup");
    directives[2].deps.should.containEql("keypressHelper");

    // Factories
    factories.should.be.an.Array;
    factories.should.have.lengthOf(1);
    factories[0].name.should.be.equal("keypressHelper");
    factories[0].deps.should.be.an.Array;
    factories[0].deps.should.have.lengthOf(1);
    factories[0].deps.should.containEql("$parse");
  });
});
