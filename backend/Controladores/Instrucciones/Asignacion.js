const Operacion = require("../Operacion/Operacion");
const TIPO_DATO = require("../Tipos/TipoDato");

function Asignacion(_instruccion, _ambito){
    //console.log("ASIGNACION: ")
    //console.log(_instruccion)
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var valor = Operacion(_instruccion.expresion, _ambito)
        var simbolo = _ambito.getSimbolo(id)
        var tipos = {
            tipoSimbolo: simbolo.tipo,
            tipoNuevoValor: valor.tipo
        }
        if(tipos.tipoSimbolo===tipos.tipoNuevoValor){
            simbolo.valor = valor.valor
            _ambito.actualizar(id,simbolo)
            return null
        }else if(tipos.tipoSimbolo=== TIPO_DATO.DECIMAL && tipos.tipoNuevoValor=== TIPO_DATO.ENTERO || tipos.tipoNuevoValor=== TIPO_DATO.DECIMAL && tipos.tipoSimbolo=== TIPO_DATO.ENTERO){
            simbolo.valor = valor.valor
            _ambito.actualizar(id,simbolo)
            return null
        }
        return "Error: No es posible asignar un valor de tipo "+tipos.tipoNuevoValor+" a la variable \n'"+ id +"' que es de tipo "+tipos.tipoSimbolo+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
    }
    return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Asignacion