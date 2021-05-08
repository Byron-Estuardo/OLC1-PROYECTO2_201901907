const Operacion = require("../Operacion/Operacion")
const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_VALOR = require("../Tipos/TipoValor")

function Retorno(_instruccion, _ambito){
    var valorw = Operacion(_instruccion.expresion, _ambito)
    if (valorw != null){
        if(valorw.tipo === TIPO_DATO.ENTERO){
            return {
                valor: parseInt(valorw.valor),
                tipo: TIPO_DATO.ENTERO,
                linea: valorw.linea,
                columna: valorw.columna
            }
        }
        else if(valorw.tipo === TIPO_DATO.DECIMAL){
            return {
                valor: parseFloat(valorw.valor),
                tipo: TIPO_DATO.DECIMAL,
                linea: valorw.linea,
                columna: valorw.columna
            }
        }
        else if(valorw.tipo === TIPO_VALOR.BANDERA){
            return {
                valor: valorw.valor.toLowerCase()==='true' ? true: false,
                tipo: TIPO_DATO.BANDERA,
                linea: valorw.linea,
                columna: valorw.columna
            }
        }
        else if(valorw.tipo === TIPO_DATO.CADENA){
            return {
                valor: valorw.valor.substring(1, valorw.valor.length-1),
                tipo: TIPO_DATO.CADENA,
                linea: valorw.linea,
                columna: valorw.columna
            }
        }
        else if(valorw.tipo === TIPO_DATO.CARACTER){
            return {
                valor: valorw.valor.substring(1, valorw.valor.length-1),
                tipo: TIPO_DATO.CARACTER,
                linea: valorw.linea,
                columna: valorw.columna
            }
        }
        else if(valorw.tipo === TIPO_VALOR.IDENTIFICADOR){
            const simbolo = _ambito.getSimbolo(valorw.valor)
            if(simbolo!=null){
                //console.log(_ambito)
                //console.log(simbolo)
                return {
                    valor: simbolo.valor,
                    tipo: simbolo.tipo,
                    linea: simbolo.linea,
                    columna: simbolo.columna
                }
            }
            return {
                valor: "Error: la variable '"+valorw.valor+"' no existe... Linea: "+valorw.linea+" Columna: "+valorw.valor.columna,
                tipo: null,
                linea: valorw.linea,
                columna: valorw.valor.columna
            }
    
        }
    }
    else{
        return null
    }
}

module.exports = Retorno

