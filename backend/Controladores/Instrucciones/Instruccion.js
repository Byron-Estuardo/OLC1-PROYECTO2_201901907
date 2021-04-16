const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion")
function nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna){
    return{
        opIzq:      _opIzq,
        opDer:      _opDer,
        tipo:       _tipo,
        linea:      _linea,
        columna:    _columna
    }
}

const Instruccion = {
    nuevoPrint: function(_expresion, _linea, _columna){
        return {
            tipo:       TIPO_INSTRUCCION.IMPRIMIR,
            expresion:  _expresion,
            linea:      _linea,
            columna:    _columna
        }
    },
    nuevoValor: function(_valor, _tipo, _linea, _columna){
        return{
            tipo:       _tipo,
            valor:      _valor,
            linea:      _linea,
            columna:    _columna
        }
    },
    nuevaOperacionBinaria: function(_opIzq, _opDer, _tipo, _linea, _columna){
        return nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna)
    },
    nuevaOperacionUnaria: function(_tipo, _opIzq){
        return nuevaOperacion(_operando, undefined, _tipo, _linea, _columna);
    },
    nuevaDeclaracion: function(_id, _valor, _tipo, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaAsignacion: function(_id, _expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.WHILEE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIf: function(_expresion, _instruccion){
        return {
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            Instruccion: _instruccion
        }
    },
    nuevoIfElse: function(_expresionLogica, _instruccionesIfVerdadero, _instruccionesIfFalso) {
		return {
			tipo: TIPO_INSTRUCCION.IF_ELSE,
			expresionLogica: _expresionLogica,
			instruccionesIfVerdadero: _instruccionesIfVerdadero,
			instruccionesIfFalso: _instruccionesIfFalso
		}
	}
}

module.exports = Instruccion