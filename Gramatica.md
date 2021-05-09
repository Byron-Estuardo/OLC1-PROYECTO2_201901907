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
   | `IMPRIMIR`        |  `RETU`       | `PARAMETROS`|
   | `AS_VAR`|`CONTINUE`   | `LISTAPARAMETROS`        |
   | `EXEC`        | `DOWHILE`    | `CASOS_EVALUAR`  |
   | `SIF`          | `LLAMADA_METODO`|`LLAMADA `   |
   | `WHILE`   |   `FUNCIONESNATIVAS`  | `TIPO`|
   | `TIPO`|  `CAST`    | `EXPRESION`| 


<div id='producciones'/>

## Producciones
`start -> INICIO`

`INICIO -> OPCIONESCUERPO EOF`

`OPCIONESCUERPO -> OPCIONESCUERPO CUERPO
        | CUERPO`

`CUERPO ->  DEC_VAR         
| IMPRIMIR        
| DEC_MET         
| AS_VAR          
| EXEC            
| RSIF            
| WHILE           
| SWITCHCASE      
| INDEC           
| INSFOR          
| BREA            
| RETU            
| CONTINU         
| DOWHILE         
| LLAMADA_METODO  
| FUNCIONESNATIVAS
| CAST            
| FUNC                          
`

`FUNCIONESNATIVAS -> lower parA EXPRESION parC ptcoma    
                | upper parA EXPRESION parC ptcoma    
                | Rtostring parA EXPRESION parC ptcoma
                | Rtypeof parA EXPRESION parC ptcoma  
                | Rround parA EXPRESION parC ptcoma   
                | Rtruncate parA EXPRESION parC ptcoma
                | Rlength parA EXPRESION parC ptcoma  `

`CAST -> parA TIPO parC EXPRESION ptcoma`        

`INDEC -> identificador incremento ptcoma
     | identificador decremento ptcoma`

`INDEC1 -> identificador incremento
      | identificador decremento`

`AS_VAR -> identificador igual EXPRESION ptcoma`

`AS_VAR1 -> identificador igual EXPRESION`

`DEC_VAR -> TIPO identificador ptcoma                
       | TIPO identificador igual EXPRESION ptcoma`

`TIPO -> Rentero  
    | Rdoble   
    | Rcadena  
    | Rcarater 
    | Rbooleano`
    
`IMPRIMIR -> Rprint parA EXPRESION parC ptcoma 
        | Rprint parA  parC ptcoma          `

`INSFOR -> Rfor parA DEC_VAR EXPRESION ptcoma ACTU parC llaveA OPCIONESCUERPO llaveC
      | Rfor parA AS_VAR EXPRESION ptcoma ACTU parC llaveA OPCIONESCUERPO llaveC 
      | Rfor parA DEC_VAR EXPRESION ptcoma ACTU parC llaveA  llaveC              
      | Rfor parA AS_VAR EXPRESION ptcoma ACTU parC llaveA  llaveC               `

`ACTU -> INDEC1 
    | AS_VAR1`
    
`DOWHILE -> Rdoo llaveA OPCIONESCUERPO llaveC Rwhile parA EXPRESION parC ptcoma
       | Rdoo llaveA  llaveC Rwhile parA EXPRESION parC ptcoma              `

`RSIF -> Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC                                   
    | Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC Relse RSIF                        
    | Rif parA EXPRESION parC llaveA OPCIONESCUERPO llaveC Relse llaveA OPCIONESCUERPO llaveC
    | Rif parA EXPRESION parC llaveA  llaveC                                                 
    | Rif parA EXPRESION parC llaveA  llaveC Relse RSIF                                      
    | Rif parA EXPRESION parC llaveA  llaveC Relse llaveA  llaveC                            `

`SWITCHCASE -> Rswitch parA EXPRESION parC llaveA LISTACASOS llaveC                               
          | Rswitch parA EXPRESION parC llaveA LISTACASOS Rdefault dospts OPCIONESCUERPO llaveC`

