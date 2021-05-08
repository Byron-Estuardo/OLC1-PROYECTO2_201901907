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
"do"				    return 'Rdoo';
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
"void"          return 'Rvoid';

//Operadores relacionales
"=="            return 'igualii';
"!="            return 'dif';
"<="            return 'menorii';
">="            return 'mayorii';
">"             return 'mayorr';
"<"             return 'menorr';

//Incremento y decremento
"++"            return 'incremento';
"--"            return 'decremento';

//Extras
"true" 				  return 'Rtrue';
"false" 			  return 'Rfalse';
"="					    return 'igual';

//Operadores aritmeticos
"+"					    return 'mass';
"-"					    return 'menoss';
"*"					    return 'porr';
"/"					    return 'divv';
"^"					    return 'pott';
"%"					    return 'modd';

//Operadores logicos
"!"					    return 'nott';
"&&"				    return 'andd';
"||"				    return 'orr';

//Simbolos
"?"             return 'Rternario'
"("             return 'parA';
")"             return 'parC';
","             return 'coma';
";"             return 'ptcoma';
":"             return 'dospts';
"{"             return 'llaveA';
"}"             return 'llaveC';



//Secuencias de escape
"\n"				    return 'saltolinea';
"\\"				    return 'barrainv';
"\'"				    return 'comillasim';
"\""				    return 'comilladob';
"\t"				    return 'tab';

[0-9]+("."[0-9]+)\b  	      return 'decimall';
[0-9]+\b				            return 'enteroo';
([a-zA-Z])([a-zA-Z0-9_])*   return 'identificador';

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
%left 'Rternario'
%left 'orr'
%left 'andd'
%right 'nott'
%left casts
%left 'igualii' 'dif' 'menorr' 'menorii' 'mayorr' 'mayorii'
%left 'mass' 'menoss'
%left 'porr' 'divv' 'modd'
%left 'pott'
%left umenos

%start INICIO

%% /* language grammar */

INICIO: OPCIONESCUERPO EOF{ console.log(JSON.stringify($1,null,2)); return $1; }
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO { $1.push($2); $$ = $1; }
              | CUERPO { $$ = [$1]; }
              | EOF     { $$ = $1; }
;

CUERPO: DEC_VAR             { $$ = $1 }
      | IMPRIMIR            { $$ = $1 }
      | DEC_MET             { $$ = $1 }
      | AS_VAR              { $$ = $1 }
      | EXEC                { $$ = $1 }
      | RSIF                { $$ = $1 }
      | WHILE               { $$ = $1 }
      | SWITCHCASE          { $$ = $1 }
      | INDEC               { $$ = $1 }
      | INSFOR              { $$ = $1 }
      | BREA                { $$ = $1 }
      | RETU                { $$ = $1 }
      | CONTINU             { $$ = $1 }
      | DOWHILE             { $$ = $1 }
      | LLAMADA_METODO      { $$ = $1 }
      | FUNCIONESNATIVAS    { $$ = $1 }
      | CAST                { $$ = $1 }
      | FUNC                { $$ = $1 }
;
//Funciones nativas
FUNCIONESNATIVAS: lower parA EXPRESION parC ptcoma      { $$ = INSTRUCCION.nuevoFNat( $3, TIPO_OPERACION.LOWER, this._$.first_line,this._$.first_column+1 ); }
                | upper parA EXPRESION parC ptcoma      { $$ = INSTRUCCION.nuevoFNat( $3, TIPO_OPERACION.UPPER, this._$.first_line,this._$.first_column+1 ); }
                | Rtostring parA EXPRESION parC ptcoma  { $$ = INSTRUCCION.nuevoFNat( $3, TIPO_OPERACION.TSTRING, this._$.first_line,this._$.first_column+1 ); }
                | Rtypeof parA EXPRESION parC ptcoma    { $$ = INSTRUCCION.nuevoFNat( $3, TIPO_OPERACION.TYPEOF, this._$.first_line,this._$.first_column+1 ); }
                | Rround parA EXPRESION parC ptcoma     { $$ = INSTRUCCION.nuevoFNat( $3, TIPO_OPERACION.ROUND, this._$.first_line,this._$.first_column+1 ); }
                | Rtruncate parA EXPRESION parC ptcoma  { $$ = INSTRUCCION.nuevoFNat( $3, TIPO_OPERACION.TRUNCATE, this._$.first_line,this._$.first_column+1 ); }
                | Rlength parA EXPRESION parC ptcoma    { $$ = INSTRUCCION.nuevoFNat( $3, TIPO_OPERACION.LENGTH, this._$.first_line,this._$.first_column+1 ); }
