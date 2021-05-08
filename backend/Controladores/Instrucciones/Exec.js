const Ambito = require("../Ambito/Ambito")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")
const Instruccion = require("./Instruccion")

function Exec(_instruccion, _ambito) {
    var cadena = ""
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    if (metodoEjecutar == null){
        metodoEjecutar = _ambito.getFuncion(_instruccion.nombre)
    }
    //console.log(metodoEjecutar.instrucciones)
    if (metodoEjecutar != null) {
        var nuevoAmbito = new Ambito(_ambito)
        //verificamos si es un metodo con parametros
        if (metodoEjecutar.lista_parametros != null) {
            //verificamos que la cantidad de valores coincida con la cantidad de parametros
            if (_instruccion.lista_valores != null && metodoEjecutar.lista_parametros.length == _instruccion.lista_valores.length) {
                var error = false;
                for (let i = 0; i < metodoEjecutar.lista_parametros.length; i++) {
                    var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametros[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametros[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                    //console.log(nuevoAmbito)
                    var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                    
                    if (mensaje != null) {
                        error = true
                        cadena += mensaje + '\n'
                    }
                } 
                if (error) {
                    //console.log(error)
                    return cadena
                }
                var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var mensaje = ejec.cadena
                if (ejec.hayBreak) {
                    mensaje += `Error: Se ha encontrado un break fuera de un ciclo 1`
                }
                else if (ejec.hayContinue) {
                    mensaje += `Error: Se ha encontrado un continue fuera de un ciclo 1`
                }
                //console.log("HOLA HOLA HOLA HOLA HOLA HOLA HOLA HOLA HOLA HOLA HOLA HOLA : ")
                return mensaje
            }
            else {
                return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
            }
        }
        else {
            //console.log("elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
            var mensaje = ejec.cadena
            if (ejec.hayBreak) {
                mensaje += `Error: Se ha encontrado un break fuera de un ciclo`
            }
            else if (ejec.hayContinue) {
                mensaje += `Error: Se ha encontrado un continue fuera de un ciclo`
            }
            return mensaje
        }
    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Exec