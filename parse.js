const nearley = require("nearley");
const grammar = require("./rscript");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  parser.feed("#Player");
  console.log(parser.results);
} catch (error) {
  console.log(error.message);
}