;
//Casteos
CAST: parA TIPO parC EXPRESION ptcoma                { $$ = INSTRUCCION.nuevoCasteo($3, TIPO_OPERACION.CASTEO, $2 ,this._$.first_line,this._$.first_column+1 ); }
;
//Incremento - Decremento
INDEC: identificador incremento ptcoma                     { $$ = INSTRUCCION.nuevoIncremento($1, this._$.first_line,this._$.first_column+1); }
     | identificador decremento ptcoma                     { $$ = INSTRUCCION.nuevoDecremento($1, this._$.first_line,this._$.first_column+1); }
;   
//Incremento - Decremento para for
INDEC1: identificador incremento                             { $$ = INSTRUCCION.nuevoIncremento($1, this._$.first_line,this._$.first_column+1); }
      | identificador decremento                             { $$ = INSTRUCCION.nuevoDecremento($1, this._$.first_line,this._$.first_column+1); }
;   
//Asignacion de variables
AS_VAR: identificador igual EXPRESION ptcoma               { $$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1); }
;
//Asignacion de variables para for
AS_VAR1: identificador igual EXPRESION                      { $$ = INSTRUCCION.nuevaAsignacion($1, $3, this._$.first_line,this._$.first_column+1); }
;
//Declaracion de variables
DEC_VAR: TIPO identificador ptcoma                  { $$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1); }
       | TIPO identificador igual EXPRESION ptcoma  { $$ = INSTRUCCION.nuevaDeclaracion($2, $4, $1, this._$.first_line,this._$.first_column+1); }
;
//Tipo de datos
TIPO: Rentero                                     { $$ = TIPO_DATO.ENTERO } 
    | Rdoble                                      { $$ = TIPO_DATO.DECIMAL }
    | Rcadena                                     { $$ = TIPO_DATO.CADENA }
    | Rcarater                                    { $$ = TIPO_DATO.CARACTER }
    | Rbooleano                                   { $$ = TIPO_DATO.BANDERA }
;
//Print
IMPRIMIR: Rprint parA EXPRESION parC ptcoma        { $$ = new INSTRUCCION.nuevoPrint($3, this._$.first_line,this._$.first_column+1); }
        | Rprint parA  parC ptcoma                  { $$ = new INSTRUCCION.nuevoPrint(null, this._$.first_line,this._$.first_column+1); }
;
//For
INSFOR: Rfor parA DEC_VAR EXPRESION ptcoma ACTU parC llaveA OPCIONESCUERPO llaveC   { $$ = INSTRUCCION.nuevofor($3, $4, $6, $9, this._$.first_line,this._$.first_column+1); }
      | Rfor parA AS_VAR EXPRESION ptcoma ACTU parC llaveA OPCIONESCUERPO llaveC    { $$ = INSTRUCCION.nuevofor($3, $4, $6, $9, this._$.first_line,this._$.first_column+1); }
      | Rfor parA DEC_VAR EXPRESION ptcoma ACTU parC llaveA  llaveC                 { $$ = INSTRUCCION.nuevofor($3, $4, $6, null, this._$.first_line,this._$.first_column+1); }
      | Rfor parA AS_VAR EXPRESION ptcoma ACTU parC llaveA  llaveC                  { $$ = INSTRUCCION.nuevofor($3, $4, $6, null, this._$.first_line,this._$.first_column+1); }
;
//Actualizacion For
ACTU: INDEC1     { $$ = $1 }
    | AS_VAR1    { $$ = $1 }
