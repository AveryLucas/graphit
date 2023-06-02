const nearley = require("nearley");
const grammar = require("./grammar");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

try {
  parser.feed("test.test()");
  console.log(parser.results);

  const fs = require("fs");
  fs.writeFile("test.json", JSON.stringify(parser.results), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
} catch (error) {
  console.log(error.message);
}
