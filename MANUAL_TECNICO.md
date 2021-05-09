MANUAL TÉCNICO 💻
===================

Descripción de la solución ⚙️
-----------------------

#### Ejecucion ####

El programa `Typesty` puede ser ejecutado desde cualquier ordenador siempre y cuando contenga entre su software las aplicaciones `Node` y `Angular`. Para poder arrancar el programa es necesario mantener 2 terminales abriertas, una en la cual se debe de mantener la ejecución de la aplicación en el servidor (`Angular`) y la segunda terminal en donde se corra el archivo `grammar.js` el cual es el medio de conexión entre el _Backend1_ y el _Frontend_

#### Lectura ####

El código maestro se encuentra en el archivo `grammar.js` el cual es creado a partir del archivo `grammar.jison`, en el cual se encuentra la lectura y retorno a los archivos para la creacion del codigo. Ejecuta las instrucciones correspondientes y devuelve los elementos imprimibles así como los errores generados durante la lectura del archivo de entrada.

#### Analizador ####

El programa lee caracter por caracter el archivo de entrada, el cual deberá de tener una extensión de tipo _ty_ , si un caracter no cumple con la estructura definida en el programa se creará un Reporte de Errores el cual será impreso después de la ejecución de todo el código a analizar.

Requerimientos Funcionales del Sistema 📋
-----------------------
• Existe un paquete el cual es el encargado de gestionar el almacenamiento de las bases de datos, proporcionando al servidor un conjunto de funciones para ingresar, modificar extraer y eliminar la información.

• Cada registro que corresponde a una tupla de una tabla será almacenado en cada nodo que corresponden a un Arbol. Estos registros seran débilmente tipados.

• El paquete cuenta con una interfaz gráfica que facilita el manejo de la información, para ello se requiere tener instalado [Angular](https://angular.io)


Requerimientos minimos del Entorno de Desarrollo 🔧
-----------------------
• Versión de JavaScript: JavaScript 14.16.1 o superior [Node](https://nodejs.org/es/).

• IDE utilizada: Visual Studio Code 1.56.0

• Espacio en memoria: 500 MB como mínimo


Diccionario de Clases 📖
-----------------------
Clase |  Definición 
------------ | -------------
`parser` | Es el encargado de ejecutar todo el código que se ha ingresado, funciona recursivamente.

Diccionario de Funciones 📦
-----------------------

### Funciones Principales ###

Función |  Definición 
------------ | -------------
`Ambito` | Contiene consigo la tabla de símbolos correspondientes al ámbito en el cual se esta trabajando así como a su entorno anterior, como tambien contiene la tabla de metodos y tabla de funciones
`Bloque` | Manda a llamar a los distintos métodos para realizar todas las funciones del programa
`nuevoSimbolo` | Genera los nodos que identifican a los valores durante el programa.
`nuevoMetodo` | Genera los nodos que identifican a los metodos durante el programa.
`nuevoFuncion` | Genera los nodos que identifican a las funciones durante el programa.
`NuevaOperacion` | Genera nodos que contienen 2 operandos y un tipo de operación para su ejecución
`NuevaOperacionUnario` | Genera específicamente el nodo de la negación unaria
`Operacion` | Realiza todas las operaciones especificadas durante la lectura del código.
`Declaracion` | Esta función permite la creación de nuevas variables así como los métodos, listas y vectores.
`Asignacion` | Asigna un nuevo valor a una variable la cual debió de ser creada con anterioridad.
`SentenciaIf` | Esta función permite la ejecución de la condición `if`.
`SentenciaSwitch` | Esta función permite la ejecución de la condición `switch`.
`SentenciaWhile` | Esta función permite la ejecución del ciclo `while`.
`SentenciaFor` | Esta función permite la ejecución del ciclo `for`.
`Do-While` | Esta función permite la ejecución del ciclo `do-while`.
`Exec` | Permite la ejecucion de funciones dentro del código.
`Exec` | Accede a las funciones o métodos del código.
`Casteos` | Realiza los casteos correspondientes a cada caso.


### Funciones Secundarias  ###

Función |  Definición 
------------ | -------------
`Print` | Imprime todas las instrucciones dentro de los parentesis en consola.
`ToString` | Convierte el texto a una cadena de texto 
`ToUpper` | Convierte el texto a mayusculas. 
`ToLower` | Convierte el texto en minusculas
`Round` | Redondea un decimal 
`Truncate` | Trunca los decimales 
`Break` | Rompe el ciclo
`Continue` | Continua con la ejecucion saltando una iteracion 
`Return` | Retorna un valor de una funcion

```
Universidad San Carlos de Guatelama 2021
Programador: Byron Estuardo Caal Catún
Carné: 201901907
```
