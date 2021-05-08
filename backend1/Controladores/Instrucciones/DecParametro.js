const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Tipos/TipoDato");


function DecParametro(_instruccion, _ambito){
    //console.log(_ambito)
    if(_instruccion.tipo_dato === TIPO_DATO.ENTERO){
        var valor = 0
        if(_instruccion.valor != null){/*
            console.log("_ambito.anterior")
            console.log(_ambito.anterior)
            console.log("_ambito")
            console.log(_ambito)*/
            const Operacion = require("../Operacion/Operacion");
            var op = Operacion(_instruccion.valor, _ambito.anterior)
            tipo = op.tipo;
            //console.log("OPERACION")
            //console.log(op)
            if(tipo === TIPO_DATO.ENTERO){
                valor = parseInt(op.valor);
            } 
            else {
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.ENTERO+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        //console.log("ingreso = " + valor)
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.DECIMAL){
        var valor = 0.0
        if(_instruccion.valor != null){
            const Operacion = require("../Operacion/Operacion");
            var op = Operacion(_instruccion.valor, _ambito.anterior)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.DECIMAL){
                valor = parseFloat(op.valor);
            } 
            else {
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        //console.log("ingreso = " + valor)
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CADENA){
        var valor = "" // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            const Operacion = require("../Operacion/Operacion");
            op = Operacion(_instruccion.valor, _ambito.anterior)
            valor = String(op.valor) //casteamos a cadena
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        //console.log("ingreso = " + valor)
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
        //console.log(_ambito)
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.CARACTER){
        var valor = '' // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        //console.log(_instruccion.valor)
        if(_instruccion.valor!=null){
           //console.log(_ambito)
           const Operacion = require("../Operacion/Operacion");
            op = Operacion(_instruccion.valor, _ambito.anterior)
            valor = op.valor //casteamos a cadena
           // console.log("OPERACION")
            //console.log(op)
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CARACTER, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        //console.log("ingreso = " + valor)
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
        //console.log(_ambito)
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.BANDERA){
        var valor = false // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if(_instruccion.valor!=null){
            const Operacion = require("../Operacion/Operacion");
            op = Operacion(_instruccion.valor, _ambito.anterior)
            tipo = op.tipo
            //verificamos que el valor a asignar sea del mismo tipo
            if(tipo===TIPO_DATO.BANDERA){
                valor = Boolean(op.valor)
            }
            else{
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.BANDERA+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BANDERA, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
       //console.log("ingreso = " + valor)

        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
        //console.log(_ambito)
    }
}

module.exports = DecParametro