%lex
%options case-insensitive
%%

\s+                   /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas
\"((\\\")|[^\n\"])*\"       { yytext = yytext.substr(0,yyleng); return 'cadenaa'; }
\'((\\\')|[^\n\'])\'	    { yytext = yytext.substr(0,yyleng); return 'caracterr'; }

//Funciones 
"print"				  return 'Rprint';
"toLower"			  return 'lower';
"toUpper"			  return 'upper';
"exec"				  return 'Rexec';

//Funciones nativas
"length"			  return 'Rlength';
"truncate"			return 'Rtruncate';
"round"				  return 'Rround';
"typeof"			  return 'Rtypeof';
"toString"			return 'Rtostring';
"toCharArray"		return 'Rchararray';

//Tipos de datos
"int"				    return 'Rentero';
"double"			  return 'Rdoble';
"boolean"			  return 'Rbooleano';
"char"				  return 'Rcarater';
"string"			  return 'Rcadena';

//Sentencias de Control
"while"				  return 'Rwhile';
"do"				    return 'Rdo';
"if"				    return 'Rif';
"else"				  return 'Relse';
"for"				    return 'Rfor';
"switch"			  return 'Rswitch';
"case"				  return 'Rcase';
"default"			  return 'Rdefault';

//Secuencias de transferencia
"break"				  return 'Rbreak';
"continue"			return 'Rcontinue';
"return"			  return 'Rreturn';

//Void, para metodos
"void"          return 'Rvoid'

//Operadores relacionales
"=="            return 'igualii'
"!="            return 'dif'
"<="            return 'menorii'
">="            return 'mayorii'
">"             return 'mayorr'
"<"             return 'menorr'

//Incremento y decremento
"++"            return 'incremento'
"--"            return 'decremento'

//Operadores aritmeticos
"+"					    return 'mass';
"-"					    return 'menoss';
"*"					    return 'porr';
"/"					    return 'divv';
"^"					    return 'pott';
"%"					    return 'modd';

//Operadores logicos
"!"					    return 'nott';
"&&"				    return 'andd'
"||"				    return 'orr';

//Simbolos
"("             return 'parA'
")"             return 'parC'
","             return 'coma'
";"             return 'ptcoma'
":"             return 'dospts'
"{"             return 'llaveA'
"}"             return 'llaveC'

//Extras
"true" 				  return 'Rtrue';
"false" 			  return 'Rfalse';
"="					    return 'igual';
"?"       			return 'opternario';

//Secuencias de escape
"\n"				    return 'saltolinea';
"\\"				    return 'barrainv';
"\'"				    return 'comillasim';
"\""				    return 'comilladob';
"\t"				    return 'tab';

[0-9]+("."[0-9]+)\b  	      return 'decimall';
[0-9]+\b				            return 'enteroo';
([a-zA-Z])([a-zA-Z0-9_])*   return 'identificador'

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%{
	const TIPO_OPERACION	= require('./Controladores/Tipos/TipoOperacion');
	const TIPO_VALOR 		  = require('./Controladores/Tipos/TipoValor');
	const TIPO_DATO			  = require('./Controladores/Tipos/TipoDato'); //para jalar el tipo de dato
	const INSTRUCCION	    = require('./Controladores/Instrucciones/Instruccion');
%}

/* operator associations and precedence */

%left 'orr'
%left 'andd'
%right 'nott'
%left 'igualii' 'dif' 'menorr' 'menorii' 'mayorr' 'mayorii'
%left 'mass' 'menoss'
%left 'porr' 'divv' 'modd' 
%left 'pott' 'incremento' 'decremento'

%left umenos

%start INICIO

%% /* language grammar */

INICIO: OPCIONESCUERPO EOF{ return $1; }
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO { $1.push($2); $$ = $1; }
              | CUERPO { $$ = [$1]; }
              | EOF     { $$ = $1; }
;

CUERPO: DEC_VAR     { $$ = $1 }
      | IMPRIMIR    { $$ = $1 }
      | DEC_MET     { $$ = $1 }
      | AS_VAR      { $$ = $1 }
      | EXEC        { $$ = $1 }
      | RSIF        { $$ = $1 }
      | WHILE       { $$ = $1 }
      | SWITCHCASE  { $$ = $1 }
;
//Execute
EXEC: Rexec identificador parA parC ptcoma        { $$ = INSTRUCCION.nuevoExec($2, null, this._$.first_line,this._$.first_column+1) }
;
//Asignacion de variables
AS_VAR: identificador igual EXPRESION ptcoma      { $$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1) }
;
//Declaracion de variables
DEC_VAR: TIPO identificador ptcoma                  { $$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1) }
       | TIPO identificador igual EXPRESION ptcoma  { $$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line,this._$.first_column+1) }
