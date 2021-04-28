const TIPO_DATO = require("../Tipos/TipoDato");
const TIPO_OPERACION = require("../Tipos/TipoOperacion");
const TIPO_VALOR = require("../Tipos/TipoValor");
const Aritmetica = require("./Aritmetica");
const ValorExpresion = require("./ValorExpresion");

function Relacional(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL  || _expresion.tipo === TIPO_VALOR.ENTERO || 
       _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.BANDERA ||
       _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || 
            _expresion.tipo === TIPO_OPERACION.MULTIPLICACION || _expresion.tipo === TIPO_OPERACION.DIVISION || 
            _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.NEGATIVO ||
            _expresion.tipo === TIPO_OPERACION.MODULO){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL){
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorig(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorig(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    //a+5<6*8
}
function igualigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if(opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO ||
        opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CARACTER ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.BANDERA && opDer.tipo == TIPO_DATO.BANDERA ||
        opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor == opDer.valor){
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
function diferente(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if(opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO ||
        opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CARACTER ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.BANDERA && opDer.tipo == TIPO_DATO.BANDERA ||
        opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor != opDer.valor){
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
function menor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if(opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO ||
        opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CARACTER ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.BANDERA && opDer.tipo == TIPO_DATO.BANDERA ||
        opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor < opDer.valor){
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
function mayor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if(opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO ||
        opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CARACTER ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.BANDERA && opDer.tipo == TIPO_DATO.BANDERA ||
        opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor > opDer.valor){
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
function menorig(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if(opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO ||
        opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CARACTER ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.BANDERA && opDer.tipo == TIPO_DATO.BANDERA ||
        opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor <= opDer.valor){
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
function mayorig(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if(opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO ||
        opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL || opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CARACTER ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.ENTERO || opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.DECIMAL ||
        opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER || opIzq.tipo == TIPO_DATO.BANDERA && opDer.tipo == TIPO_DATO.BANDERA ||
        opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var resultado = false
        if(opIzq.valor >= opDer.valor){
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

module.exports = Relacional