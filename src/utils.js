"use strict";

function parseAngularDeps (angularDeps) {
  var deps, definition, angularDepsStr, depsProcessed = [];
  if (angularDeps instanceof Array) {
    definition = angularDeps.pop();
    deps = angularDeps;
  } else if (angularDeps instanceof Function) {
    definition = angularDeps;
    // We just care about the wrapper function to the dependencies
    angularDepsStr = "" + angularDeps;
    angularDepsStr = angularDepsStr.slice(0, angularDepsStr.indexOf("{"));
    deps = /\(([^)]+)/.exec(angularDepsStr);
    if (deps && deps.length && deps[ 1 ]) {
      deps = deps[1].split(/\s*,\s*/);
    } else {
      deps = [];
    }
  }
  if (deps && deps.length) {
    deps.forEach(function (dep) {
      // if (dep.split("")[0] !== "$") {
        depsProcessed.push(dep.replace(" ", ""));
      // }
    });
  }
  return { deps: depsProcessed, definition: definition };
}

var noop = function() {};

module.exports = {
  parseAngularDeps: parseAngularDeps,
  noop            : noop
};
