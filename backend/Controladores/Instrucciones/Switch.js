const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");
const TIPO_OPCION_SWITCH = require("../Tipos/TipoInstruccion");

function SentenciaSwitch(_instruccion, _ambito){
    var mensaje = ""
    var evaluar = true
    var operacion = Operacion(_instruccion.expresion, _ambito);
    console.log(operacion)
    _instruccion.casos.forEach(caso => {
        console.log(caso)
        if(caso.tipo == TIPO_OPCION_SWITCH.CASO){
            const rest = Operacion(caso.instrucciones, _ambito)
            if(rest == operacion){
                var nuevoAmbito = new Ambito(_ambito)
                const Bloque = require("./Bloque");
                mensaje += Bloque(caso.instrucciones ,nuevoAmbito)
                evaluar = false
            }
        } 
        else {
            if (evaluar){
                var nuevoAmbito = new Ambito(_ambito)
                const Bloque = require("./Bloque");
                mensaje += Bloque(caso.instrucciones ,nuevoAmbito)
            }
        }
        return mensaje
        
    });
    return `Error: No es una condicion válida para el switch... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = SentenciaSwitch