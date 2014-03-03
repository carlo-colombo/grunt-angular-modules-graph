# grunt-angular-modules-graph

> Generate modules dependencies graph in .dot format

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-modules-graph --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-modules-graph');
```

## The "modules-graph" task

### Overview
In your project's Gruntfile, add a section named `modules-graph` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'modules-graph': {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.externalDependenciesColor
Type: `String`
Default value: `'red'`

A string value that to set external dependencies link color

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  'modules-graph': {
    options: {
      externalDependenciesColor:'red'
    },
    files: {
      'dest/dependency-graph.dot': ['src/testing.js', 'src/**/*.js'],
    },
  },
});
```

### Example: render graph with grunt-graphviz 
```shell
npm install grunt-grapviz --save-dev
```
```js
grunt.loadNpmTasks('grunt-graphviz');

grunt.initConfig({
  graphviz: {
    dependencies: {
      files: {
        'dependencies-graph.png': 'dependencies-graph.dot'
      }
    },
  }
})
```

### Example
https://github.com/angular-ui/bootstrap example dependencies graph (partial)
![angular-ui/bootstrap ](angular-ui-bootstrap-modules-graph.png "angular-ui/bootstrap Dependencies graph")

## Release History
0.1.0 first release
