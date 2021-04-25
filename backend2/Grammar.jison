%lex
%%

\s+                   /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

//Funciones 
"print"				    return 'print';
"toLower"			    return 'lower';
"toUpper"			    return 'upper';
"exec"				    return 'exec';

//Funciones nativas
"length"			    return 'length';
"truncate"			    return 'truncate';
"round"				    return 'round';
"typeof"			    return 'typeof';
"toString"			    return 'tostring';
"toCharArray"		    return 'chararray';
"new"				    return 'new';

//Tipos de datos
"int"				    return 'entero';
"double"			    return 'doble';
"boolean"			    return 'booleano';
"char"				    return 'carater';
"string"			    return 'cadena';

//Secuencias de escape
"\n"				    return 'saltolinea';
"\\"				    return 'barrainv';
"\'"				    return 'comillasim';
"\""				    return 'comilladob';
"\t"				    return 'tab';

//Sentencias de Control
"while"				    return 'while';
"do"				    return 'do';
"if"				    return 'if';
"else"				    return 'else';
"for"				    return 'for';
"switch"			    return 'switch';
"case"				    return 'case';
"default"			    return 'default';

//Secuencias de transferencia
"break"				    return 'break';
"continue"			    return 'continue';
"return"			    return 'return';

//Void, para metodos
"void"                  return 'void'

//Operadores aritmeticos
"+"					    return 'mas';
"-"					    return 'menos';
"*"					    return 'por';
"/"					    return 'div';
"^"					    return 'pot';
"%"					    return 'mod';

//Operadores logicos
"!"					    return 'NOT';
"&&"				    return 'AND'
"||"				    return 'OR';

//Operadores relacionales
"=="                    return 'iguali'
"!="                    return 'diferente'
"<="                    return 'menori'
">="                    return 'mayori'
">"                     return 'mayor'
"<"                     return 'menor'

//Incremento y decremento
"++"                    return 'incremento'
"--"                    return 'decremento'

//Simbolos
"("                     return 'parA'
")"                     return 'parC'
","                     return 'coma'
";"                     return 'ptcoma'
"{"                     return 'llaveA'
"}"                     return 'llaveC'

//Extras
"true" 				    return 'true';
"false" 			    return 'false';
"="					    return 'igual';
"?"       			    return 'opternario'
"&"					    return 'concat';

[0-9]+("."[0-9]+)\b  	    return 'decimal';
[0-9]+\b				    return 'entero';
([a-zA-Z])([a-zA-Z0-9_])*   return 'identificador'
["\""]([^"\""])*["\""]      return 'string'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%{
	const TIPO_OPERACION	= require('./Controladores/Tipos/TipoOperacion').TIPO_OPERACION;
	const TIPO_VALOR 		= require('./Controladores/Tipos/TipoValor').TIPO_VALOR;
	const TIPO_DATO			= require('./Controladores/Tipos/TipoDato').TIPO_DATO; //para jalar el tipo de dato
	const INSTRUCCION	= require('./Controladores/Instrucciones/Instruccion').INSTRUCCION;
%}

/* operator associations and precedence */

%left 'or'
%left 'and'
%right 'not'
%left 'iguali' 'diferente' 'menor' 'menori' 'mayor' 'mayori'
%left 'mas' 'menos'
%left 'por' 'div' 'modulo' 
%left 'exponente'

%left umenos

%start INICIO

%% /* language grammar */

INICIO: clase identificador llaveA OPCIONESCUERPO llaveC EOF{return $4;}
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO {$1.push($2); $$=$1;}
              | CUERPO {$$=[$1];}
;

CUERPO: DEC_VAR {$$=$1}
      | DEC_MET {$$=$1}
      | AS_VAR {$$=$1}
      | EXEC {$$=$1}
;

EXEC: exec identificador parA parC ptcoma {$$ = INSTRUCCION.nuevoExec($2, null, this._$.first_line,this._$.first_column+1)}
;

LLAMADA_METODO: identificador parA parC ptcoma {$$ = INSTRUCCION.nuevaLlamada($1, null, this._$.first_line,this._$.first_column+1)}
;

AS_VAR: identificador menor menos EXPRESION ptcoma {$$ = INSTRUCCION.nuevaAsignacion($1, $4, this._$.first_line,this._$.first_column+1)}
;

DEC_VAR: TIPO identificador ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
       | TIPO identificador menor menos EXPRESION ptcoma {$$ = INSTRUCCION.nuevaDeclaracion($2, $5, $1, this._$.first_line,this._$.first_column+1)}
;

TIPO: decimal {$$ = TIPO_DATO.DECIMAL}
    | cadena {$$ = TIPO_DATO.CADENA}
    | bandera {$$ = TIPO_DATO.BANDERA}
;


EXPRESION: EXPRESION suma EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION multi EXPRESION {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line,this._$.first_column+1);}
         | EXPRESION div EXPRESION   {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line,this._$.first_column+1);}
         | EXPRESION exponente EXPRESION {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION modulo EXPRESION    {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line,this._$.first_column+1);}
         | menos EXPRESION %prec umenos  {$$= INSTRUCCIONES.nuevaOperacionUnaria($1,$3, TIPO_OPERACION.NEGATIVO, this._$.first_line,this._$.first_column+1); }
         | parA EXPRESION parC {$$=$2}
         | EXPRESION igualigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION diferente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION mayor EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION mayorigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1);}
         | not EXPRESION { $$ = INSTRUCCION.nuevoOperacionUnaria($2, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1); }
         | NUMBER {$$ = INSTRUCCION.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)}
         | true {$$ = INSTRUCCION.nuevoValor(($1), TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
         | false {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
         | string {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
         | identificador {$$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
;

DEC_MET : identificador parA parC llaveA OPCIONESMETODO llaveC
        | identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS
               | PARAMETROS
;

PARAMETROS: TIPO identificador
;

OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO  {$1.push($2); $$=$1;}
              | CUERPOMETODO {$$=[$1];}
;

CUERPOMETODO: DEC_VAR {$$=$1}
            | WHILE {$$=$1}
            | IMPRIMIR {$$=$1}
            | AS_VAR {$$=$1}
;

IMPRIMIR: print menor menor EXPRESION ptcoma{$$ = new INSTRUCCION.nuevoCout($4, this._$.first_line,this._$.first_column+1)}
;

WHILE: while parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,this._$.first_column+1)}
;