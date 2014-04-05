'use strict';

function Module(name, deps) {
  this.name = name
  this.modules = deps
  this.items = []
}

var methods = ['constant', 'controller', 'directive', 'factory', 'filter', 'provider', 'service', 'value']

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
  return {
    noop: function(){},
    identity: function(a){return a},
    modules: [],
    modulesMap: {},
    modulesNames: [],
    module: function(name, deps) {
      var self = this,
        dependencies = (deps || []).map(function(dep){
          return self.modulesMap[dep] || {
            name: dep,
            ext: true
          }
        })

      if (this.modulesNames.indexOf(name)>-1){
        if(deps){
          this.modulesMap[name].modules = dependencies
        }
        return this.modulesMap[name]
      }

      var module = new Module(name,dependencies)

      this.modulesNames.push(name)
      this.modulesMap[name] = module
      this.modules.push(module)
      return module
    }
  }
}
