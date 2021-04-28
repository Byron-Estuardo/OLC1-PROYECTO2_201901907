
const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")
const TIPO_VALOR = require("../Tipos/TipoValor")
const TipoSuma = require("./Sumaa")
const TipoResultadoResta = require("./Restaa")
const TipoResultadoMulti = require("./Multi")
const TipoResultadoDiv = require("./Div")
const TipoResultadoMod = require("./mod")
const TipoResultadoPot = require("./pot")
const TipoResultadoNegacion = require("./negacion")
const ValorExpresion = require("./ValorExpresion")

function Aritmetica(_expresion, _ambito){
    
    if(_expresion.tipo === TIPO_VALOR.DECIMAL  || _expresion.tipo === TIPO_VALOR.ENTERO || 
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.NEGATIVO) {
        console.log(_expresion.opIzq)
        return negar(_expresion.opIzq, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA){
        console.log(" INICIAL " +_expresion.opIzq.tipo + " "+ _expresion.opIzq.valor)
        console.log(" INICIAL " +_expresion.opDer.tipo + " "+ _expresion.opDer.valor)
        console.log(" Tipo dato " + TIPO_DATO.CADENA)
        return suma(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multi(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIVISION){
        return div(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.POTENCIA){
        return pot(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MODULO){
        return mod(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function negar(_opIzq, _ambito){ 
    const opIzq = Aritmetica(_opIzq,_ambito)
    console.log(" Dentro suma OPIZ " + opIzq.tipo)
    const tipoRes = TipoResultadoNegacion(opIzq.tipo)
    console.log("Tipo Resultado Negado" + " " +  tipoRes)
    if(tipoRes!=null){
        console.log("Primer if?")
        if(tipoRes === TIPO_DATO.ENTERO){
            console.log(2*-1)
            console.log()
            console.log(parseInt(opIzq.valor) * -1)
            const resultado = parseInt(opIzq.valor) * -1;
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        else if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = parseFloat(opIzq.valor)* parseFloat(-1);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion suma... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function suma(_opIzq, _opDer, _ambito){ 
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    console.log(" Dentro suma OPIZ " + opIzq.tipo)
    console.log(" Dentro suma OPDER " +opDer.tipo)
    const tipoRes = TipoSuma(opIzq.tipo, opDer.tipo)
    console.log(" Tipo de Resultado suma "+tipoRes)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            console.log(opDer.tipo)
            console.log(opIzq.tipo)
            const resultado = parseInt(opIzq.valor) + parseInt(opDer.valor);
            console.log(resultado)
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        else if(tipoRes === TIPO_DATO.DECIMAL){
            console.log(opDer.tipo)
            console.log(opIzq.tipo)
            const resultado = parseFloat(opIzq.valor) + parseFloat(opDer.valor);
            console.log(resultado)
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        if(tipoRes === TIPO_DATO.CADENA){
            console.log(opDer.tipo)
            console.log(opIzq.tipo)
            const resultado = String(opIzq.valor) + String(opDer.valor);
            console.log(resultado)
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion suma... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function resta(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    console.log(" Dentro resta OPIZ " + opIzq.tipo)
    console.log(" Dentro resta OPDER " +opDer.tipo)
    const tipoRes = TipoResultadoResta(opIzq.tipo, opDer.tipo)
    console.log(" Tipo de Resultado resta "+tipoRes)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            const resultado = parseInt(opIzq.valor) - parseInt(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = parseFloat(opIzq.valor) - parseFloat(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion resta... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function multi(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    console.log(" Dentro multi OPIZ " + opIzq.tipo)
    console.log(" Dentro multi OPDER " +opDer.tipo)
    const tipoRes = TipoResultadoMulti(opIzq.tipo, opDer.tipo)
    console.log(" Tipo de Resultado multi "+tipoRes)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            const resultado = parseInt(opIzq.valor) * parseInt(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = parseFloat(opIzq.valor) * parseFloat(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion multiplicacion... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function div(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    console.log(" Dentro div OPIZ " + opIzq.tipo)
    console.log(" Dentro div OPDER " +opDer.tipo)
    const tipoRes = TipoResultadoDiv(opIzq.tipo, opDer.tipo)
    console.log(" Tipo de Resultado div "+tipoRes)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = parseFloat(opIzq.valor) / parseFloat(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion divicion... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function pot(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    console.log(" Dentro pot OPIZ " + opIzq.tipo + " " + opIzq.valor)
    console.log(" Dentro pot OPDE " + opDer.tipo + " " + opDer.valor)
    const tipoRes = TipoResultadoPot(opIzq.tipo, opDer.tipo)
    console.log(" Tipo de Resultado pot "+tipoRes)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            console.log(Math.pow(parseInt(opIzq.valor), parseInt(opDer.valor)))
            const resultado = Math.pow(parseInt(opIzq.valor), parseInt(opDer.valor));
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = Math.pow(parseFloat(opDer.valor) , parseFloat(opIzq.valor));
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion potencia... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function mod(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    console.log(" Dentro mod OPIZ " + opIzq.tipo)
    console.log(" Dentro mod OPDER " +opDer.tipo)
    const tipoRes = TipoResultadoMod(opIzq.tipo, opDer.tipo)
    console.log(" Tipo de Resultado mod "+tipoRes)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){
            console.log(parseFloat(opIzq.valor) % parseFloat(opDer.valor))
            const resultado = parseFloat(opIzq.valor) % parseFloat(opDer.valor);

            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "")
    return{
        valor: respuesta+'\nError semántico: no se puede realizar la operacion modulo... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Aritmetica