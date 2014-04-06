'use strict';

function Module(name, deps) {
  this.name = name
  this.modules = deps
  this.items = []
}

var methods = ['constant', 'controller', 'directive', 'factory', 'filter', 'provider', 'service', 'value']
var globalApis = ['lowercase',
  'uppercase',
  'forEach',
  'extend',
  'identity',
  'noop',
  'isUndefined',
  'isDefined',
  'isObject',
  'isString',
  'isNumber',
  'isDate',
  'isArray',
  'isFunction',
  'isElement',
  'copy',
  'equals',
  'bind',
  'toJson',
  'fromJson',
  'bootstrap',
  'injector',
  'element',
];

methods.forEach(function(method) {
  Module.prototype[method] = function addItem(name) {
    this.items.push(name)
    return this
  }
})

Module.prototype.run = function() {
  return this
};
Module.prototype.config = function() {
  return this
};

module.exports = function() {
  var angular = {
    modules: [],
    modulesMap: {},
    modulesNames: [],
    module: function(name, deps) {
      if (this.modulesNames.indexOf(name)>-1){
        if(deps){
          this.modulesMap[name].modules = deps
        }
        return this.modulesMap[name]
      }

      var module = new Module(name,deps)

      this.modulesNames.push(name)
      this.modulesMap[name] = module
      this.modules.push(module)
      return module
    }
  }
  var noop = function(){}
  globalApis.forEach(function(method) {
    angular[method] = noop
  });

  return angular
}
