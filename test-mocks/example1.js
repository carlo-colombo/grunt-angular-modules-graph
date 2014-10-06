module.exports = function(angular) {

  var noopService = {
    attr:   "attribute",
    getFoo: function () {},
    getBar: function () {}
  };

  function NoDependenciesService () { return noopService; }
  function OneAngularDependencyService1 ($http) { return noopService; }
  function MixedDependenciesService1 ($http, ServiceX, ServiceY) { return noopService; }

  var NoDependenciesService2 = [
    function () { return noopService; }
  ];
  var OneAngularDependencyService2 = [
    "$http",
    function ($http) { return noopService; }
  ];
  var MixedDependenciesService2 = [
    "$http", "ServiceX", "ServiceY",
    function ($http, ServiceX, ServiceY) { return noopService; }
  ];


  angular.module("example1")
  angular.module("example1").factory("NoDependenciesService1",       NoDependenciesService);
  angular.module("example1").factory("NoDependenciesService2",       NoDependenciesService2);
  angular.module("example1").factory("OneAngularDependencyService1", OneAngularDependencyService1);
  angular.module("example1").factory("OneAngularDependencyService2", OneAngularDependencyService2);
  angular.module("example1").factory("MixedDependenciesService1",    MixedDependenciesService1);
  angular.module("example1").factory("MixedDependenciesService2",    MixedDependenciesService2);



  function NoDependenciesCtrl () { return noopService; }
  function OneAngularDependencyCtrl1 ($http) { return noopService; }
  function MixedDependenciesCtrl1 ($http, ServiceX, ServiceY) { return noopService; }

  var NoDependenciesCtrl2 = [
    function () { return noopService; }
  ];
  var OneAngularDependencyCtrl2 = [
    "$http",
    function ($http) { return noopService; }
  ];
  var MixedDependenciesCtrl2 = [
    "$http", "ServiceX", "ServiceY",
    function ($http, ServiceX, ServiceY) { return noopService; }
  ];

  angular.module("example1").controller("NoDependenciesCtrl1",       NoDependenciesCtrl);
  angular.module("example1").controller("NoDependenciesCtrl2",       NoDependenciesCtrl2);
  angular.module("example1").controller("OneAngularDependencyCtrl1", OneAngularDependencyCtrl1);
  angular.module("example1").controller("OneAngularDependencyCtrl2", OneAngularDependencyCtrl2);
  angular.module("example1").controller("MixedDependenciesCtrl1",    MixedDependenciesCtrl1);
  angular.module("example1").controller("MixedDependenciesCtrl2",    MixedDependenciesCtrl2);;
};
