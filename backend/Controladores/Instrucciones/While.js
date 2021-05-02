const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Tipos/TipoDato")
const Operacion = require("../Operacion/Operacion")

function CicloWhile(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejec.cadena
            if(ejec.hayBreak){
                return mensaje
            }
            else if(ejec.hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito)
                return mensaje
            }
            else if(ejec.hayReturn){
                console.log("entro al return")
                console.log("Prueba mensaje")
                console.log(mensaje)
                if(ejec.respuesta != null){
                    console.log("respuesta no nula")
                    return ejec.respuesta
                }
                else{
                    console.log("respuesta  nula")
                    return mensaje
                }
            }
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return mensaje
    }
    return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = CicloWhile