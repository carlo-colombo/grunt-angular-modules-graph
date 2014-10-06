/*eslint no-unused-vars: 0, no-unused-expr: 0, no-unused-expressions: 0*/
"use strict";

var should = require("should");

describe("angular ui", function () {
  var angular, modules;

  angular = require("../src/fake-angular")();
  require("../test-mocks/ui-router")(angular);
  modules = angular.modulesMap;

  it("ui.router.util", function () {
    var util = modules["ui.router.util"];

    // Module dependencies
    util.modules.should.be.an.Array;
    util.modules.should.have.lengthOf(1);
    util.modules.should.containDeep(["ng"]);

    // Services
    util.services.should.be.an.Array;
    util.services.should.have.lengthOf(2);
    util.services[0].name.should.be.equal("$resolve");
    util.services[0].deps.should.containDeep(["$q", "$injector"]);
    util.services[1].name.should.be.equal("$templateFactory");
    util.services[1].deps.should.containDeep(["$http", "$templateCache", "$injector"]);

    // Providers
    util.providers.should.be.an.Array;
    util.providers.should.have.lengthOf(1);
    util.providers[0].name.should.be.equal("$urlMatcherFactory");
    util.providers[0].deps.should.be.an.Array;
    util.providers[0].deps.should.have.lengthOf(0);

  });

  it("ui.router.router", function () {
    var router = modules["ui.router.router"];

    // Module dependencies
    router.modules.should.be.an.Array;
    router.modules.should.have.lengthOf(1);
    router.modules.should.containDeep(["ui.router.util"]);

    // Providers
    router.providers.should.be.an.Array;
    router.providers.should.have.lengthOf(1);
    router.providers[0].name.should.be.equal("$urlRouter");
    router.providers[0].deps.should.be.an.Array;
    router.providers[0].deps.should.have.lengthOf(2);
    router.providers[0].deps.should.containDeep(["$locationProvider", "$urlMatcherFactory"]);
  });

  it("ui.router.state", function () {
    var state = modules["ui.router.state"];

    // Module dependencies
    state.modules.should.be.an.Array;
    state.modules.should.have.lengthOf(2);
    state.modules.should.containDeep(["ui.router.router", "ui.router.util"]);

    // Module dependencies
    state.modules.should.be.an.Array;
    state.modules.should.have.lengthOf(2);
    state.modules.should.containDeep(["ui.router.router", "ui.router.util"]);

    // Filters
    state.filters.should.be.an.Array;
    state.filters.should.have.lengthOf(2);
    state.filters[0].name.should.be.equal("isState");
    state.filters[0].deps.should.be.an.Array;
    state.filters[0].deps.should.have.lengthOf(1);
    state.filters[0].deps.should.containDeep(["$state"]);
    state.filters[1].name.should.be.equal("includedByState");
    state.filters[1].deps.should.be.an.Array;
    state.filters[1].deps.should.have.lengthOf(1);
    state.filters[1].deps.should.containDeep(["$state"]);

    // Providers
    state.providers.should.be.an.Array;
    state.providers.should.have.lengthOf(3);
    state.providers[0].name.should.be.equal("$state");
    state.providers[0].deps.should.be.an.Array;
    state.providers[0].deps.should.have.lengthOf(2);
    state.providers[0].deps.should.containDeep(["$urlRouterProvider", "$urlMatcherFactory"]);
    state.providers[1].name.should.be.equal("$view");
    state.providers[1].deps.should.be.an.Array;
    state.providers[1].deps.should.have.lengthOf(0);
    state.providers[1].deps.should.containDeep([]);
    state.providers[2].name.should.be.equal("$uiViewScroll");
    state.providers[2].deps.should.be.an.Array;
    state.providers[2].deps.should.have.lengthOf(0);
    state.providers[2].deps.should.containDeep([]);

    // Directives
    state.directives.should.be.an.Array;
    state.directives.should.have.lengthOf(5);
    state.directives[0].name.should.be.equal("uiView");
    state.directives[0].deps.should.be.an.Array;
    state.directives[0].deps.should.have.lengthOf(3);
    state.directives[0].deps.should.containDeep(["$state", "$injector", "$uiViewScroll"]);
    state.directives[1].name.should.be.equal("uiView");
    state.directives[1].deps.should.be.an.Array;
    state.directives[1].deps.should.have.lengthOf(3);
    state.directives[1].deps.should.containDeep(["$compile", "$controller", "$state"]);
    state.directives[2].name.should.be.equal("uiSref");
    state.directives[2].deps.should.be.an.Array;
    state.directives[2].deps.should.have.lengthOf(2);
    state.directives[2].deps.should.containDeep(["$state", "$timeout"]);
    state.directives[3].name.should.be.equal("uiSrefActive");
    state.directives[3].deps.should.be.an.Array;
    state.directives[3].deps.should.have.lengthOf(3);
    state.directives[3].deps.should.containDeep(["$state", "$stateParams", "$interpolate"]);
    state.directives[4].name.should.be.equal("uiSrefActiveEq");
    state.directives[4].deps.should.be.an.Array;
    state.directives[4].deps.should.have.lengthOf(3);
    state.directives[4].deps.should.containDeep(["$state", "$stateParams", "$interpolate"]);
  });

  it("ui.router.compat and ui.router", function () {
    var compat = modules["ui.router.compat"];
    var main = modules["ui.router"];

    // Module dependencies
    compat.modules.should.be.an.Array;
    compat.modules.should.have.lengthOf(1);
    compat.modules.should.containDeep(["ui.router"]);

    // Module dependencies
    main.modules.should.be.an.Array;
    main.modules.should.have.lengthOf(1);
    main.modules.should.containDeep(["ui.router"]);
  });
});
