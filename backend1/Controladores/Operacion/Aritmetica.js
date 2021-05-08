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
const Casteoss = require("./Casteos");

function Aritmetica(_expresion, _ambito){
    
    if(_expresion.tipo === TIPO_VALOR.DECIMAL  || _expresion.tipo === TIPO_VALOR.ENTERO || 
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.BANDERA ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.CASTEO || _expresion.tipo === TIPO_OPERACION.LOWER ||
        _expresion.tipo === TIPO_OPERACION.UPPER || _expresion.tipo === TIPO_OPERACION.TSTRING || 
        _expresion.tipo === TIPO_OPERACION.TYPEOF || _expresion.tipo === TIPO_OPERACION.ROUND ||
        _expresion.tipo === TIPO_OPERACION.TRUNCATE || _expresion.tipo === TIPO_OPERACION.LENGTH){
        return Casteoss(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.NEGATIVO) {
        return negar(_expresion.opIzq, _ambito)
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
    //console.log(" Dentro suma OPIZ " + opIzq.tipo)
    const tipoRes = TipoResultadoNegacion(opIzq.tipo)
    //console.log("Tipo Resultado Negado" + " " +  tipoRes)
    if(tipoRes!=null){
        //console.log("Primer if?")
        if(tipoRes === TIPO_DATO.ENTERO){
            //console.log(2*-1)
            //console.log()
            //console.log(parseInt(opIzq.valor) * -1)
            //if(opIzq == tipo)
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
        valor: respuesta+'\nError semántico: no se puede realizar la operacion negacion... Linea: '+_opIzq.linea+" Columna: "+_opIzq.columna,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function suma(_opIzq, _opDer, _ambito){ 
    const opIzq = Aritmetica(_opIzq,_ambito)
    const opDer = Aritmetica(_opDer,_ambito)
    const tipoRes = TipoSuma(opIzq.tipo, opDer.tipo)
    
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            //console.log("suma")
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseInt(obtener) + parseInt(opDer.valor);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseInt(opIzq.valor) + parseInt(obtener);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = parseInt(opIzq.valor) + parseInt(opDer.valor);
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            
        }
        else if(tipoRes === TIPO_DATO.DECIMAL){
            //console.log("suma")
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(obtener) + parseFloat(opDer.valor);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(opIzq.valor) + parseFloat(obtener);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = parseFloat(opIzq.valor) + parseFloat(opDer.valor);
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            
        }
        if(tipoRes === TIPO_DATO.CADENA){
            
                const resultado = String(opIzq.valor) + String(opDer.valor);
                //console.log("CADENASSS: REsultado ")
                //console.log(resultado)
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
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                const resultado = parseInt(obtener) - parseInt(opDer.valor);   
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                const resultado = parseInt(opIzq.valor) - parseInt(obtener);
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = parseInt(opIzq.valor) - parseInt(opDer.valor);
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
        }
        if(tipoRes === TIPO_DATO.DECIMAL){
           //console.log("resta")
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(obtener) - parseFloat(opDer.valor);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(opIzq.valor) - parseFloat(obtener);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = parseFloat(opIzq.valor) - parseFloat(opDer.valor);
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
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
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseInt(obtener) * parseInt(opDer.valor);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseInt(opIzq.valor) * parseInt(obtener);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = parseInt(opIzq.valor) * parseInt(opDer.valor);
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            
        }
        if(tipoRes === TIPO_DATO.DECIMAL){
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(obtener) * parseFloat(opDer.valor);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(opIzq.valor) * parseFloat(obtener);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = parseFloat(opIzq.valor) * parseFloat(opDer.valor);
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
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
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(obtener) / parseFloat(opDer.valor);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(opIzq.valor) / parseFloat(obtener);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = parseFloat(opIzq.valor) / parseFloat(opDer.valor);
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
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
    const tipoRes = TipoResultadoPot(opIzq.tipo, opDer.tipo)
    if(tipoRes!=null){
        if(tipoRes === TIPO_DATO.ENTERO){
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = Math.pow(parseInt(obtener) , parseInt(opDer.valor));  
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = Math.pow(parseInt(opIzq.valor) , parseInt(obtener));
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = Math.pow(parseInt(opIzq.valor) , parseInt(opDer.valor));
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
        }
        if(tipoRes === TIPO_DATO.DECIMAL){
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = Math.pow(parseFloat(obtener) , parseFloat(opDer.valor));  
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = Math.pow(parseFloat(opIzq.valor) , parseFloat(obtener));
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = Math.pow(parseFloat(opIzq.valor) , parseFloat(opDer.valor));
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
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
            if (opIzq.tipo == TIPO_DATO.CARACTER && opDer.tipo != TIPO_DATO.CARACTER){
                var valor1 = opIzq.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(obtener) % parseFloat(opDer.valor);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }
            else if (opIzq.tipo != TIPO_DATO.CARACTER && opDer.tipo == TIPO_DATO.CARACTER){
                var valor1 = opDer.valor
                var obtener = valor1.charCodeAt(0)
                //console.log(obtener)
                const resultado = parseFloat(obtener) % parseFloat(opDer.valor);    
                //console.log(resultado)
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
            }else{
                const resultado = parseFloat(opIzq.valor) % parseFloat(opDer.valor);
                return{
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }
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