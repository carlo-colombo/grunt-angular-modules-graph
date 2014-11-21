# grunt-angular-architecture-graph [![Build Status](https://travis-ci.org/lucalanca/grunt-angular-modules-graph.png?branch=master)](https://travis-ci.org/lucalanca/grunt-angular-modules-graph)


> Create graphs of your angular projects using angular-architecture-graph.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-architecture-graph --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-architecture-graph');
```

## The "angular_architecture_graph" task

### Overview
In your project's Gruntfile, add a section named `angular_architecture_graph` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  angular_architecture_graph: {
    diagram: {
      files: {
        'PATH/TO/OUTPUT/FILES': [ 'PATH/TO/YOUR/DIST/FILE.JS' ]
      }
    }
  },
});
```

#### Demos
- ui-router overview diagram
![angular-ui/ui-router overview](https://raw.githubusercontent.com/lucalanca/grunt-angular-modules-graph/master/docs/images/ui.router.all.png "angular-ui/ui-router Dependencies graph")

- ui-router ui.router.state module
![angular-ui/ui-router state module](https://raw.githubusercontent.com/lucalanca/grunt-angular-modules-graph/master/docs/images/ui.router.state.png "angular-ui/ui-router Dependencies graph")

- ui-router ui.router.util module
![angular-ui/ui-router util module](https://raw.githubusercontent.com/lucalanca/grunt-angular-modules-graph/master/docs/images/ui.router.util.png "angular-ui/ui-router Dependencies graph")

- ui-bootstrap
![angular-ui/bootstrap ](https://raw.githubusercontent.com/lucalanca/grunt-angular-modules-graph/master/docs/images/all.ui-bootstrap.png "angular-ui/bootstrap Dependencies graph")

- ui-bootstrap ui.bootstrap.tooltip module
![angular-ui/bootstrap tooltip module ](https://raw.githubusercontent.com/lucalanca/grunt-angular-modules-graph/master/docs/images/ui.bootstrap.tooltip.png "angular-ui/bootstrap Dependencies graph")


### Options

#### options.hideAngularServices
Type: `Boolean`
Default value: `true`

A boolean value that shows angular services (e.g. $http, $q) as dependencies when set to false.

```js
hideAngularServices: false
```


## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2014-11-21   v0.1.0  Separated the legend from the graphs.
