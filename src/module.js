"use strict";

var pluralize = require("pluralize");
var utils = require("./utils");
var api   = require("./api");

function Module(name, deps) {
  this.name = name;
  this.modules = deps;
  this.items = [];
  this.controllers = [];
  this.services = [];
  this.factories = [];
  this.filters = [];
  this.providers = [];
  this.directives = [];
}

// Adds module methods
api.methods.forEach(function(method) {
  Module.prototype[ method ] = function addItem(name) {
    if (!name) {
      return this;
    }
    this.items.push(name);
    return this;
  };
});

["controller", "factory", "service", "filter", "provider", "directive"].forEach(function (method) {
  Module.prototype[ method ] = function (name, deps) {
    if (!name) {
      return this;
    }
    var deps2 = utils.parseAngularDeps(deps).deps;
    this[pluralize(method)].push({
      "name": name,
      "deps": deps2
    });
    this.items.push(name);
    return this;
  };
});

Module.prototype.run = function() {
  return this;
};

Module.prototype.config = function() {
  return this;
};

module.exports = Module;
