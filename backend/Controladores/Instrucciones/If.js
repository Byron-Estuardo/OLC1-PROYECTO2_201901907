const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIf(_instruccion, _ambito){
    console.log(_instruccion)
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    var hayBreak = false
    var hayContinue = false
    var hayReturn = false
    console.log(operacion)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor == true){
            var nuevoAmbito = new Ambito(_ambito)
            //const Bloque = require("./Bloque");
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
                    return {
                        hayReturn: hayReturn,
                        cadena: ejec.respuesta.valor
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
                    return {
                        hayReturn: hayReturn,
                        cadena: ejec.respuesta.valor
                    }
                }
                else{
                    return
                }
            }
        }
        return{
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