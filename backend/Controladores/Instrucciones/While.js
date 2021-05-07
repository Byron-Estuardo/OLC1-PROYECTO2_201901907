const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Tipos/TipoDato")
const Operacion = require("../Operacion/Operacion")

function CicloWhile(_instruccion, _ambito){
    var mensaje = ""
    var hayBreak = false
    var hayContinue = false
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            if(hayBreak){
                break
            }
            else if(hayContinue){
                operacion = Operacion(_instruccion.expresion, _ambito)
                continue
            }
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return mensaje
    }
    return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = CicloWhile
/*
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
            //actualizamos
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return{
            hayBreak: hayBreak,
            hayContinue: hayContinue,
            cadena: mensaje
        } 
        
    }
    return{
        hayBreak: hayBreak,
        hayContinue: hayContinue,
        cadena: `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    } 
    
}

module.exports = CicloWhile*/