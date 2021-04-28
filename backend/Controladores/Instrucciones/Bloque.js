const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Print = require("./Print");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./While");
const SentenciaIf = require("./If");
const Exec = require("./Exec");
const SentenciaWhile = require("./Switch")

function Bloque(_instrucciones, _ambito){
    var cadena = ""
    _instrucciones.forEach(instruccion => {
        console.log(instruccion.tipo)
        if(instruccion.tipo === TIPO_INSTRUCCION.IMPRIMIR){
            cadena+=Print(instruccion, _ambito)+'\n'
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            var mensaje = Declaracion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var mensaje = CicloWhile(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            var mensaje = Exec(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            console.log("entro if?")
            var mensaje = SentenciaIf(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            console.log("entro switch?")
            var mensaje = SentenciaWhile(instruccion, _ambito)
            console.log("Switch"+mensaje)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
    });
    return cadena
}

module.exports = Bloque