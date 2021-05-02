const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");
const Instruccion = require("../Instrucciones/Instruccion");
const TIPO_OPERACION = require("../Tipos/TipoOperacion");

function SentenciaSwitch(_instruccion, _ambito){
    var mensaje = ""
    var ejecutado = false;
    for(var elemento of _instruccion.casos){
        const rest = Operacion(Instruccion.nuevaOperacionBinaria(_instruccion.expresion, elemento.expresion, TIPO_OPERACION.IGUALIGUAL), _ambito)
        if(rest.tipo == TIPO_DATO.BANDERA){
            if (rest.valor || ejecutado){
                ejecutado = true;
                var nuevoAmbito = new Ambito(_ambito)
                const Bloque = require('./Bloque')
                mensaje+=Bloque(elemento.instrucciones, nuevoAmbito)
                if (mensaje != null){
                    console.log("NO NULL" + mensaje)  
                    return mensaje
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
        mensaje+=Bloque(_instruccion.bloqueSw, nuevoAmbito)
        return mensaje
    }
    
    return `Error: No es una condicion válida para el switch... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = SentenciaSwitch