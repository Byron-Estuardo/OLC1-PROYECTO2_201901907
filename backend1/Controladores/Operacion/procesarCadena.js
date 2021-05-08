const Operacion = require("./Operacion")

function procesarCadena(_expresion, _ambito){
    console.log("return procesar cadena")
    //console.log(Operacion(_expresion, _ambito))
    return Operacion(_expresion, _ambito)
}

module.exports = procesarCadena