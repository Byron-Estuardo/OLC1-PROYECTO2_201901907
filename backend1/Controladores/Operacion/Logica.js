const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")
const TIPO_VALOR = require("../Tipos/TipoValor")
const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion");
const Relacional = require("./Relacional")
const ValorExpresion = require("./ValorExpresion")
const Exec = require("../Instrucciones/Exec");

function Logica(_expresion, _ambito){
    //true || false
    //console.log("Operaciones logicas")
    if(_expresion.tipo === TIPO_OPERACION.NOT){
        return not(_expresion.opIzq, _ambito)
    }
    else if(_expresion.tipo === TIPO_VALOR.DECIMAL  || _expresion.tipo === TIPO_VALOR.ENTERO || 
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
        return Exec(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR){
        return or(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.AND){
        return and(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function or(_opIzq, _opDer, _ambito){
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BANDERA && opDer.tipo === TIPO_DATO.BANDERA){
        var resultado = false
        if(opIzq.valor || opDer.valor == true){
            resultado = true
        } 
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}
function and(_opIzq, _opDer, _ambito){
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BANDERA && opDer.tipo === TIPO_DATO.BANDERA){
        var resultado = false
        if(opIzq.valor && opDer.valor == true){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function not(_opIzq, _ambito){
    const opIzq = Logica(_opIzq, _ambito)
    //console.log(opIzq.tipo)
    //console.log(opIzq.valor)
    if(opIzq.tipo === TIPO_DATO.BANDERA){
        var resultado = false
        //console.log("entro prro?")
        if(opIzq.valor == false){
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BANDERA,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede negar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Logica