;
//Do while
DOWHILE: Rdoo llaveA OPCIONESCUERPO llaveC Rwhile parA EXPRESION parC ptcoma     { $$ = INSTRUCCION.nuevoDoWhile($3, $7, this._$.first_line,this._$.first_column+1); }
       | Rdoo llaveA  llaveC Rwhile parA EXPRESION parC ptcoma                   { $$ = INSTRUCCION.nuevoDoWhile(null, $7, this._$.first_line,this._$.first_column+1); }
;
//If
RSIF: Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC                                    { $$ = new INSTRUCCION.nuevoIf($3, $6, null, this._$.first_line,this._$.first_column+1); }
    | Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC Relse RSIF                         { $$ = new INSTRUCCION.nuevoIf($3, $6, Array($9), this._$.first_line,this._$.first_column+1); }
    | Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC Relse llaveA OPCIONESCUERPO llaveC { $$ = new INSTRUCCION.nuevoIf($3, $6, $10, this._$.first_line,this._$.first_column+1); }
    | Rif parA LLAMADA_METODO1 parC llaveA OPCIONESCUERPO llaveC                                    { $$ = new INSTRUCCION.nuevoIf($3, $6, null, this._$.first_line,this._$.first_column+1); }
    | Rif parA LLAMADA_METODO1 parC llaveA OPCIONESCUERPO llaveC Relse RSIF                         { $$ = new INSTRUCCION.nuevoIf($3, $6, Array($9), this._$.first_line,this._$.first_column+1); }
    | Rif parA LLAMADA_METODO1 parC llaveA OPCIONESCUERPO llaveC Relse llaveA OPCIONESCUERPO llaveC { $$ = new INSTRUCCION.nuevoIf($3, $6, $10, this._$.first_line,this._$.first_column+1); }
    | Rif parA EXPRESION parC llaveA  llaveC                                                    { $$ = new INSTRUCCION.nuevoIf($3, null, null, this._$.first_line,this._$.first_column+1); }
    | Rif parA EXPRESION parC llaveA  llaveC Relse RSIF                                         { $$ = new INSTRUCCION.nuevoIf($3, null, Array($9), this._$.first_line,this._$.first_column+1); }
    | Rif parA EXPRESION parC llaveA  llaveC Relse llaveA  llaveC                               { $$ = new INSTRUCCION.nuevoIf($3, null, null, this._$.first_line,this._$.first_column+1); }
    | Rif parA LLAMADA_METODO1 parC llaveA  llaveC                                                    { $$ = new INSTRUCCION.nuevoIf($3, null, null, this._$.first_line,this._$.first_column+1); }
    | Rif parA LLAMADA_METODO1 parC llaveA  llaveC Relse RSIF                                         { $$ = new INSTRUCCION.nuevoIf($3, null, Array($9), this._$.first_line,this._$.first_column+1); }
    | Rif parA LLAMADA_METODO1 parC llaveA  llaveC Relse llaveA  llaveC                               { $$ = new INSTRUCCION.nuevoIf($3, null, null, this._$.first_line,this._$.first_column+1); }
    
;
//Switch
SWITCHCASE: Rswitch parA EXPRESION parC llaveA LISTACASOS llaveC                                            { $$ = INSTRUCCION.nuevoSwitch($3, $6, this._$.first_line,this._$.first_column+1);}
          | Rswitch parA EXPRESION parC llaveA LISTACASOS Rdefault dospts OPCIONESCUERPO llaveC             { $$ = INSTRUCCION.nuevoSwitch($3, $6, $9, this._$.first_line,this._$.first_column+1);}
;
//casos
LISTACASOS: LISTACASOS Rcase EXPRESION CASOS_EVALUAR                    { $$ = $1; $$.push(INSTRUCCION.nuevoCaso($3, $4, this._$.first_line,this._$.first_column+1)); }
          | Rcase EXPRESION CASOS_EVALUAR                               { $$ = []; $$.push(INSTRUCCION.nuevoCaso($2, $3, this._$.first_line,this._$.first_column+1)); }
;
//casos
CASOS_EVALUAR: dospts                           { $$ = []; }
             | dospts OPCIONESCUERPO            { $$ = $2; }
