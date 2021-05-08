const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion")
const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")
const TIPO_VALOR = require("../Tipos/TipoValor");
const ValorExpresion = require("../Operacion/ValorExpresion");

class Graficador{

    constructor(_raiz){
        this.grafo = " ";
        this.raiz = _raiz
        this.contador = 0
    }

    graficar(){
        this.grafo = "diagraph G{";
        this.grafo = "node[shape=\"shape\"]"
        this.grafo = "Nodo0[label=\"RAIZ\"];\n"
        this.contador = 1;
        this.recorrerAST("Nodo0", this.raiz)
        this.grafo += "}"
        returnthis.grafo
    }
    recorrerAST(_padre, _hijo){
        _hijo.forEach(instruccion => {
            if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DECLARACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarDeclaracion(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.IMPRIMIR){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"PRINT\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarPrint(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ASIGNACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarAsignacion(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.INCREMENTO){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"INCREMENTO\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarIncremento(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.DECREMENTO){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DECREMENTO\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarDecremento(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"LLAMADA METODO\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarLLMetodo(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"WHILE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarWhile(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarIf(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DO WHILE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarDoWhile(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCH){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"SWITCH\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarSwitch(instruccion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"FOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ":\n"
                this.graficarFor(instruccion, nombreHijo)
            }
        })
    }
    graficarOperacion(_expresion, _padre){
        if(_expresion.tipo === TIPO_VALOR.DECIMAL  || _expresion.tipo === TIPO_VALOR.ENTERO || 
            _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.BANDERA ||
           _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
            var exp = _expresion.valor.toString()
            exp = exp.replace(/\"/gi, '\\\"')
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label=\" ${_expresion.tipo} \n ${exp}\"];\n`
            this.grafo += _padre + "->" + value + ";\n"
            this.contador++;
        }
        else if(_expresion.tipo === TIPO_OPERACION.NEGATIVO || _expresion.tipo === TIPO_OPERACION.NOT){
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label=\" ${_expresion.tipo} \n ${this.getSimbolo(_expresion.tipo)}\"];\n`
            this.grafo += _padre + "->" + value + ";\n"
            this.contador++;
            this.graficarOperacion(_expresion.opIzq, value)
        }
        else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || 
                _expresion.tipo === TIPO_OPERACION.MULTIPLICACION || _expresion.tipo === TIPO_OPERACION.DIVISION || 
                _expresion.tipo === TIPO_OPERACION.POTENCIA||
                _expresion.tipo === TIPO_OPERACION.MODULO ||_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || 
                _expresion.tipo === TIPO_OPERACION.DIFERENTE ||_expresion.tipo === TIPO_OPERACION.MENOR ||
                _expresion.tipo === TIPO_OPERACION.MENORIGUAL || _expresion.tipo === TIPO_OPERACION.MAYOR ||
                _expresion.tipo === TIPO_OPERACION.MAYORIGUAL || _expresion.tipo === TIPO_OPERACION.OR || 
                _expresion.tipo === TIPO_OPERACION.AND){
                var value = `Nodo${this.contador}`;
                this.grafo += value + `[label=\" ${_expresion.tipo} \n ${this.getSimbolo(_expresion.tipo)}\"];\n`
                this.grafo += _padre + "->" + value + ";\n"
                this.contador++;
                this.graficarOperacion(_expresion.opIzq, value)
                this.graficarOperacion(_expresion.opDer, value)
        }
        else if(_expresion.tipo === TIPO_OPERACION.LOWER ||
            _expresion.tipo === TIPO_OPERACION.UPPER || _expresion.tipo === TIPO_OPERACION.TSTRING || 
            _expresion.tipo === TIPO_OPERACION.TYPEOF || _expresion.tipo === TIPO_OPERACION.ROUND ||
            _expresion.tipo === TIPO_OPERACION.TRUNCATE || _expresion.tipo === TIPO_OPERACION.LENGTH){
                var value = `Nodo${this.contador}`;
                this.grafo += value + `[label=\" ${_expresion.tipo} \n ${this.getSimbolo(_expresion.tipo)}\"];\n`
                this.grafo += _padre + "->" + value + ";\n"
                this.contador++;
                this.graficarOperacion(_expresion.opIzq, value)
        }
        else if(_expresion.tipo === TIPO_OPERACION.CASTEO){
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label=\" ${_expresion.tipoOb} \n ${_expresion.tipo}\"];\n`
            this.grafo += _padre + "->" + value + ";\n"
            this.contador++;
            this.graficarOperacion(_expresion.opIzq, value)
        } 
        else if(_expresion.tipo === TIPO_OPERACION.TERNARIO){
            return Ternar(_expresion, _ambito)
        }
    }
    getSimbolo(_tipo){
        switch(_tipo){
            case TIPO_OPERACION.SUMA:
                return '+'
            case TIPO_OPERACION.RESTA:
                return '-'
            case TIPO_OPERACION.MULTIPLICACION:
                return '*'
            case TIPO_OPERACION.DIVISION:
                return '/'
            case TIPO_OPERACION.POTENCIA:
                return '^'
            case TIPO_OPERACION.MODULO:
                return '%'
            case TIPO_OPERACION.IGUALIGUAL:
                return '=='
            case TIPO_OPERACION.DIFERENTE:
                return '!='
            case TIPO_OPERACION.MENOR:
                return '<'
            case TIPO_OPERACION.MAYOR:
                return '>'
            case TIPO_OPERACION.MENORIGUAL:
                return '=<'
            case TIPO_OPERACION.MAYORIGUAL:
                return '>='
            case TIPO_OPERACION.OR:
                return '||'
            case TIPO_OPERACION.AND:
                return '&&'
            case TIPO_OPERACION.NEGATIVO:
                return '-'
            case TIPO_OPERACION.NOT:
                return '!'
            case TIPO_OPERACION.LOWER:
                return 'ToLower'
            case TIPO_OPERACION.UPPER:
                return 'ToUpper'
            case TIPO_OPERACION.ROUND:
                return 'Round'
            case TIPO_OPERACION.TRUNCATE:
                return 'Truncate'
            case TIPO_OPERACION.TSTRING:
                return 'ToString'
            case TIPO_OPERACION.TYPEOF:
                return 'TypeOf'
            case TIPO_OPERACION.LENGTH:
                return 'Length'
        }

    }
    graficarDeclaracion(_instruccion, _padre){
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"TIPO \n ${_instruccion.tipo_dato}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;
        var nombreVar = `Nodo${this.contador}`;
        this.grafo += nombreVar +  `[label= \"identificador \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;
        if(_instruccion.valor != null){
            this.graficarOperacion(_instruccion.valor, _padre)
        }
    }
    graficarAsignacion(_instruccion, _padre){
        var nombreVar = `Nodo${this.contador}`;
        this.grafo += nombreVar +  `[label= \"identificador \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;
        if(_instruccion.valor != null){
            this.graficarOperacion(_instruccion.valor, _padre)
        }
    }
    gra
}


module.exports = Graficador
