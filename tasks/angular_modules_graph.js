/*
 * grunt-angular-modules-graph
 * https://github.com/carlo-colombo/grunt-angular-modules-graph
 *
 * Copyright (c) 2014 Carlo Colombo
 * Licensed under the MIT license.
 */


var angular = require('../src/fake-angular')
    ,template = '\
digraph dependencies{\n\
  node[shape="record"]\n\
<% _.forEach(modules, function(module){ %>\
  "<%- module.name %>"[label="{<%- module.name %>|<%- module.items.join(\'\\\\n\')%>}"] \n\
<%}) %>\n\
\n\
<% _.forEach(modules, function(module){ %>\
<% _.forEach(module.modules, function(dependency){ %>\
  "<%- module.name %>" -> "<%- dependency %>"\
  [color="<% modulesNames.indexOf(dependency)>-1 ? print(\'black\') : print(options.externalDependenciesColor) %>"]\n\
<%}) %>\
<%}) %>\
}'

module.exports = function(grunt) {
  grunt.registerMultiTask('modules-graph', 'Generate modules dependencies graph in .dot format', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      externalDependenciesColor: 'red'
    });

    for (var dest in this.data.files) {
      grunt.file.expand({}, this.data.files[dest]).forEach(function(file) {
        var file = grunt.file.read(file)
        eval(file)
      })

      grunt.file.write(dest, grunt.template.process(template, {
        data: {
          modules: angular.modules,
          modulesNames: angular.modulesNames,
          options: options
        }
      }));
    }
  });
};
