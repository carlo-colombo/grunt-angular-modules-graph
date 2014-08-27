module.exports = function (grunt, dot) {
  dot.templateSettings.strip = false;
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