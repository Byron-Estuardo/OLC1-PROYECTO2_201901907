const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Tipos/TipoDato");
const TIPO_VALOR = require("../Tipos/TipoValor");

function ValorExpresion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.ENTERO){
        return {
            valor: parseInt(_expresion.valor),
            tipo: TIPO_DATO.ENTERO,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.DECIMAL){
        return {
            valor: parseFloat(_expresion.valor),
            tipo: TIPO_DATO.DECIMAL,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.BANDERA){
        return {
            valor: _expresion.valor.toLowerCase()==='true' ? true: false,
            tipo: TIPO_DATO.BANDERA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.CADENA){
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length-1),
            tipo: TIPO_DATO.CADENA,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.CARACTER){
        
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length-1),
            tipo: TIPO_DATO.CARACTER,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        const simbolo = _ambito.getSimbolo(_expresion.valor)
        if(simbolo!=null){
            return {
                valor: simbolo.valor,
                tipo: simbolo.tipo,
                linea: simbolo.linea,
                columna: simbolo.columna
            }
        }
        return {
            valor: "Error: la variable '"+_expresion.valor+"' no existe... Linea: "+_expresion.linea+" Columna: "+_expresion.columna,
            tipo: null,
            linea: _expresion.linea,
            columna: _expresion.columna
        }

    }

}

module.exports = ValorExpresion