;
//Tipo de datos
TIPO: Rentero                                     { $$ = TIPO_DATO.ENTERO } 
    | Rdoble                                      { $$ = TIPO_DATO.DECIMAL }
    | Rcadena                                     { $$ = TIPO_DATO.CADENA }
    | Rcarater                                    { $$ = TIPO_DATO.CARACTER }
    | Rbooleano                                   { $$ = TIPO_DATO.BANDERA }
;
//Print
IMPRIMIR: Rprint parA EXPRESION parC ptcoma        { $$ = new INSTRUCCION.nuevoPrint($3, this._$.first_line,this._$.first_column+1) }
;
//If
RSIF: Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC                                    { $$ = new INSTRUCCION.nuevoIf($3, $6, null, this._$.first_line,this._$.first_column+1); }
    | Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC Relse RSIF                         { $$ = new INSTRUCCION.nuevoIf($3, $6, Array($9), this._$.first_line,this._$.first_column+1); }
    | Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC Relse llaveA OPCIONESCUERPO llaveC { $$ = new INSTRUCCION.nuevoIf($3, $6, $10, this._$.first_line,this._$.first_column+1); }
;
//Switch
SWITCHCASE: Rswitch parA EXPRESION parC llaveA LISTACASOS llaveC                            { $$ = INSTRUCCION.nuevoSwitch($3, $6, this._$.first_line,this._$.first_column+1);}
          | Rswitch parA EXPRESION parC llaveA LISTACASOS Rdefault dospts OPCIONESCUERPO llaveC            { $$ = INSTRUCCION.nuevoSwitch($3, $6, , this._$.first_line,this._$.first_column+1);}
;
//casos
LISTACASOS: LISTACASOS Rcase EXPRESION CASOS_EVALUAR                    { $$ = $1; $$.push(INSTRUCCION.nuevoCaso($3, $4)); }
          | Rcase EXPRESION CASOS_EVALUAR                               { $$ = []; $$.push(INSTRUCCION.nuevoCaso($2, $3)); }
;
//casos
CASOS_EVALUAR: dospts                           { $$ = []; }
             | dospts OPCIONESCUERPO            { $$ = $2; }
;
//While
WHILE: Rwhile parA EXPRESION parC llaveA OPCIONESCUERPO llaveC   { $$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,this._$.first_column+1) }
;
//llamar metodo
LLAMADA_METODO: identificador parA parC ptcoma    { $$ = INSTRUCCION.nuevaLlamada($1, null, this._$.first_line,this._$.first_column+1) }
;
//declarar metodo
DEC_MET : identificador parA parC llaveA OPCIONESMETODO llaveC
        | identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC
;
//lista parametros
LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS
               | PARAMETROS
;
//parametros
PARAMETROS: TIPO identificador
;
//opciones metodo
OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO  { $1.push($2); $$ = $1; }
              | CUERPOMETODO { $$ = [$1]; }
;
//cuerpo metodo
CUERPOMETODO: DEC_VAR       { $$ = $1 }
            | WHILE         { $$ = $1 }
            | IMPRIMIR      { $$ = $1 }
            | AS_VAR        { $$ = $1 }
;
//break
BREAK: Rbreak ptcoma        { $$ = $1 }
;
                                   
//Expresiones
EXPRESION: EXPRESION mass EXPRESION              { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1); }
         | EXPRESION menoss EXPRESION            { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1); }
         | EXPRESION porr EXPRESION              { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line,this._$.first_column+1); }
         | EXPRESION divv EXPRESION              { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line,this._$.first_column+1); }
         | EXPRESION pott EXPRESION              { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line,this._$.first_column+1); }
         | EXPRESION modd EXPRESION              { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line,this._$.first_column+1); }
         | EXPRESION dif EXPRESION               { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1); }
         | EXPRESION igualii EXPRESION           { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1); } 
         | EXPRESION menorr EXPRESION            { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1); }
         | EXPRESION menorii EXPRESION           { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1); }
         | EXPRESION mayorr EXPRESION            { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1); }
         | EXPRESION mayorii EXPRESION           { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1); }
         | EXPRESION orr EXPRESION               { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1); }
         | EXPRESION andd EXPRESION              { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1); }
         | nott EXPRESION                        { $$ = INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1); }
         | menoss EXPRESION %prec umenos         { $$ = INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.NEGATIVO, this._$.first_line,this._$.first_column+1); }
         | parA EXPRESION parC                   { $$ = $2 }
         | enteroo                               { $$ = INSTRUCCION.nuevoValor(parseInt($1), TIPO_VALOR.ENTERO, this._$.first_line,this._$.first_column+1); }
         | decimall                              { $$ = INSTRUCCION.nuevoValor(parseFloat($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1); }
         | caracterr                             { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CARACTER, this._$.first_line,this._$.first_column+1); }
         | Rtrue                                 { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1); }
         | Rfalse                                { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1); }
         | cadenaa                               { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1); }
         | identificador                         { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1); }
;