`LISTACASOS -> LISTACASOS Rcase EXPRESION CASOS_EVALUAR
          | Rcase EXPRESION CASOS_EVALUAR           `
	  
`CASOS_EVALUAR -> dospts               
             | dospts OPCIONESCUERPO`

`WHILE -> Rwhile parA EXPRESION parC llaveA OPCIONESCUERPO llaveC
     | Rwhile parA EXPRESION parC llaveA  llaveC              `

`EXEC -> Rexec identificador parA parC ptcoma             
    | Rexec identificador parA LISTAVALORES parC ptcoma`

`LISTAVALORES -> LISTAVALORES coma EXPRESION
            | EXPRESION                  `
	    
`LLAMADA_METODO -> identificador parA parC ptcoma             
              | identificador parA LISTAVALORES parC ptcoma`

`FUNC -> TIPO identificador parA parC llaveA OPCIONESCUERPO llaveC                
     | TIPO identificador parA LISTAPARAMETROS parC llaveA OPCIONESCUERPO llaveC`

`DEC_MET -> Rvoid identificador parA parC llaveA OPCIONESMETODO llaveC                
        | Rvoid identificador parA LISTAPARAMETROS parC llaveA OPCIONESMETODO llaveC`

`LISTAPARAMETROS -> LISTAPARAMETROS coma  PARAMETROS
               | PARAMETROS`
	      
`PARAMETROS -> TIPO identificador`

`OPCIONESMETODO -> OPCIONESMETODO CUERPOMETODO
              | CUERPOMETODO               `

`CUERPOMETODO -> DEC_VAR         
            | IMPRIMIR        
            | DEC_MET         
            | AS_VAR          
            | EXEC            
            | RSIF            
            | WHILE           
            | SWITCHCASE      
            | INDEC           
            | INSFOR          
            | BREA            
            | RETU            
            | CONTINU         
            | DOWHILE         
            | LLAMADA_METODO  
            | FUNCIONESNATIVAS
            | CAST            
            | FUNC            `
	   
`BREA -> Rbreak ptcoma`

`CONTINU -> Rcontinue ptcoma`

`RETU -> Rreturn ptcoma          
    | Rreturn EXPRESION ptcoma`

`EXPRESION -> identificador parA parC                       
         | identificador parA LISTAVALORES parC          
         | EXPRESION Rternario EXPRESION dospts EXPRESION
         | EXPRESION mass EXPRESION                      
         | EXPRESION menoss EXPRESION                    
         | EXPRESION porr EXPRESION                      
         | EXPRESION divv EXPRESION                      
         | EXPRESION pott EXPRESION                      
         | EXPRESION modd EXPRESION                      
         | EXPRESION dif EXPRESION                       
         | EXPRESION igualii EXPRESION                   
         | EXPRESION menorr EXPRESION                    
         | EXPRESION menorii EXPRESION                   
         | EXPRESION mayorr EXPRESION                    
         | EXPRESION mayorii EXPRESION                   
         | EXPRESION orr EXPRESION                       
         | EXPRESION andd EXPRESION                      
         | nott EXPRESION                                
         | menoss EXPRESION                  
         | parA EXPRESION parC                           
         | enteroo                                       
         | decimall                                      
         | caracterr                                     
         | Rtrue                                         
         | Rfalse                                        
         | cadenaa                                       
         | identificador                                 
         | lower parA EXPRESION parC          
         | upper parA EXPRESION parC          
         | Rtostring parA EXPRESION parC      
         | Rtypeof parA EXPRESION parC        
         | Rround parA EXPRESION parC         
         | Rtruncate parA EXPRESION parC      
         | Rlength parA EXPRESION parC        
         | parA TIPO parC EXPRESION           `

```
Universidad San Carlos de Guatelama 2021
Programador: Byron Estuardo Caal Catún
Carné: 201901907
```
