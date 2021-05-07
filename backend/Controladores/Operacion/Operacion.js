const TIPO_OPERACION = require("../Tipos/TipoOperacion");
const TIPO_VALOR = require("../Tipos/TipoValor");
const Aritmetica = require("./Aritmetica");
const Logica = require("./Logica");
const Relacional = require("./Relacional");
const ValorExpresion = require("./ValorExpresion");
const Casteoss = require("./Casteos");
const Ternar = require("./Ternario");

function Operacion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL  || _expresion.tipo === TIPO_VALOR.ENTERO || 
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.BANDERA ||
       _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || 
            _expresion.tipo === TIPO_OPERACION.MULTIPLICACION || _expresion.tipo === TIPO_OPERACION.DIVISION || 
            _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.NEGATIVO ||
            _expresion.tipo === TIPO_OPERACION.MODULO){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
            _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
            _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND ||
            _expresion.tipo === TIPO_OPERACION.NOT){
        return Logica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.CASTEO || _expresion.tipo === TIPO_OPERACION.LOWER ||
        _expresion.tipo === TIPO_OPERACION.UPPER || _expresion.tipo === TIPO_OPERACION.TSTRING || 
        _expresion.tipo === TIPO_OPERACION.TYPEOF || _expresion.tipo === TIPO_OPERACION.ROUND ||
        _expresion.tipo === TIPO_OPERACION.TRUNCATE || _expresion.tipo === TIPO_OPERACION.LENGTH){
        return Casteoss(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TERNARIO){
        return Ternar(_expresion, _ambito)
    }
}


module.exports = Operacion