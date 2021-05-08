const Funcion = require("../Ambito/Funcion")

function DecFuncion(_instruccion, _ambito){
    //console.log(_instruccion)
    const nuevoFuncion = new Funcion(_instruccion.id, _instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna)
    //verificamos si el nombre ya existe como simbolo
    if(_ambito.existeSimbolo(nuevoFuncion.id)!=false){
        return `Error: No se puede declarar un metodo con el mismo nombre \n de una variable '${nuevoFuncion.id}'... Linea: ${nuevoFuncion.linea} Columna: ${nuevoFuncion.columna}`
    }
    //verificamos si el funcion ya existe
    else if(_ambito.existeFuncion(nuevoFuncion.id)!=false){
        return `Error: la Funcion '${nuevoFuncion.id}' ya existe... Linea: ${nuevoFuncion.linea} Columna: ${nuevoFuncion.columna}`
    }
    //de lo contrario vamos a guardarlo
    _ambito.addFuncion(nuevoFuncion.id, nuevoFuncion)
    //console.log("FUNCION: ")
    //console.log(_ambito)
    return null
}
 
module.exports = DecFuncion 