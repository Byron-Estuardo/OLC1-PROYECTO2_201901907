const TIPO_DATO = require("../Tipos/TipoDato");

//Funciones Aritmeticas

function TipoResultadoSuma(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO)                                                      return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.BANDERA)                                               return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CARACTER)                                              return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CADENA)                                                return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.BANDERA)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CARACTER)                                             return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CADENA)                                               return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.ENTERO)                                               return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.DECIMAL)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.CADENA)                                               return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.ENTERO)                                              return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DECIMAL)                                             return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CARACTER)                                            return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.CADENA)                                              return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.ENTERO)                                                return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.DECIMAL)                                               return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.BANDERA)                                               return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.CARACTER)                                              return TIPO_DATO.CADENA
    else if (_tipo1 === TIPO_DATO.CADENA && _tipo2 === TIPO_DATO.CADENA)                                                return TIPO_DATO.CADENA
    return null
}
function TipoResultadoResta(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO)                                                      return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.BANDERA)                                               return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CARACTER)                                              return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.BANDERA)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CARACTER)                                             return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.ENTERO)                                               return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.BANDERA && _tipo2 === TIPO_DATO.DECIMAL)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.ENTERO)                                              return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DECIMAL)                                             return TIPO_DATO.DECIMAL
    return null
}
function TipoResultadoMulti(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO)                                                      return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CARACTER)                                              return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CARACTER)                                             return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.ENTERO)                                              return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DECIMAL)                                             return TIPO_DATO.DECIMAL
    return null
}
function TipoResultadoDiv(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === 0)                                                                     return undefined
    else if(_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === 0)                                                               return undefined
    else if(_tipo1 === TIPO_DATO.CARACTER && _tipo2 === 0)                                                              return undefined
    else if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO)                                                 return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.CARACTER)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.CARACTER)                                             return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.ENTERO)                                              return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.CARACTER && _tipo2 === TIPO_DATO.DECIMAL)                                             return TIPO_DATO.DECIMAL
    return null
}
function TipoResultadoPot(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO)                                                      return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL)                                              return TIPO_DATO.DECIMAL
    return null
}
function TipoResultadoMod(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.ENTERO)                                                      return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.ENTERO && _tipo2 === TIPO_DATO.DECIMAL)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.ENTERO)                                               return TIPO_DATO.DECIMAL
    else if (_tipo1 === TIPO_DATO.DECIMAL && _tipo2 === TIPO_DATO.DECIMAL)                                              return TIPO_DATO.DECIMAL
    return null
}
function TipoResultadoNegacion(_tipo1){
    if(_tipo1 === TIPO_DATO.ENTERO)                                                                                     return TIPO_DATO.ENTERO
    else if (_tipo1 === TIPO_DATO.DECIMAL)                                                                              return TIPO_DATO.DECIMAL
    return null
}

module.exports = TipoResultadoSuma
module.exports = TipoResultadoResta
module.exports = TipoResultadoMulti
module.exports = TipoResultadoDiv
module.exports = TipoResultadoPot
module.exports = TipoResultadoMod
module.exports = TipoResultadoNegacion