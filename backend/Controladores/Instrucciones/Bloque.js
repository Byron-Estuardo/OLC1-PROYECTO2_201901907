const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Print = require("./Print");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./While");
const SentenciaIf = require("./If");
const SentenciaIncremento = require("./Incremento");
const SentenciaDecremento = require("./Decremento");
const SentenciaWhile = require("./Switch");
const Sentenciafor = require("./for");
const Ambito = require("../Ambito/Ambito");
const Retorno = require("./Return");

function Bloque(_instrucciones, _ambito){
    var respuesta = ""
    var cadena = ""
    var hayBreak = false;
    var hayContinue = false;
    var hayReturn = false;
    _instrucciones.forEach(instruccion => {
        //console.log(instruccion.tipo)
        if(instruccion.tipo === TIPO_INSTRUCCION.IMPRIMIR){
            console.log("Print")
            var mensaje = Print(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje + '\n'
            }
            //cadena+=Print(instruccion, _ambito)+'\n'
            console.log("print salida: "+cadena)
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
            console.log("Declaracion")
            var mensaje = Declaracion(instruccion, _ambito)
            console.log("declaracion salida: "+mensaje)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            console.log("Asignacion")
            var mensaje = Asignacion(instruccion, _ambito)
            console.log("asignacion salida: "+mensaje)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.INCREMENTO){
            console.log("entro incremento")
            var mensaje = SentenciaIncremento(instruccion, _ambito)
            console.log("incremento salida: "+mensaje)
            if(mensaje!=null){
                cadena+=mensaje + '\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECREMENTO){
            console.log("entro decremento")
            var mensaje = SentenciaDecremento(instruccion, _ambito)
            console.log("decremento salida: "+mensaje)
            if(mensaje!=null){
                cadena+=mensaje + '\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
            const Exec = require("./Exec");
            var mensaje = Exec(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            console.log("entro while")
            var mensaje = CicloWhile(instruccion, _ambito)
            console.log("while salida: "+mensaje)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            console.log("entro if")
            var mensaje = SentenciaIf(instruccion, _ambito)
            console.log("if salida: "+mensaje)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            console.log("entro switch")
            var mensaje = SentenciaWhile(instruccion, _ambito)
            console.log("Switch salida: "+mensaje)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            console.log("entro for")
            var mensaje = Sentenciafor(instruccion, _ambito)
            console.log("For salida: "+mensaje)
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK){
            hayBreak = true
            return {
                hayBreak: hayBreak,
                cadena: cadena
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE){
            hayContinue = true
            return {
                hayBreak: hayBreak,
                cadena: cadena
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            hayReturn = true
            respuesta = Retorno(instruccion, _ambito)
            console.log("Respuesta prro")
            console.log(respuesta)
            return {
                respuesta: respuesta,
                hayReturn: hayReturn,
                cadena: cadena
            }
        }
    });
    console.log("salida final: "+cadena + hayBreak + hayContinue + hayReturn)
    return{
        respuesta: respuesta,
        hayBreak: hayBreak,
        hayReturn: hayReturn,
        hayContinue: hayContinue,
        cadena: cadena
    } 
    
}

module.exports = Bloque