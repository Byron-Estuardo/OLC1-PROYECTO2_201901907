const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato")
const TIPO_OPERACION = require("../Tipos/TipoOperacion")
const TIPO_VALOR = require("../Tipos/TipoValor")
const Aritmetica = require("./Aritmetica");
const ValorExpresion = require("./ValorExpresion")
const Relacional = require("./Relacional")

function Ternar(_expresion, _ambito){
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
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.TERNARIO){
        return Ternars(_expresion, _ambito)
    }
}
function Ternars(_instruccion, _ambito){
    var mensaje = ""
    var tipos = TIPO_DATO.BANDERA;
    var linea = 0;
    var col = 0;
    var operacion = Ternar(_instruccion.condicion, _ambito);
    if(operacion.tipo === TIPO_DATO.BANDERA){
        if(operacion.valor == true){
            var nuevoAmbito = new Ambito(_ambito)
            var ejec = Ternar(_instruccion.valv, _ambito)
            mensaje = ejec.valor
            tipo = ejec.tipo
            linea = ejec.linea
            col = ejec.columna
        }
        if(_instruccion.valf != null && operacion.valor == false){
            var nuevoAmbito = new Ambito(_ambito)
            var ejec = Ternar(_instruccion.valf,nuevoAmbito)
            mensaje = ejec.valor
            tipo = ejec.tipo
            linea = ejec.linea
            col = ejec.columna
        }
        return{
            valor: mensaje,
            tipo: tipos,
            linea: linea,
            columna: col
        } 
        }
        return{
            valor: `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
            tipo: tipos,
            linea: linea,
            columna: col
        } 
}
 
module.exports = Ternar