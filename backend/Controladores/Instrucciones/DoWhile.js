const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Tipos/TipoDato")
const Operacion = require("../Operacion/Operacion")


function DoWhile(_instruccion, _ambito){
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
            if(hayBreak){
                return mensaje
            }
            else if(hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito)
                //console.log("OPERACION")
                //console.log(operacion)
                
                continue
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
                if(hayBreak){
                    return mensaje
                }
                else if(hayContinue){
                    operacion = Operacion(_instruccion.expresion, _ambito)
                    continue
                }
                operacion = Operacion(_instruccion.expresion, _ambito)
            }
            return mensaje
        }
        return `Error: No es una condicion válida para el do while... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}` 
    }
    
}

module.exports = DoWhile