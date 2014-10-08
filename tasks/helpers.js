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


  // Available Helpers
  return {
    parseSrcFiles      : parseSrcFiles,
    analyseFiles       : analyseFiles,
    generateGraphFiles : generateGraphFiles,
    renderDotFiles     : renderDotFiles
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
  function generateGraphFiles (angular, files) {
    generateAllGraph(angular, files);
    generateModulesGraph(angular, files);
    angular.modules.forEach(function (module) {
      generateModuleGraph(module, files);
    });
    return angular;
  }

  function renderDotFiles (files) {
    var dest = files.dest;
    var config = {
      graphviz: {
        target: {
          files: {}
        }
      }
    };

    // Configure png files for all generated .dot files
    var diagrams = grunt.file.expand(dest + "/dot/**/*.dot");
    diagrams.forEach(function (diagram) {
      // we just want the diagram name and folder so we remove
      // the remainder of the path
      diagram = diagram.replace(dest + "/dot", "");
      diagram = diagram.replace(".dot", "");

      // finally, add this diagram's config
      // to the graphviz tasks config object
      config.graphviz.target.files[dest + "/png" + diagram + ".png"] = dest + "/dot" + diagram + ".dot";
    });

    // Add configuration and run graphviz task
    grunt.config.merge(config);
    grunt.task.run(["graphviz"]);
  }

  /*-------------------
   * Private
   *-------------------
   */

  function generateAllGraph (angular, files) {
    var allResult = templates.allTemplate({
      modules: angular.modules
    });

    grunt.file.write(files.dest + "/dot/all.dot", allResult);
  }

  function generateModulesGraph (angular, files) {
    var modulesResult = templates.modulesTemplate({
        modules: angular.modules
    });
    grunt.file.write(files.dest + "/dot/modules.dot", modulesResult);
  }

  function generateModuleGraph (module, files) {
    var moduleResult = templates.moduleTemplate(module);
    grunt.file.write(files.dest + "/dot/modules/" + module.name + ".dot", moduleResult);
  }


};