;
//While
WHILE: Rwhile parA EXPRESION parC llaveA OPCIONESCUERPO llaveC   { $$ = new INSTRUCCION.nuevoWhile($3, $6, this._$.first_line,this._$.first_column+1); }
     | Rwhile parA EXPRESION parC llaveA  llaveC                { $$ = new INSTRUCCION.nuevoWhile($3, null, this._$.first_line,this._$.first_column+1); }
;
//Execute
EXEC: Rexec identificador parA parC ptcoma                 { $$ = INSTRUCCION.nuevoExec($2, null, this._$.first_line,this._$.first_column+1); }
    | Rexec identificador parA LISTAVALORES parC ptcoma    { $$ = INSTRUCCION.nuevoExec($2, $4, this._$.first_line,this._$.first_column+1); }
;
//Lista valores
LISTAVALORES: LISTAVALORES coma EXPRESION                   {$1.push($3); $$=$1}
            | EXPRESION                                     {$$=[$1]}
;
//llamar metodo
LLAMADA_METODO: identificador parA parC ptcoma                  { $$ = INSTRUCCION.nuevaLlamada($1, null, this._$.first_line,this._$.first_column+1); }
              | identificador parA LISTAVALORES parC ptcoma     { $$ = INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line,this._$.first_column+1); }
;
//llamar metodo 1
LLAMADA_METODO1: identificador parA parC                  { $$ = INSTRUCCION.nuevaLlamada($1, null, this._$.first_line,this._$.first_column+1); }
              | identificador parA LISTAVALORES parC     { $$ = INSTRUCCION.nuevaLlamada($1, $3, this._$.first_line,this._$.first_column+1); }
;
//Funciones
FUNC : TIPO identificador parA parC llaveA OPCIONESCUERPO llaveC                      {$$ = INSTRUCCION.nuevaFuncion($1, $2, null, $6, this._$.first_line,this._$.first_column+1)}
     | TIPO identificador parA LISTAPARAMETROS parC llaveA OPCIONESCUERPO llaveC      {$$ = INSTRUCCION.nuevaFuncion($1, $2, $4, $7, this._$.first_line,this._$.first_column+1)}
;   
//declarar metodo
DEC_MET : Rvoid identificador parA parC llaveA OPCIONESMETODO llaveC                      {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line,this._$.first_column+1)}
        | Rvoid identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC      {$$ = INSTRUCCION.nuevoMetodo($2, $4, $7, this._$.first_line,this._$.first_column+1)}
;
//lista parametros
LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS       {$1.push($3); $$=$1;}
               | PARAMETROS                             {$$=[$1];}
;
//parametros
PARAMETROS: TIPO identificador                          {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}
;
//opciones metodo
OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO         { $1.push($2); $$ = $1; }
              | CUERPOMETODO                        { $$ = [$1]; }
;
//cuerpo metodo
CUERPOMETODO: DEC_VAR             { $$ = $1 }
            | IMPRIMIR            { $$ = $1 }
            | DEC_MET             { $$ = $1 }
            | AS_VAR              { $$ = $1 }
            | EXEC                { $$ = $1 }
            | RSIF                { $$ = $1 }
            | WHILE               { $$ = $1 }
            | SWITCHCASE          { $$ = $1 }
            | INDEC               { $$ = $1 }
            | INSFOR              { $$ = $1 }
            | BREA                { $$ = $1 }
            | RETU                { $$ = $1 }
            | CONTINU             { $$ = $1 }
            | DOWHILE             { $$ = $1 }
            | LLAMADA_METODO      { $$ = $1 }
            | FUNCIONESNATIVAS    { $$ = $1 }
            | CAST                { $$ = $1 }
            | FUNC                { $$ = $1 }
;
//break
BREA: Rbreak ptcoma         { $$ = INSTRUCCION.nuevoBreak(this._$.first_line,this._$.first_column+1); }
;
//Continue
CONTINU: Rcontinue ptcoma   { $$ = INSTRUCCION.nuevoContinue(this._$.first_line,this._$.first_column+1); }
;
//return
RETU: Rreturn ptcoma            { $$ = INSTRUCCION.nuevoReturn(null, this._$.first_line,this._$.first_column+1); }
    | Rreturn EXPRESION ptcoma  { $$ = INSTRUCCION.nuevoReturn($2, this._$.first_line,this._$.first_column+1); }
    | Rreturn LLAMADA_METODO1 ptcoma  { $$ = INSTRUCCION.nuevoReturn($2, this._$.first_line,this._$.first_column+1); }
