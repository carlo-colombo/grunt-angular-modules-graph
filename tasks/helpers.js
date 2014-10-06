/*eslint no-use-before-define: 0*/
"use strict";

var architectureGraph = require("angular-architecture-graph");
var dot               = require("dot");

dot.templateSettings.strip = false;

module.exports = function (grunt) {

  var templates = {
    allTemplate:     dot.template(grunt.file.read("templates/all.def")),
    modulesTemplate: dot.template(grunt.file.read("templates/modules.def")),
    moduleTemplate:  dot.template(grunt.file.read("templates/module.def"))
  };


  return {
    parseSrcFiles      : parseSrcFiles,
    analyseFiles       : analyseFiles,
    generateGraphFiles : generateGraphFiles
  };

  /**
   * [parseSrcFiles description]
   * @param  {[type]} files [description]
   * @return {[type]}       [description]
   */
  function parseSrcFiles (files) {
    return files.src.filter(function(filepath) {
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn("Source file '" + filepath + "' not found.");
        return false;
      } else {
        return true;
      }
    }).map(function(filepath) {
      // Read file source.
      return {
        id: filepath,
        text: grunt.file.read(filepath)
      };
    });
  }

  function analyseFiles (files) {
    return architectureGraph(files).angular;
  }

  /**
   * [generateGraphFiles description]
   * @param  {[type]} result [description]
   * @return {[type]}        [description]
   */
  function generateGraphFiles (angular) {
    generateAllGraph(angular);
    generateModulesGraph(angular);
    angular.modules.forEach(function (module) {
      generateModuleGraph(module);
    });
    return angular;
  }

  /*-------------------
   * Private
   *-------------------
   */

  function generateAllGraph (angular) {
    var allResult = templates.allTemplate({
      modules: angular.modules
    });
    grunt.file.write("tmp/all.ui-router.dot", allResult);
  }

  function generateModulesGraph (angular) {
    var modulesResult = templates.modulesTemplate({
        modules: angular.modules
    });

    grunt.file.write("tmp/ui-router.modules.dot", modulesResult);
  }

  function generateModuleGraph (module) {
    var moduleResult = templates.moduleTemplate(module);

    grunt.file.write("tmp/ui-router.module." + module.name + ".dot", moduleResult);
  }


};
