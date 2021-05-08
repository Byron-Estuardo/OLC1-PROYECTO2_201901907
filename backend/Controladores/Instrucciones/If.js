const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIf(_instruccion, _ambito){
    var mensaje = ""
    var envio = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var hayBreak = false
    var hayContinue = false
    var hayReturn = false
    if(operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor == true){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesv,nuevoAmbito)
            mensaje += ejec.cadena
            hayBreak = ejec.hayBreak;
            hayContinue = ejec.hayContinue;
            hayReturn = ejec.hayReturn;
            
            if(hayBreak){
                return {
                    hayBreak: hayBreak,
                    cadena: mensaje
                }
            }
            else if(hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito);
                return {
                    hayContinue: hayContinue,
                    cadena: mensaje
                }
            }
            else if(hayReturn){
                if(ejec.respuesta){
                    envio = ejec.respuesta
                    return {
                        hayReturn: false,
                        respuesta: envio,
                        cadena: mensaje
                    }
                }
                else{
                    return
                }
            }
        }
        if(_instruccion.instruccionesf != null && operacion.valor == false){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque")
            var ejec = Bloque(_instruccion.instruccionesf,nuevoAmbito)
            hayBreak = ejec.hayBreak;
            hayContinue = ejec.hayContinue;
            hayReturn = ejec.hayReturn;
            mensaje += ejec.cadena
            console.log("else")
            if(hayBreak){
                return {
                    hayBreak: hayBreak,
                    cadena: mensaje
                }
            }
            else if(hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito);
                return {
                    hayContinue: hayContinue,
                    cadena: mensaje
                }
            }
            else if(hayReturn){
                if(ejec.respuesta){
                    envio = ejec.respuesta
                    return {
                        hayReturn: false,
                        respuesta: envio,
                        cadena: mensaje
                    }
                }
                else{
                    return
                }
            }
        }
        console.log("Salio al general")
        return{
            respuesta: envio,
            hayReturn: hayReturn,
            hayBreak: hayBreak,
            hayContinue: hayContinue,
            cadena: mensaje
        } 
    } 
    return{
        hayBreak: hayBreak,
        hayContinue: hayContinue,
        respuesta: envio,
        hayReturn: hayReturn,
        cadena: `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    } 
}
 
module.exports = SentenciaIf



/*

const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIf(_instruccion, _ambito){
    //console.log(_instruccion)
    var mensaje = ""
    var respuesta = ""
    //console.log("PASO")
    var operacion = Operacion(_instruccion.expresion, _ambito);
    //console.log("PASO")
    var hayBreak = false
    var hayContinue = false
    var hayReturn = false
    //console.log(operacion)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor == true){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesv,nuevoAmbito)
            mensaje += ejec.cadena
            hayBreak = ejec.hayBreak;
            hayContinue = ejec.hayContinue;
            if(hayBreak){
                return {
                    hayBreak: hayBreak,
                    cadena: mensaje
                }
            }
            else if(hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito);
                return {
                    hayContinue: hayContinue,
                    cadena: mensaje
                }
            }
            else if(hayReturn){
                if(ejec.respuesta){
                    console.log("RETURN")
                    console.log(ejec)
                    return {
                        hayReturn: ejec.hayReturn,
                        respuesta: ejec.respuesta,
                        cadena: mensaje
                    }
                }
                else{
                    return
                }
            }
        }
        if(_instruccion.instruccionesf != null && operacion.valor == false){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque")
            var ejec = Bloque(_instruccion.instruccionesf,nuevoAmbito)
            hayBreak = ejec.hayBreak;
            hayContinue = ejec.hayContinue;
            mensaje += ejec.cadena
            if(hayBreak){
                return {
                    hayBreak: hayBreak,
                    cadena: mensaje
                }
            }
            else if(hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito);
                return {
                    hayContinue: hayContinue,
                    cadena: mensaje
                }
            }
            else if(hayReturn){
                if(ejec.respuesta){
                    console.log("RETURN")
                    console.log(ejec)
                    return {
                        hayReturn: ejec.hayReturn,
                        respuesta: ejec.respuesta,
                        cadena: mensaje
                    }
                }
                else{
                    return
                }
            }
        }
        return{
            respuesta: respuesta,
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
        cadena: `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    } 
}
 
module.exports = SentenciaIf

*/