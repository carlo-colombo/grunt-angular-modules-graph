/*
 * grunt-angular-modules-graph
 * https://github.com/carlo-colombo/grunt-angular-modules-graph
 *
 * Copyright (c) 2014 Carlo Colombo
 * Licensed under the MIT license.
 */


var angularModulesGraph = require('angular-architecture-graph'),
    templates = require('../src/diagrams-rendered')(grunt),
    document = {}, window = {}, navigator = {};

module.exports = function(grunt) {
  grunt.registerMultiTask('modules-graph', 'Generate modules dependencies graph in .dot format', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      externalDependenciesColor: 'red'
    });

    for (var dest in this.data.files) {
      var scripts = grunt.file.expand({}, this.data.files[dest]).map(function(file) {
        return {
          id: file,
          text: grunt.file.read(file)
        }
      })

      var res = angularModulesGraph(scripts)

      res.results.forEach(function(result) {
        if (result.error) {
          grunt.log.writeln(result.id + ' skipped due to error: ' + result.exception)
        }
      })

      var modulesDiagram = templates.renderModulesTemplate(res.angular)

      grunt.file.write('modules.dot', modulesDiagram);
      grunt.log.writeln("Generating", ('modules.dot').cyan);
      res.angular.modules.forEach(function (module) {
        var moduleDiagram  = templates.renderModuleTemplate(module),
            moduleFileName = 'module' + module.name + '.dot';
        grunt.file.write(moduleFileName, moduleDiagram);
        grunt.log.writeln("Generating", (moduleFileName).cyan);
      });
    }
  });
};
