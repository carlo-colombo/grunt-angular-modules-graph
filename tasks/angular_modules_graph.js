/*
 * grunt-angular-modules-graph
 * https://github.com/carlo-colombo/grunt-angular-modules-graph
 *
 * Copyright (c) 2014 Carlo Colombo
 * Licensed under the MIT license.
 */


var angular = require('../src/fake-angular')()
    ,template = require('../src/graph-template')
    ,document = {}
    ,window = {}
    ,navigator = {};

module.exports = function(grunt) {
  grunt.registerMultiTask('modules-graph', 'Generate modules dependencies graph in .dot format', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      externalDependenciesColor: 'red'
    });

    for (var dest in this.data.files) {
      grunt.file.expand({}, this.data.files[dest]).forEach(readAndEvalFile)

      grunt.file.write(dest, grunt.template.process(template, {
        data: {
          modules: angular.modules,
          modulesNames: angular.modulesNames,
          options: options
        }
      }));

      grunt.log.writeln("Generating", (grunt.log.wordlist(this.data.files[dest])).cyan,'->',(dest).cyan);
    }
  });

  function readAndEvalFile(file){
    try{
      eval(grunt.file.read(file))
    }
  	catch(e){
  	  grunt.log.writeln(file + ' skipped due to error: '+e)
  	}
  }
};
