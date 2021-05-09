const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");
const Instruccion = require("./Instruccion");
const TIPO_OPERACION = require("../Tipos/TipoOperacion");
 
function SentenciaSwitch(_instruccion, _ambito){
    var envio = ""
    var mensaje = ""
    var ejecutado = false;
    var hayBreak = false
    var hayContinue = false
    var hayReturn = false;
    for(var elemento of _instruccion.casos){
        const rest = Operacion(Instruccion.nuevaOperacionBinaria(_instruccion.expresion, elemento.expresion, TIPO_OPERACION.IGUALIGUAL), _ambito)
        if(rest.tipo == TIPO_DATO.BANDERA){
            if (rest.valor || ejecutado){
                ejecutado = true;
                var nuevoAmbito = new Ambito(_ambito)
                const Bloque = require('./Bloque')
                var ejec = Bloque(elemento.instrucciones, nuevoAmbito)
                mensaje += ejec.cadena
                hayBreak = ejec.hayBreak;
                hayContinue = ejec.hayContinue;
                hayReturn = ejec.hayReturn
                if(hayBreak){
                    return{
                        hayBreak: false,
                        cadena: mensaje
                    }
                }
                else if(hayContinue){
                    return{
                        hayContinue: false,
                        cadena: mensaje
                    }
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
                mensaje+=Bloque(elemento.instrucciones, nuevoAmbito)
                if (ejec.cadena != ""){
                    return{
                        hayBreak: hayBreak,
                        hayContinue: hayContinue,
                        cadena: mensaje
                    }
                }
                else{
                    return
                } 
            }
            
        }
        else{
            return
        }
    }
    if (_instruccion.bloqueSw && !ejecutado){
        var nuevoAmbito = new Ambito(_ambito)
        const Bloque = require('./Bloque')
        var ejec = Bloque(elemento.instrucciones, nuevoAmbito)
        mensaje += ejec.cadena
        hayBreak = ejec.hayBreak;
        hayContinue = ejec.hayContinue;
        hayReturn = ejec.hayReturn;
        if(hayBreak){
            return{
                hayBreak: false,
                cadena: mensaje
            }
        }
        else if(hayContinue){
            return{
                hayContinue: false,
                cadena: mensaje
            }
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
        return{
            respuesta: envio,
            hayReturn: hayReturn,
            hayBreak: hayBreak,
            hayContinue: hayContinue,
            cadena: mensaje
        }
    }
    return{
        hayReturn: hayReturn,
        hayBreak: hayBreak,
        hayContinue: hayContinue,
        respuesta: envio,
        cadena: `Error: No es una condicion válida para el switch... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    } 
    
}

module.exports = SentenciaSwitch
