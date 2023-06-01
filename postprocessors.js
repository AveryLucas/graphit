exports.location_method_chain = ([locationChain, , methodChain]) => ({
  type: "location_method_chain",
  locationChain,
  methodChain,
});

exports.method_invocation_no_args = ([identifier]) => ({
  type: "method_invocation",
  name: identifier[0],
});

exports.method_invocation_with_args = ([identifier, , , , args]) => ({
  type: "method_invocation",
  name: identifier[0],
  args,
});

exports.args_single = (id) => [id[0]];

exports.args_multiple = ([identifier, , args]) => [identifier[0], ...args];

exports.location_chain_with_id = ([identifier, , , locationChain]) => ({
  type: "location_chain",
  identifier: identifier[0],
  locationChain,
});

exports.location_chain_no_id = ([, , , locationChain]) => ({
  type: "location_chain",
  locationChain,
});

exports.location_single = ([identifier]) => ({
  type: "location",
  name: identifier,
});

exports.generator_declaration = ([, , identifier]) => ({
  type: "generator_declaration",
  name: identifier,
});

exports.root_location_declaration_single = ([, , identifier]) => ({
  type: "root_location_declaration",
  name: identifier,
});

exports.root_location_declaration_with_children = ([
  ,
  ,
  identifier,
  ,
  ,
  locationDeclaration,
]) => ({
  type: "root_location_declaration",
  name: identifier,
  children: locationDeclaration,
});

exports.hierarchical_location_declaration_cluster = (id) => ({
  type: "hierarchical_location_declaration",
  locationCluster: id,
});

exports.hierarchical_location_declaration_cluster_and_location = ([
  locationCluster,
  ,
  locationDeclaration,
]) => ({
  type: "hierarchical_location_declaration",
  locationCluster,
  locationDeclaration,
});

exports.hierarchical_location_declaration_single = ([identifier]) => ({
  type: "location",
  name: identifier[0],
});

exports.hierarchical_location_declaration_with_children = ([
  identifier,
  ,
  ,
  locationDeclaration,
]) => ({
  type: "hierarchical_location_declaration",
  name: identifier[0],
  children: locationDeclaration,
});

exports.location_cluster = ([, , elements]) => ({
  type: "location_cluster",
  elements,
});

exports.cluster_elements_single = ([identifier]) => [identifier[0]];

exports.cluster_elements_multiple = ([identifier, , elements]) => [
  identifier[0],
  ...elements,
];

exports.identifier = ([firstLetter, rest]) =>
  firstLetter + (rest ? rest.join("") : "");
