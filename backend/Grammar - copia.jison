%lex

%options case-insensitive


%%

\s+                                         //Se ignoran los espacios en blanco
"//".*                                      //Comentario unilinea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         //Comentario multilinea

"decimal"               return 'decimal'
"cadena"                return 'cadena'
"bandera"               return 'bandera'
"true"                  return 'true'
"false"                 return 'false'
"print"                  return 'imprimir'
"{"                     return 'llaveA'
"}"                     return 'llaveC'
";"                     return 'pcoma'
"-"                     return 'menos'
"+"                     return 'mas'
"*"                     return 'por'
"/"                     return 'dividido'
"<"                     return 'menor'
">"                     return 'mayor'
"<="                    return 'menorigual'
">="                    return 'mayorigual'
"=="                    return 'igualigual'
"!="                    return 'distinto'
","                     return 'coma'
"||"                    return 'or'
"&&"                    return 'and'
"^"                     return 'exponente'
"!"                     return 'not'
"%"                     return 'modulo'
"("                     return 'parA'
")"                     return 'parC'
"?"                     return 'signointerrogacion'
":"                     return 'dospuntos'
"while"                 return 'while'
"clase"                 return 'clase'
([a-zA-Z])([a-zA-Z0-9_])*   return 'identificador'
["\""]([^"\""])*["\""]      return 'string'
[0-9]+("."[0-9]+)?\b        return 'numero'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    const TIPO_OPERACION = require('../Controladores/Tipos/TipoOperacion.js')
    const TIPO_VALOR = require('../Controladores/Tipos/TipoValor.js')
    const TIPO_DATO = require('../Controladores/Tipos/TipoDato.js')
    const INSTRUCCIONES = require('../Controladores/Instrucciones')

%}

%left 'or'
%left 'and'
%right 'not'
%left 'igualigual' 'distinto' 'menor' 'menorigual' 'mayor' 'mayorigual'
%left 'mas' 'menos'
%left 'por' 'dividido' 'modulo' 
%left 'exponente'

%left umenos

%start INICIO

%% /*Inicio Gramatica*/

INICIO: clase identificador llaveA OPCIONESCUERPO llaveC EOF{return $4;}
;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO                       {$1.push($2); $$=$1;}
              | CUERPO                                      {$$=[$1];}
;

CUERPO: DEC_VAR                                             {$$=$1}
      | WHILE                                               {$$=$1}
      | IMPRIMIR                                            {$$=$1}
      | AS_VAR                                              {$$=$1}
;

ASIG_VARIAB: identificador menor menos EXPRESION pcoma       {$$ = INSTRUCCIONES.nuevaAsignacion($2, null, $1, this._$.first_line,this._$.first_column+1);}
;

DECLA_VAR:TIPOVAR identificador pcoma                          {$$ = INSTRUCCIONES.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1);}
        | TIPOVAR identificador menor menos EXPRESION pcoma    {$$ = INSTRUCCIONES.nuevaDeclaracion($2, $5, $1, this._$.first_line,this._$.first_column+1);}
;

TIPOVAR: decimal                                            {$$ = TIPO_DATO.DECIMAL}
        |cadena                                             {$$ = TIPO_DATO.CADENA}
        |bandera                                            {$$ = TIPO_DATO.CADENA}
;

EXPRESION: EXPRESION suma EXPRESION                         {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menos EXPRESION                        {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION multi EXPRESION                        {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line,this._$.first_column+1);}
         | EXPRESION div EXPRESION                          {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line,this._$.first_column+1);}
         | EXPRESION exponente EXPRESION                    {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line,this._$.first_column+1);}
         | EXPRESION modulo EXPRESION                       {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line,this._$.first_column+1);}
         | menos EXPRESION %prec umenos                     {$$= INSTRUCCIONES.nuevaOperacionUnaria(TIPO_OPERACION.NEGACION, this._$.first_line,this._$.first_column+1); }
         | EXPRESION igualigual EXPRESION                   {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION diferente EXPRESION                    {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menor EXPRESION                        {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION menorigual EXPRESION                   {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION mayor EXPRESION                        {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION mayorigual EXPRESION                   {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line,this._$.first_column+1);}
         | EXPRESION or EXPRESION                           {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line,this._$.first_column+1);}
         | EXPRESION and EXPRESION                          {$$= INSTRUCCIONES.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line,this._$.first_column+1);}                              
         | NUMBER                                           {$$ = INSTRUCCIONES.nuevoValor(Number($1), TIPO_VALOR.DECIMAL, this._$.first_line,this._$.first_column+1)}
         | true                                             {$$ = INSTRUCCIONES.nuevoValor(($1), TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
         | false                                            {$$ = INSTRUCCIONES.nuevoValor($1, TIPO_VALOR.BANDERA, this._$.first_line,this._$.first_column+1)}
         | string                                           {$$ = INSTRUCCIONES.nuevoValor($1, TIPO_VALOR.CADENA, this._$.first_line,this._$.first_column+1)}
         | identificador                                    {$$ = INSTRUCCIONES.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR, this._$.first_line,this._$.first_column+1)}
;

DEC_MET : identificador parA parC llaveA OPCIONESMETODO llaveC
        | identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC
;

LISTAPARAMETROS: LISTAPARAMETROS coma  PARAMETROS
               | PARAMETROS
;

PARAMETROS: TIPO identificador
;

OPCIONESMETODO: OPCIONESMETODO CUERPOMETODO                 {$1.push($2); $$=$1;}
              | CUERPOMETODO                                {$$=[$1];}
;

CUERPOMETODO: DEC_VAR                                       {$$=$1}
            | WHILE                                         {$$=$1}
            | IMPRIMIR                                      {$$=$1}
            | AS_VAR                                        {$$=$1}
;

IMPRIMIR: print menor menor EXPRESION ptcoma                {$$ = new INSTRUCCION.nuevoCout($4, this._$.first_line,this._$.first_column+1)}
;

WHILE: while parA EXPRESION parC llaveA OPCIONESMETODO llaveC {$$ = new INSTRUCCION.nuevoWhile($3, $6 , this._$.first_line,this._$.first_column+1)}
;