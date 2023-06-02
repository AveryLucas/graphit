@{%
const p = require('./postprocessors');
%}

statement
    -> root_declaration {% id %}
    | main_method_syntax {% id %}

main_method_syntax
    -> method_chain {% id %}

method_chain
    -> method_invocation {% id %}
    | location_chain WS "." WS method_chain {% p.location_method_chain %} 

method_invocation
    -> identifier WS "(" WS ")" {% p.method_invocation_no_args %}
    | identifier WS "(" WS method_arguments WS ")" {% p.method_invocation_with_args %}

method_arguments 
    -> identifier {% p.args_single %}
    | identifier WS "," WS method_arguments {% p.args_multiple %}

location_chain
    -> "#" WS "." WS location_chain {% p.location_chain_no_id %}
    | "#" WS identifier WS "." WS location_chain {% p.location_chain_with_id %}
    | "@" WS "." WS location_chain {% id %}
    | identifier WS "." WS location_chain {% p.location_chain_with_id %}
    | identifier {% p.location_single %}

root_declaration
    -> root_location_declaration {% id %}
    | root_generator_declaration {% p.generator_declaration %}

root_location_declaration
    -> "#" WS identifier {% p.root_location_declaration_single %}
    | "#" WS identifier WS "." WS hierarchical_location_declaration {% p.root_location_declaration_with_children %}

hierarchical_location_declaration
    ->	identifier {% p.hierarchical_location_declaration_single %}
    |	identifier WS "." WS hierarchical_location_declaration {% p.hierarchical_location_declaration_with_children %}

chained_identifier
	-> identifier {% id %}
	| identifier "." chained_identifier {% id %}

identifier -> [a-zA-Z_] [a-zA-Z_0-9]:* {% p.identifier %}
WS -> [ \t\n]:*