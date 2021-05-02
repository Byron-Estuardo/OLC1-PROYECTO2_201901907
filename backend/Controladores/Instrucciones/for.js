const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");
const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion");
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");
const SentenciaIncremento = require("./Incremento");
const SentenciaDecremento = require("./Decremento");

function Sentenciafor(_instruccion, _ambito){
    var mensaje = ""
    if(_instruccion.variable.tipo === TIPO_INSTRUCCION.DECLARACION){
        Declaracion(_instruccion.variable, _ambito)
    }
    else if(_instruccion.variable.tipo === TIPO_INSTRUCCION.ASIGNACION){
        Asignacion(_instruccion.variable, _ambito)
    }
    var hasta = Operacion(_instruccion.expresion, _ambito)
    if( !(hasta.tipo == TIPO_DATO.BANDERA)){
        console.log("Error: Se esperaban valores numericos en el for");
        return `Error: Se esperaban valores numericos en el for`;
    }
    while(hasta.valor){
        hasta = Operacion(_instruccion.expresion, _ambito)
        if(hasta.valor == true){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje+=Bloque(_instruccion.instrucciones, nuevoAmbito)
            Operacion(_instruccion.expresion, _ambito)
            if(_instruccion.aumento.tipo == TIPO_INSTRUCCION.INCREMENTO){
                SentenciaIncremento(_instruccion.aumento, _ambito)
            }
            else if(_instruccion.aumento.tipo == TIPO_INSTRUCCION.DECREMENTO){
                SentenciaDecremento(_instruccion.aumento, _ambito)
            }
            else if(_instruccion.aumento.tipo == TIPO_INSTRUCCION.ASIGNACION){
                Asignacion(_instruccion.aumento, _ambito)
            }
        }
    }
    return mensaje
}
 
module.exports = Sentenciafor