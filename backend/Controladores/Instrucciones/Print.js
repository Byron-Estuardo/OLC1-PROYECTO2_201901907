const procesarCadena = require("../Operacion/procesarCadena") //Count == print

function Cout(_instruccion, _ambito){
    const cadena = procesarCadena(_instruccion.expresion, _ambito).valor
    return cadena
}

module.exports = Cout