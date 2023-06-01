const nearley = require("nearley");
const grammar = require("./grammar");
// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const syntaxRules = {
  functions: {
    random: {
      supported_components: ["Gate"],
      unsupported_stack_functions: ["random", "exchange_all"],
      expected_arguments: [
        {
          description: "Number between 0 and 1 or percentage.",
          examples: [".5", "50%"],
        },
      ],
    },
    exchange_all: {
      supported_components: ["Gate"],
      unsupported_stack_functions: ["random", "exchange_all"],
      expected_arguments: [
        {
          description: "Number between 0 and 1 or percentage.",
          examples: [".5", "50%"],
        },
      ],
    },
  },
};

// Parse something!
let output = { components: [] };
try {
  parser.feed(
    "Source -> Bank; Source ->(20%) Bank; Source |-> Bank |-> Bank |-> Bank;"
  );

  for (let index = 0; index < parser.results[0].length; index++) {
    const token = parser.results[0][index];
    if ((token.syntax = "link")) {
      parseLinkSyntax(token.type);
    }
  }
} catch (error) {
  console.log(error);
}

function parseLinkSyntax(type) {
  switch (type) {
    case "basic":
      break;
  }
}

// function parseComponent(component) {
//   return { ...component, id: Math.floor(Math.random() * 1000) };
// }
