const procesarCadena = require("../Operacion/procesarCadena") //Count == print

function Print(_instruccion, _ambito){
    const cadena = procesarCadena(_instruccion.expresion, _ambito).valor
    return cadena
}

module.exports = Print