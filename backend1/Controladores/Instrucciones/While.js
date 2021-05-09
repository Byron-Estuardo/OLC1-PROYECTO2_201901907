const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Tipos/TipoDato")
const Operacion = require("../Operacion/Operacion")
 
function CicloWhile(_instruccion, _ambito){
    var envio  = ""
    var mensaje = ""
    var hayBreak = false
    var hayContinue = false
    var hayReturn = false
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            hayReturn = ejec.hayReturn;
            if(hayBreak){
                break
            }
            else if(hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito)
                continue
            }
            else if(hayReturn){
                if(ejec.respuesta){
                    envio = ejec.respuesta
                    return {
                        hayReturn: hayReturn,
                        respuesta: envio,
                        cadena: mensaje
                    }
                }
                else{
                    return
                }
            }
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return{
            respuesta: envio,
            hayReturn: hayReturn,
            hayBreak: hayBreak,
            hayContinue: hayContinue,
            cadena: mensaje
        }
    }
    return{
        respuesta: envio,
        hayReturn: hayReturn,
        hayBreak: hayBreak,
        hayContinue: hayContinue,
        cadena: `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}

module.exports = CicloWhile
