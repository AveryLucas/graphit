const { v4: uuidv4 } = require("uuid");

exports.location_method_chain = ([locationChain, , , , methodChain]) => ({
  type: "location_method_chain",
  locationChain,
  methodChain,
});

exports.method_invocation_no_args = ([identifier]) => ({
  type: "method_invocation",
  name: identifier,
});

exports.method_invocation_with_args = ([identifier, , , , args]) => ({
  type: "method_invocation",
  name: identifier,
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

exports.root_location_declaration_with_children = ([, , name, , , , child]) => {
  const id = uuidv4();

  return {
    id,
    type: "location_declaration",
    name,
    children: child,
  };
};

exports.hierarchical_location_declaration_single = ([identifier]) => ({
  type: "location_declaration",
  id: uuidv4(),
  name: identifier,
});

exports.hierarchical_location_declaration_with_children = ([
  identifier,
  ,
  ,
  ,
  children,
]) => {
  const id = uuidv4();

  if (!Array.isArray(children)) children = [children];

  return {
    id,
    type: "location_declaration",
    name: identifier,
    children: children.map((child) => ({ ...child, parent: id })),
  };
};

exports.identifier = ([firstLetter, rest]) =>
  firstLetter + (rest ? rest.join("") : "");
