// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const p = require('./postprocessors');
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "statement", "symbols": ["root_declaration"], "postprocess": id},
    {"name": "statement", "symbols": ["main_method_syntax"], "postprocess": id},
    {"name": "main_method_syntax", "symbols": ["method_chain"], "postprocess": id},
    {"name": "method_chain", "symbols": ["method_invocation"], "postprocess": id},
    {"name": "method_chain", "symbols": ["location_chain", "WS", {"literal":"."}, "WS", "method_chain"], "postprocess": p.location_method_chain},
    {"name": "method_invocation", "symbols": ["identifier", "WS", {"literal":"("}, "WS", {"literal":")"}], "postprocess": p.method_invocation_no_args},
    {"name": "method_invocation", "symbols": ["identifier", "WS", {"literal":"("}, "WS", "method_arguments", "WS", {"literal":")"}], "postprocess": p.method_invocation_with_args},
    {"name": "method_arguments", "symbols": ["identifier"], "postprocess": p.args_single},
    {"name": "method_arguments", "symbols": ["identifier", "WS", {"literal":","}, "WS", "method_arguments"], "postprocess": p.args_multiple},
    {"name": "location_chain", "symbols": [{"literal":"#"}, "WS", {"literal":"."}, "WS", "location_chain"], "postprocess": p.location_chain_no_id},
    {"name": "location_chain", "symbols": [{"literal":"#"}, "WS", "identifier", "WS", {"literal":"."}, "WS", "location_chain"], "postprocess": p.location_chain_with_id},
    {"name": "location_chain", "symbols": [{"literal":"@"}, "WS", {"literal":"."}, "WS", "location_chain"], "postprocess": id},
    {"name": "location_chain", "symbols": ["identifier", "WS", {"literal":"."}, "WS", "location_chain"], "postprocess": p.location_chain_with_id},
    {"name": "location_chain", "symbols": ["identifier"], "postprocess": p.location_single},
    {"name": "root_declaration", "symbols": ["root_location_declaration"], "postprocess": id},
    {"name": "root_declaration", "symbols": ["root_generator_declaration"], "postprocess": p.generator_declaration},
    {"name": "root_location_declaration", "symbols": [{"literal":"#"}, "WS", "identifier"], "postprocess": p.root_location_declaration_single},
    {"name": "root_location_declaration", "symbols": [{"literal":"#"}, "WS", "identifier", "WS", {"literal":"."}, "WS", "hierarchical_location_declaration"], "postprocess": p.root_location_declaration_with_children},
    {"name": "hierarchical_location_declaration", "symbols": ["identifier"], "postprocess": p.hierarchical_location_declaration_single},
    {"name": "hierarchical_location_declaration", "symbols": ["identifier", "WS", {"literal":"."}, "WS", "hierarchical_location_declaration"], "postprocess": p.hierarchical_location_declaration_with_children},
    {"name": "chained_identifier", "symbols": ["identifier"], "postprocess": id},
    {"name": "chained_identifier", "symbols": ["identifier", {"literal":"."}, "chained_identifier"], "postprocess": id},
    {"name": "identifier$ebnf$1", "symbols": []},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-zA-Z_0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": [/[a-zA-Z_]/, "identifier$ebnf$1"], "postprocess": p.identifier},
    {"name": "WS$ebnf$1", "symbols": []},
    {"name": "WS$ebnf$1", "symbols": ["WS$ebnf$1", /[ \t\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WS", "symbols": ["WS$ebnf$1"]}
]
  , ParserStart: "statement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
