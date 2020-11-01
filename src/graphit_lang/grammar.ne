possible_component_syntax_examples
	->	component_resource_link

component_resource_link
	->	_ component_layout _ resource_link _ component_layout
		{% d => ({syntax: 'link', from: d[1], to: d[5]}) %}
	|	_ component_layout _ resource_link component_resource_link 
		{% d => ({syntax: 'link', from: d[1], to: d[4]}) %}

component_layout
    ->	component_keywords
		{% d => ({syntax: 'component', type: d[0], functions: [], label: ''}) %}
	|	component_keywords ":" string
		{% d => ({syntax: 'component', type: d[0], functions: [], label: d[2]}) %}
	|	component_keywords ":" function_stack_possible
		{% d => ({syntax: 'component', type: d[0], functions: d[2], label: ''}) %}
	|	component_keywords ":" function_stack_possible ":" string
		{% d => ({syntax: 'component', type: d[0], functions: d[2], label: d[4]}) %}

value
	->	string		{% id %}
	|	number		{% id %}
	|	percentage	{% id %}
	|	myNull		{% id %}
	|	boolean		{% id %}
	
function_stack_possible
	->	function	{% d => [d[0]] %}
	|	function ":" function_stack_possible {% d => ([d[0], ...d[2]]) %}
	
function_arguments
	-> "(" _ arguments _ ")" {% d => d[2] %}
	|	"()"
	
function -> example_functions function_arguments {% d => ({type: d[0], arguments: d[1], syntax: 'function'})%}

arguments
	->	value {% (d) => [d[0]] %}
	|	value _ "," _ arguments {% d => [d[0], ...d[4]] %}
	
component
    ->    component_keywords			{% id %}
    |    component_keywords ":" string	{% d => ({a: 3}) %}

component_keywords
    ->   "Source"	{% id %}
    |    "Gate"		{% id %}
    |    "Bank"		{% id %}
	
example_functions
	->	"random"		{% id %}
	|	"exchange_all"	{% id %}

resource_link -> "->"	{% id %}

# Defining different types of values ie: numbers, strings, whitespace

string -> "\"" characters "\"" {% d => d[1] %}

characters -> [^"]:+ {% d => d[0].join('') %}

percentage -> number "%" {% d => d[0] / 100 %}

number 
  -> digits "." digits {% d => Number(d[0] + "." + d[2]) %}
  | digits  {% d => Number(d) %}

digits 
  -> digit {% id %}
  | digit digits {% d => d.join("") %}

digit -> [0-9] {% id %}

boolean 
  -> "true" {% () => true %}
  | "false" {% () => false %}

myNull -> "null" {% () => null %}

_ -> [ \t\n]:* {% () => ' ' %}