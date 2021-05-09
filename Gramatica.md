GRAMATICAS
=================

<div id='terminales'/>

## Terminales
   
   | **NOMBRE** | **SIMBOLO** |  **NOMBRE** | **SIMBOLO** |
   |------------|---------|----------|-------------|
   | `Rprint`  | print 		| `Rif` | if 
   | `lower`   |   toLower  	| `Rswitch`    | switch
   | `upper`   |  toUpper    	| `Rdefault` | default
   | `Rexec`   |  exec   	| `Rdouble`    | double
   | `Rlength` | length     	| `Rchar`   | char
   | `Rtruncate` | truncate     | `Rvoid `  | void
   | `Rround`   | round   	| `Rcontinue` | continue
   | `RtoString`| toString  	|  `RtoLower` | toLower
   | `Rentero` 	|  int		| `Rround` | round
   | `Rdoble`|  double  	| `Rwhile` | while
   | `Rbooleano` | boleano 	|`for` | for
   | `Rnew` 	| new  		| `Rlist`  | list
   | `Radd`  	| add 		| `Rexec` | exec 
   | `Rlength`  |   length  	| `Rtypeof`    | typeof
   | `Rdo`      |  do    	| `PUNTO` | .
   | `DPUNTOS`  |  :   		| `PTCOMA`    | ;
   | `COMA`     | ,     	| `PARIZQ`   | (
   | `PARDER`   | )      	| `CORIZR `  | [
   | `CORDER`   | ]   		| `LLAVEIZQ` | {
   | `LLAVEDER` | }  		|  `TRUE` | true
   | `FALSE` 	|  false  	| `MAYORI` | >=
   | `MENORI`   |  <=  		| `IGUALDAD` | ==
   | `DIFERENTE`| != 		|  `IGUAL` | =
   | `MAS` 	| +  		| `MENOS`  | -
   | `POR` 	| *  		| `DIV`  | /
   | `MOD`  	| % 		| `POT` | ^ 
   | `MAYOR`    |   >  		| `MENOR`    | <
   | `AND`      |  &&    	| `OR` | \|\|
   | `NOT`     	|  !   		| `ID`    | [a-zA-Z][a-zA-Z0-9_]*
   | `DECIMAL`  | [0-9]+("."[0-9]+)+\b     | `NUMERO`   | [0-9]+\b
   | `Cadena`   |   ""    	| `caracter` | ''


<div id='noterminales'/>

## No terminales

   | **NOMBRE**    |    **NOMBRE**  |    **NOMBRE**   |
   |---------------|----------------|-----------------|
   | `INICIO`    | `SWITCHCASE` |`LISTAVALORES`  |
   | `CUERPO`   |   `INDEC`  | `FUNCIONES`|
   | `DEC_VAR`|  `BREA`       | `INCRE`      | 
   | `IMPRIMIR`        |  `RE`       | `PARAMETROS`|
   | `AS_VAR`|`CONTINUE`   | `LISTAPARAMETROS`        |
   | `EXEC`        | `DOWHILE`    | `CASOS_EVALUAR`  |
   | `SIF`          | `LLAMA_METODO`|`LLAMADA `   |
   | `WHILE`   |   `FUNNA`  | `TIPO`|
   | `TIPO`|  `CAST`    | `EXPRESION`| 


<div id='producciones'/>

## Producciones
`start -> INI`

`INI -> LINS  EOF`

`LINS -> LINS INS
        | INS`

`INS -> Rprint PARIZQ Exp PARDER PTCOMA
    | DECLARAR  PTCOMA               
    | ASIGNAR   PTCOMA               
    | IF                             
    | DOWHILE PTCOMA                 
    | WHILE                          
    | FOR                            
    | SWITCH                         
    | Rbreak PTCOMA                  
    | Rcontinue PTCOMA               
    | FUNCIONES                      
    | LLAMADA  PTCOMA                
    | RETORNO                        
	| error INS`

`RETORNO -> Rretorno Exp PTCOMA   
    | Rretorno PTCOMA`

`DECLARAR-> TIPO ID                                                       
    | TIPO ID IGUAL Exp                                             
    | TIPO CORIZR CORDER ID IGUAL Rnew TIPO CORIZR Exp CORDER       
    | TIPO CORIZR CORDER ID IGUAL LLAVEIZQ L_EXP LLAVEDER           
    | Rlist MENOR TIPO MAYOR ID IGUAL Rnew Rlist MENOR TIPO MAYOR   
    | TIPO error PTCOMA`        
    
    
```
Universidad San Carlos de Guatelama 2021
Programador: Byron Estuardo Caal Catún
Carné: 201901907
```
