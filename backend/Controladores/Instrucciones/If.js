const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIf(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    console.log(operacion)
    //console.log(_instruccion.instruccionesf.length)
    //console.log("_instruccion.instruccionesv: :3")
    //console.log(_instruccion.instruccionesv)
    //console.log("_instruccion.instruccionesf: :3")
    //console.log(_instruccion.instruccionesf)
    if(operacion.tipo === TIPO_DATO.BANDERA){
        //console.log("entro true true")
        if(operacion.valor == true){
            //console.log(" entro Segundo val true ")
            var nuevoAmbito = new Ambito(_ambito)
            for (let i = 0; i < _instruccion.instruccionesv.length; i++) {
                console.log("V")
                console.log(i)
                console.log(_instruccion[i])
            }
            const Bloque = require("./Bloque");
            //console.log(" Antes Bloque ")
            //console.log(" _instruccion.expresion = ")
            //console.log(_instruccion.instruccionesv)
            //console.log(_instruccion.instruccionesf)
            //console.log(Bloque(_instruccion.instruccionesv,nuevoAmbito))
            mensaje += Bloque(_instruccion.instruccionesv,nuevoAmbito)
        }
        if(_instruccion.instruccionesf != null && operacion.valor == false){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require("./Bloque")
            console.log(" else if ")
            for (let i = 0; i < _instruccion.instruccionesf.length; i++) {
                console.log("F")
                console.log(i)
                console.log(_instruccion[i])
            }
            //console.log("_instruccion.instruccionesv: :3")
            //console.log(_instruccion.instruccionesv)
            //console.log("_instruccion.instruccionesf: :3")
            //console.log(_instruccion.instruccionesf);
            console.log(" Mensaje antes")
            console.log(Bloque(_instruccion.instruccionesf ,nuevoAmbito))
            mensaje += Bloque(_instruccion.instruccionesf ,nuevoAmbito)
            
            //console.log(" _instruccion.instruccionesv = ")
            //console.log(_instruccion.instruccionesv)
            //console.log(" _instruccion.instruccionesf = ")
            //console.log(_instruccion.instruccionesf)
            //console.log(Bloque(_instruccion.instruccionesv,nuevoAmbito))
        }
        
        return mensaje 
    } 
    return `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}
 
module.exports = SentenciaIf