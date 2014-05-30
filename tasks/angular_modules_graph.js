/*
 * grunt-angular-modules-graph
 * https://github.com/carlo-colombo/grunt-angular-modules-graph
 *
 * Copyright (c) 2014 Carlo Colombo
 * Licensed under the MIT license.
 */


var angularModulesGraph = require('angular-modules-graph'),
  template = require('../src/graph-template'),
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
        console.info(result)
        if (result.error) {
          grunt.log.writeln(result.id + ' skipped due to error: ' + result.exception)
        }
      })

      grunt.file.write(dest, grunt.template.process(template, {
        data: {
          modules: res.angular.modules,
          modulesNames: res.angular.modulesNames,
          options: options
        }
      }));

      grunt.log.writeln("Generating", (grunt.log.wordlist(this.data.files[dest])).cyan, '->', (dest).cyan);
    }
  });
};
