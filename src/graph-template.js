module.exports = '\
digraph dependencies{\n\
  node[shape="record" style="filled", fillcolor="grey90"]\n\
<% _.forEach(modules, function(module){ %>\
  "<%- module.name %>"[label="{<%- module.name %>|}"]\n\
<%}) %>\n\
  node[shape="record" style="filled", fillcolor="deepskyblue2"]\n\
<% _.forEach(modules, function(module){ %>\
  "<%- module.name %>-services"[label="{services}"]\n\
  "<%- module.name %>" -> "<%- module.name %>-services"\n\
<% _.forEach(module.services, function(service){ %>\
  "<%- service.name %>"[label="{<%- service.name %>|<%- service.api.join("\\n") %>}"]\n\
  "<%- module.name %>-services" -> "<%- service.name %>"\n\
<%}) %>\
<%}) %>\n\
\n\
node[fillcolor="firebrick2"]\n\
<% _.forEach(modules, function(module){ %>\
<% _.forEach(module.controllers, function(controller){ %>\
  "<%- controller.name %>"[label="{<%- controller.name %>|}"]\n\
<% _.forEach(controller.deps, function(dep){ %>\
  "<%- dep %>" -> "<%- controller.name %>"\n\
<%}) %>\
<%}) %>\
<%}) %>\n\
\n\
  node[fillcolor="grey60"]\n\
<% _.forEach(modules, function(module){ %>\
<% _.forEach(module.modules, function(dependency){ %>\
  "<%- module.name %>" -> "<%- dependency %>"\
<%}) %>\
<%}) %>\n\
\n\
 }'
