const Operacion = require("./Operacion")

function procesarCadena(_expresion, _ambito){
    //console.log("Operacion :  ")
    //console.log(Operacion(_expresion, _ambito))
    return Operacion(_expresion, _ambito)
}

module.exports = procesarCadena