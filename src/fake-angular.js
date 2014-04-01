'use strict';

function addName(name) {
  this.items.push(name)
  return this
}

function Module(name, deps) {
  this.name = name
  this.modules = deps
  this.items = []
}

var methods = ['constant', 'controller', 'directive', 'factory', 'filter', 'provider', 'service', 'value']

methods.forEach(function(method) {
  Module.prototype[method] = function(name) {
    return addName.call(this, name)
  }
})

Module.prototype.run = function() {
  return this
};
Module.prototype.config = function() {
  return this
};

var angular = {
  modules: [],
  modulesMap: {},
  modulesNames: [],
  module: function(name, deps) {
    if (deps != undefined) {
      var module = new Module(name, deps)
      this.modules.push(module)
      this.modulesNames.push(name)
      this.modulesMap[name] = module
    } else {
      module = modulesMap[name]
    }
    return this.module
  }
}

module.exports = angular
