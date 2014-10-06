"use strict";

var utils  = require("./utils");
var api    = require("./api");
var Module = require("./module");

module.exports = function () {
  var angular = {
    modules: [],
    modulesMap: {},
    modulesNames: [],
    module: function(name, deps) {
      var module;

      // Module was inserted before
      if (this.modulesNames.indexOf(name) !== -1) {
        module = this.modulesMap[name];
        if(deps){
          this.modulesMap[name].modules = deps;
        }
      // First time we see this module
      } else {
        module = new Module(name,deps);
        this.modulesNames.push(name);
        this.modulesMap[name] = module;
        this.modules.push(module);
      }
      return module;
    }
  };

  // Adds global apis to the angular object
  api.globalApis.forEach(function(method) {
    angular[method] = utils.noop;
  });

  return angular;
};
