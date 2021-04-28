const TIPO_DATO = require("../Tipos/TipoDato");

function TipoResultadoNegacion(_tipo1){
    if(_tipo1 === TIPO_DATO.ENTERO)                                                                                     {return TIPO_DATO.ENTERO}
    else if (_tipo1 === TIPO_DATO.DECIMAL)                                                                              {return TIPO_DATO.DECIMAL}
    else                                                                                                                {return null}
}

module.exports = TipoResultadoNegacion