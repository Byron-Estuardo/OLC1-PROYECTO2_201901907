const procesarCadena = require("../Operacion/procesarCadena") //Count == print

function Print(_instruccion, _ambito){
    const cadena = procesarCadena(_instruccion.expresion, _ambito).valor
    console.log("return print")
    console.log(cadena)
    return cadena
}

module.exports = Print