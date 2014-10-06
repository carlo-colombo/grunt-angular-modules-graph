# Angular Architecture Graph

This project is a node utility that analyses an angular project and exports a graph with the project's architecture: modules, controllers, directives and filters.

[ ![Codeship Status for lucalanca/angular-modules-graph](https://www.codeship.io/projects/43e2f770-0ead-0132-1978-5ad6f07ad273/status)](https://www.codeship.io/projects/32481)

## How to use it:

1. Require the module:

  ```js
  var angularArchitectureGraph = require('angular-architecture-graph'),
  ])
  ```

2. Call it with your project code:

  ```js
  var architecture = angularArchitectureGraph([
    { id: 'file1.js', text: '<angular code here in a string>' },
    { id: 'file2.js', text: '<angular code here in a string>' }
  ])
  ```

3. Do whatever you want with the resulted architecture object

## About

This project was originally forked from , extracted from [@carlo-colombo's](https://github.com/carlo-colombo) [angular-modules-graph](https://github.com/carlo-colombo/angular-modules-graph)

## License:
MIT