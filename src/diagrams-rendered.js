var dot = require('../node_modules/dot/doT.js');

dot.templateSettings.strip = false;

module.exports = function (grunt) {
  function renderModulesTemplate(angular){
    var modulesTemplate = dot.template(grunt.file.read('templates/modules.def'));
    return modulesTemplate({
        modules:      angular.modules,
        modulesNames: angular.modulesNames
    });
  }

  function renderModuleTemplate(module){
    var modulesTemplate = dot.template(grunt.file.read('templates/module.def'));
    return modulesTemplate({
        controllers: module.controllers,
        services:    module.services
    });
  }
  return {
    renderModulesTemplate: renderModulesTemplate,
    renderModuleTemplate:  renderModuleTemplate
  }
}