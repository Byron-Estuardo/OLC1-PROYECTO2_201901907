const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Tipos/TipoDato")
const Operacion = require("../Operacion/Operacion")
 

function DoWhile(_instruccion, _ambito){
    var envio = ""
    var mensaje = ""
    var hayBreak = false
    var hayContinue = false
    var operacion = Operacion(_instruccion.expresion, _ambito)
    //console.log(_instruccion)
    while(true){
        if(operacion.tipo === TIPO_DATO.BANDERA){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec = Bloque(_instruccion.instruccion, nuevoAmbito)
            mensaje += ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            hayReturn = ejec.hayReturn
            if(hayBreak){
                return{
                    hayBreak: hayBreak,
                    cadena: mensaje
                }
            }
            else if(hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito)
                //console.log("OPERACION")
                //console.log(operacion)
                
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
            //return mensaje
            while(operacion.valor){
                operacion = Operacion(_instruccion.expresion, _ambito)
                //console.log("entra?")
                hayBreak = false
                hayContinue = false
                ejec = Bloque(_instruccion.instruccion, nuevoAmbito)
                mensaje += ejec.cadena
                hayBreak = ejec.hayBreak
                hayContinue = ejec.hayContinue
                hayReturn = ejec.hayReturn
                if(hayBreak){
                    return{
                        hayBreak: hayBreak,
                        cadena: mensaje
                    }
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
            cadena: `Error: No es una condicion válida para el do while... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}` 
        }
    }
    
}

module.exports = DoWhile