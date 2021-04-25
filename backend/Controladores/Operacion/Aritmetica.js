const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")
const TIPO_VALOR = require("../Tipos/TipoValor")
const TipoResultadoSuma = require("./TipoResultado")
const TipoResultadoResta = require("./TipoResultado")
const TipoResultadoMulti = require("./TipoResultado")
const TipoResultadoDiv = require("./TipoResultado")
const TipoResultadoMod = require("./TipoResultado")
const TipoResultadoPot = require("./TipoResultado")
const TipoResultadoNegacion = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")

function Aritmetica(_expresion, _ambito){
    
    if (_expresion.tipo === TIPO_OPERACION.NEGATIVO) {
        return negar(_expresion.opIzq, _ambito)
    }else if(_expresion.tipo === TIPO_VALOR.DECIMAL  || _expresion.tipo === TIPO_VALOR.ENTERO || 
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.SUMA){
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
    const tipoRes = TipoResultadoNegacion(opIzq.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            const resultado = parseInt(opIzq.tipo) * -1;
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        else if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = parseFloat(opIzq.tipo) * -1;
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
    const tipoRes = TipoResultadoSuma(opIzq.tipo, opDer.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            const resultado = parseInt(opIzq.valor) + parseInt(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        else if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = parseFloat(opIzq.valor) + parseFloat(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        if(tipoRes === TIPO_DATO.CADENA){
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
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
    const tipoRes = TipoResultadoResta(opIzq.tipo, opDer.tipo)
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
    const tipoRes = TipoResultadoMulti(opIzq.tipo, opDer.tipo)
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
        const tipoRes = TipoResultadoDiv(opIzq.tipo, opDer.tipo)
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
            valor: respuesta+'\nError semántico: no se puede realizar la operacion multiplicacion... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
            tipo: null,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
}

function pot(_opIzq, _opDer, _ambito){
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoResultadoPot(opIzq.tipo, opDer.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            const resultado = parseInt(opIzq.valor) ^ parseInt(opDer.valor);
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _opIzq.linea,
                columna: _opIzq.columna
            }
        }
        if(tipoRes === TIPO_DATO.DECIMAL){
            const resultado = parseFloat(opIzq.valor) ^ parseFloat(opDer.valor);
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
    const tipoRes = TipoResultadoMod(opIzq.tipo, opDer.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.DECIMAL){
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