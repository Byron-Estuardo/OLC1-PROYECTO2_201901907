const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")
const TIPO_VALOR = require("../Tipos/TipoValor")
const Aritmetica = require("./Aritmetica");
const ValorExpresion = require("./ValorExpresion")
function Casteoss(_expresion, _ambito){
    console.log("_expresion")
    console.log(_expresion)
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
    else if(_expresion.tipo === TIPO_OPERACION.CASTEO){
        return CCasteo(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LOWER){
        return TTlower(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.UPPER){
        return TTupper(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TSTRING){
        return TTstring(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TYPEOF){
        return TTypeOf(_expresion, _ambito)
    }
    else if( _expresion.tipo === TIPO_OPERACION.ROUND){
        return RRound(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TRUNCATE){
        return TTruncate(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.LENGTH){
        return LLengh(_expresion, _ambito)
    }
}


function CCasteo(_expresion, _ambito){
    const A = Casteoss(_expresion.valor, _ambito)
    console.log("EXPRESIOM: ")
    console.log(A.tipo)
    if(A.tipo == TIPO_DATO.ENTERO && _expresion.tipoOb == TIPO_DATO.ENTERO){ //1==1 true==false ...
        const resultado = parseInt(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.DECIMAL && _expresion.tipoOb == TIPO_DATO.DECIMAL){ //1==1 true==false ...
        //console.log("Entro Casteo")
        const resultado = parseFloat(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.CADENA && _expresion.tipoOb == TIPO_DATO.CADENA){ //1==1 true==false ...
        //console.log("Entro Casteo")
        const resultado = String(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.CARACTER && _expresion.tipoOb == TIPO_DATO.CARACTER){ //1==1 true==false ...
        //console.log("Entro Casteo")
        const resultado = String.fromCharCode(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.CARACTER,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.BANDERA && _expresion.tipoOb == TIPO_DATO.BANDERA){ //1==1 true==false ...
       //console.log("Entro Casteo")
        const resultado = Boolean(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.BANDERA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.ENTERO && _expresion.tipoOb == TIPO_DATO.DECIMAL){ //1==1 true==false ...
        console.log("Entro Casteo")
        const resultado = parseFloat(A.valor);
        console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.ENTERO && _expresion.tipoOb == TIPO_DATO.CADENA){ //1==1 true==false ...
        const resultado = String(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.ENTERO && _expresion.tipoOb == TIPO_DATO.CARACTER){ //1==1 true==false ...
        const resultado = String.fromCharCode(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.CARACTER,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.DECIMAL && _expresion.tipoOb == TIPO_DATO.ENTERO){ //1==1 true==false 
        const resultado = parseInt(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.DECIMAL && _expresion.tipoOb == TIPO_DATO.CADENA){ //1==1 true==false 
        const resultado = String(A.valor);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.CARACTER && _expresion.tipoOb == TIPO_DATO.ENTERO){ //1==1 true==false 
        var xd = A.valor
        var AA = xd.charCodeAt(0)
        const resultado = parseInt(AA);
        return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.CARACTER && _expresion.tipoOb == TIPO_DATO.DECIMAL){ //1==1 true==false 
        var xd = A.valor
        var AA = xd.charCodeAt(0)
        const resultado = parseFloat(AA);
        //console.log(resultado)
        return{
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    var respuesta = (A.tipo===null ? A.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede negar el valor de tipo ${A.tipo} \n... Linea: +${A.linea}+" Columna: "+${A.columna}`,
        tipo: null,
        linea: A.linea,
        columna: A.columna
    }
}
function TTlower(_expresion, _ambito){
    const A = Casteoss(_expresion.valor, _ambito)
    console.log("EXPRESIOM: ")
    console.log(A.tipo)
    if(A.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var V = A.valor;
        const resultado = V.toLowerCase();
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    var respuesta = (A.tipo===null ? A.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede convertir a minisculas el valor de tipo ${A.tipo} \n... Linea: +${A.linea}+" Columna: "+${A.columna}`,
        tipo: null,
        linea: A.linea,
        columna: A.columna
    }
}
function TTupper(_expresion, _ambito){
    const A = Casteoss(_expresion.valor, _ambito)
    console.log("EXPRESIOM: ")
    console.log(A.tipo)
    if(A.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var V = A.valor;
        const resultado = V.toUpperCase();
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    var respuesta = (A.tipo===null ? A.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede convertir a minisculas el valor de tipo ${A.tipo} \n... Linea: +${A.linea}+" Columna: "+${A.columna}`,
        tipo: null,
        linea: A.linea,
        columna: A.columna
    }
}
function TTstring(_expresion, _ambito){
    const A = Casteoss(_expresion.valor, _ambito)
    console.log("EXPRESIOM: ")
    console.log(A.tipo)
    if(A.tipo == TIPO_DATO.ENTERO){ //1==1 true==false ...
        var V = A.valor;
        const resultado = V.toString();
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.DECIMAL){ //1==1 true==false ...
        var V = A.valor;
        const resultado = V.toString();
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.CADENA){ //1==1 true==false ...
        var V = A.valor;
        const resultado = V.toString();
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.CARACTER){ //1==1 true==false ...
        var V = A.valor;
        const resultado = V.toString();
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.BANDERA){ //1==1 true==false ...
        var V = A.valor;
        const resultado = V.toString();
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    var respuesta = (A.tipo===null ? A.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede convertir a minisculas el valor de tipo ${A.tipo} \n... Linea: +${A.linea}+" Columna: "+${A.columna}`,
        tipo: null,
        linea: A.linea,
        columna: A.columna
    }
}
function TTypeOf(_expresion, _ambito){
    const A = Casteoss(_expresion.valor, _ambito)
    console.log("EXPRESIOM: ")
    console.log(A.tipo)
    if(A.tipo == TIPO_DATO.ENTERO){
        var V = A.valor;
        const resultado = "int";
        return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.DECIMAL){
        var V = A.valor;
        const resultado = "double";
        return{
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.CADENA){
        var V = A.valor;
        const resultado = "string";
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.CARACTER){
        var V = A.valor;
        const resultado = "char";
        return{
                valor: resultado,
                tipo: TIPO_DATO.CARACTER,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.BANDERA){
        var V = A.valor;
        const resultado = "booleano";
        return{
                valor: resultado,
                tipo: TIPO_DATO.BANDERA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    var respuesta = (A.tipo===null ? A.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede convertir a minisculas el valor de tipo ${A.tipo} \n... Linea: +${A.linea}+" Columna: "+${A.columna}`,
        tipo: null,
        linea: A.linea,
        columna: A.columna
    }
}
function RRound(_expresion, _ambito){
    const A = Casteoss(_expresion.valor, _ambito)
    console.log("EXPRESIOM: ")
    console.log(A.tipo)
    if(A.tipo == TIPO_DATO.ENTERO){
        var V = A.valor;
        const resultado = Math.round(V);
        return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.DECIMAL){
        var V = A.valor;
        const resultado = Math.round(V);
        return{
                valor: resultado,
                tipo: TIPO_DATO.DECIMAL,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    var respuesta = (A.tipo===null ? A.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede convertir a minisculas el valor de tipo ${A.tipo} \n... Linea: +${A.linea}+" Columna: "+${A.columna}`,
        tipo: null,
        linea: A.linea,
        columna: A.columna
    }
}
function TTruncate(_expresion, _ambito){
    const A = Casteoss(_expresion.valor, _ambito)
    console.log("EXPRESIOM: ")
    console.log(A.tipo)
    if(A.tipo == TIPO_DATO.ENTERO){
        var V = A.valor;
        const resultado = Math.trunc(V);
        return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    else if(A.tipo == TIPO_DATO.DECIMAL){
        var V = A.valor;
        const resultado = Math.trunc(V);
        return{
                valor: resultado,
                tipo: TIPO_DATO.ENTERO,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    var respuesta = (A.tipo===null ? A.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede convertir a minisculas el valor de tipo ${A.tipo} \n... Linea: +${A.linea}+" Columna: "+${A.columna}`,
        tipo: null,
        linea: A.linea,
        columna: A.columna
    }
}
function LLengh(_expresion, _ambito){
    const A = Casteoss(_expresion.valor, _ambito)
    console.log("EXPRESIOM: ")
    console.log(A.tipo)
    if(A.tipo == TIPO_DATO.CADENA){
        var V = A.valor;
        const resultado = V.length;
        return{
                valor: resultado,
                tipo: TIPO_DATO.CADENA,
                linea: _expresion.linea,
                columna: _expresion.columna
            }
    }
    var respuesta = (A.tipo===null ? A.valor: "")
    return{
        valor: respuesta+ `\nError semántico: no se puede convertir a minisculas el valor de tipo ${A.tipo} \n... Linea: +${A.linea}+" Columna: "+${A.columna}`,
        tipo: null,
        linea: A.linea,
        columna: A.columna
    }
}
module.exports = Casteoss
