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
    nuevaOperacionUnaria: function(_opIzq, _tipo,_linea, _columna){
        console.log(" NuevaOperacionUnaria " + _opIzq + " " + _opIzq.tipo + " " + _opIzq.valor + " " + _tipo,_linea + " " + _columna)
        return nuevaOperacion(_opIzq, undefined, _tipo, _linea, _columna);
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
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIf: function(_expresion, _instruccionesv, _instruccionesf, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.IF,
			expresion: _expresion,
			instruccionesv: _instruccionesv,
			instruccionesf: _instruccionesf,
            linea: _linea,
            columna: _columna
		}
	},
    nuevoPara: function (_variable, _valorVariable, _expresion, _aumento, _instrucciones) {
		return {
			tipo: TIPO_INSTRUCCION.PARA,
			expresion: _expresion,
			instrucciones: _instrucciones,
			aumento: _aumento,
			variable: _variable,
			valorVariable: _valorVariable
		}
	},
    nuevoSwitch: function(_expresion, _casos, _bloqueSw, _linea, _columna) {
		return {
			tipo: TIPO_INSTRUCCION.SWITCH,
			expresion: _expresion,
			casos: _casos,
            bloqueSw: _bloqueSw,
            linea: _linea,
            columna: _columna
		}
	},
	nuevoCaso: function(_expresion, _instrucciones, _linea, _columna) {
		return {
			expresion: _expresion,
			instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
		}
	},
    nuevoMetodo: function(_nombre, _lista_parametros, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DEC_METODO,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoExec: function(_nombre, _lista_valores, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.EXEC,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaLlamada: function(_nombre, _lista_valores, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.LLAMADA_METODO,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    }

}

module.exports = Instruccion