;     
//Expresiones
EXPRESION: EXPRESION Rternario EXPRESION dospts EXPRESION   { $$ = INSTRUCCION.nuevoTernario(TIPO_OPERACION.TERNARIO, $1, $3, $5,this._$.first_line,this._$.first_column+1); }
         | EXPRESION mass EXPRESION                         { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1); }
         | EXPRESION menoss EXPRESION                       { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1); }
         | EXPRESION porr EXPRESION                         { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line,this._$.first_column+1); }
         | EXPRESION divv EXPRESION                         { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line,this._$.first_column+1); }
         | EXPRESION pott EXPRESION                         { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line,this._$.first_column+1); }
         | EXPRESION modd EXPRESION                         { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line,this._$.first_column+1); }
         | EXPRESION dif EXPRESION                          { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1); }
         | EXPRESION igualii EXPRESION                      { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1); } 
         | EXPRESION menorr EXPRESION                       { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1); }
         | EXPRESION menorii EXPRESION                      { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1); }
         | EXPRESION mayorr EXPRESION                       { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1); }
         | EXPRESION mayorii EXPRESION                      { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1); }
         | EXPRESION orr EXPRESION                          { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1); }
         | EXPRESION andd EXPRESION                         { $$ = INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1); }
         | nott EXPRESION                                   { $$ = INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.NOT,this._$.first_line,this._$.first_column+1); }
         | menoss EXPRESION %prec umenos                    { $$ = INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.NEGATIVO, this._$.first_line,this._$.first_column+1); }
         | parA EXPRESION parC                              { $$ = $2 }
         | enteroo                                          { $$ = INSTRUCCION.nuevoValor(parseInt($1), TIPO_VALOR.ENTERO, this._$.first_line,this._$.first_column+1); }
         | decimall                                         { $$ = INSTRUCCION.nuevoValor(parseFloat($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1); }
         | caracterr                                        { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CARACTER, this._$.first_line,this._$.first_column+1); }
         | Rtrue                                            { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1); }
         | Rfalse                                           { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1); }
         | cadenaa                                          { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1); }
         | identificador                                    { $$ = INSTRUCCION.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1); }
         | lower parA EXPRESION parC %prec casts            { $$ = INSTRUCCION.nuevoFNat($3, TIPO_OPERACION.LOWER, this._$.first_line,this._$.first_column+1 ); }
         | upper parA EXPRESION parC %prec casts            { $$ = INSTRUCCION.nuevoFNat($3, TIPO_OPERACION.UPPER, this._$.first_line,this._$.first_column+1 ); }
         | Rtostring parA EXPRESION parC %prec casts        { $$ = INSTRUCCION.nuevoFNat($3, TIPO_OPERACION.TSTRING, this._$.first_line,this._$.first_column+1 ); }
         | Rtypeof parA EXPRESION parC %prec casts          { $$ = INSTRUCCION.nuevoFNat($3, TIPO_OPERACION.TYPEOF, this._$.first_line,this._$.first_column+1 ); }
         | Rround parA EXPRESION parC  %prec casts          { $$ = INSTRUCCION.nuevoFNat($3, TIPO_OPERACION.ROUND, this._$.first_line,this._$.first_column+1 ); }
         | Rtruncate parA EXPRESION parC %prec casts        { $$ = INSTRUCCION.nuevoFNat($3, TIPO_OPERACION.TRUNCATE, this._$.first_line,this._$.first_column+1 ); }
         | Rlength parA EXPRESION parC %prec casts          { $$ = INSTRUCCION.nuevoFNat($3, TIPO_OPERACION.LENGTH, this._$.first_line,this._$.first_column+1 ); }
         | parA TIPO parC EXPRESION  %prec casts            { $$ = INSTRUCCION.nuevoCasteo($2, TIPO_OPERACION.CASTEO, $4 ,this._$.first_line,this._$.first_column+1 ); }
;
