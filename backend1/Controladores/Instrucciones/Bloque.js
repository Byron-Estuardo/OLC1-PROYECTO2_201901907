const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Print = require("./Print");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./While");
const SentenciaIf = require("./If");
const SentenciaIncremento = require("./Incremento");
const SentenciaDecremento = require("./Decremento");
const Sentenciafor = require("./for");
const DoWhile = require("./DoWhile");
const Ambito = require("../Ambito/Ambito");
const Retorno = require("./Return");
const SentenciaSwitch = require("./Switch");

function Bloque(_instrucciones, _ambito){
    var respuesta = ""
    var cadena = ""
    var hayBreak = false;
    var hayContinue = false;
    var hayReturn = false;
    _instrucciones.forEach(instruccion => {
        if(hayBreak){
            return{
                hayBreak: hayBreak,
                cadena: cadena
            }
        }
        if(hayContinue){
            return{
                hayContinue: hayContinue,
                cadena: cadena
            }
        }
        if(hayReturn){
            return{
                respuesta: respuesta,
                hayReturn: hayReturn,
                cadena: cadena
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IMPRIMIR){
            var mensaje = Print(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje + '\n'
            }
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
        else if(instruccion.tipo === TIPO_INSTRUCCION.INCREMENTO){
            var mensaje = SentenciaIncremento(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje + '\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECREMENTO){
            var mensaje = SentenciaDecremento(instruccion, _ambito)
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
            var ejec = CicloWhile(instruccion, _ambito)
            hayBreak = false
            hayContinue = false
            hayReturn = false
            var mensaje = ejec.cadena
            respuesta = ejec.respuesta
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
            var ejec = SentenciaIf(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            hayReturn = ejec.hayReturn
            respuesta = ejec.respuesta
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
            var ejec = DoWhile(instruccion, _ambito)
            hayBreak = false
            hayContinue = false
            hayReturn = false
            var mensaje = ejec.cadena
            respuesta = ejec.respuesta
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
            var ejec = SentenciaSwitch(instruccion, _ambito)
            var mensaje = ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            hayReturn = ejec.hayReturn
            respuesta = ejec.respuesta
            if(mensaje!=null){
                cadena+=mensaje
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
            var ejec = Sentenciafor(instruccion, _ambito)
            hayBreak = false
            hayContinue = false
            hayReturn = false
            var mensaje = ejec.cadena
            respuesta = ejec.respuesta
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
                hayContinue: hayContinue,
                cadena: cadena
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            hayReturn = true
            var ejec = Retorno(instruccion, _ambito)
            respuesta = ejec
            return {
                respuesta: respuesta,
                hayReturn: hayReturn
            }
        }
    });
    return{
        respuesta: respuesta,
        hayBreak: hayBreak,
        hayReturn: hayReturn,
        hayContinue: hayContinue,
        cadena: cadena
    } 
    
}

module.exports = Bloque