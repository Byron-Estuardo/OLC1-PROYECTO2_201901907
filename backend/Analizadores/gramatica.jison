%lex

%options case-insensitive


%%

\s+                                         //Se ignoran los espacios en blanco
"//".*                                      //Comentario unilinea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         //Comentario multilinea

"decimal"               return 'decimal';
"cadena"                return 'cadena';
"bandera"               return 'bandera';
"true"                  return 'true'
"false"                 return 'false'
"cout"                  return 'imprimir';
"{"                     return 'llaveA'
"}"                     return 'llaveC'
";"                     return 'pcoma';
"-"                     return 'menos';
"+"                     return 'mas';
"*"                     return 'por';
"/"                     return 'dividido';
"<"                     return 'menor';
">"                     return 'mayor';
"<="                    return 'menorigual';
">="                    return 'mayorigual';
"=="                    return 'igualigual';
"!="                    return 'distinto';
","                     return 'coma';
"||"                    return 'or';
"&&"                    return 'and';
"^"                     return 'exponente';
"!"                     return 'not';
"%"                     return 'modulo';
"("                     return 'parA';
")"                     return 'parC';
"?"                     return 'signointerrogacion';
":"                     return 'dospuntos';
([a-zA-Z])([a-zA-Z0-9_])*   return 'identificador';
["\""]([^"\""])*["\""]      return 'string';
[0-9]+("."[0-9]+)?\b        return 'numero'

<<EOF>>               return 'EOF';
.           {console.log('Error Lexico: '+yytext+' en la linea' + yylloc.first_line + ' en la columna '+yylloc.first_column); }

/lex

//Precedencia de Operadores
%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'distinto' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'mas' 'menos'
%left 'por' 'dividido' 'modulo' 
%left 'exponente'

%left umenos



