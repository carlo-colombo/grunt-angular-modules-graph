module.exports = '\
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
