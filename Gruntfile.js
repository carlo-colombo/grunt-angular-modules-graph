/*
 * grunt-angular-architecture-graph
 * https://github.com/lucalanca/grunt-angular-architecture-graph
 *
 * Copyright (c) 2014 Joao Figueiredo
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require("load-grunt-tasks")(grunt);

  // load configurations within grunt/
  require("load-grunt-config")(grunt);

  // Actually load this plugin"s task(s).
  grunt.loadTasks("tasks");

};
