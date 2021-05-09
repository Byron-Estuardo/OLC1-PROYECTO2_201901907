const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Tipos/TipoDato");
const Operacion = require("../Operacion/Operacion");
const TIPO_INSTRUCCION = require("../Tipos/TipoInstruccion");
const Declaracion = require("./Declaracion");
const Asignacion = require("./Asignacion");
const SentenciaIncremento = require("./Incremento");
const SentenciaDecremento = require("./Decremento");
 
function Sentenciafor(_instruccion, _ambito){
    var envio = ""
    var mensaje = ""
    var hayBreak = false
    var hayContinue = false
    var hayReturn = false
    if(_instruccion.variable.tipo === TIPO_INSTRUCCION.DECLARACION){
        Declaracion(_instruccion.variable, _ambito)
    }
    else if(_instruccion.variable.tipo === TIPO_INSTRUCCION.ASIGNACION){
        Asignacion(_instruccion.variable, _ambito)
    }
    //console.log("Error: Se esperaban valores numericos en el for");
    var hasta = Operacion(_instruccion.expresion, _ambito)
    if( !(hasta.tipo == TIPO_DATO.BANDERA)){
        console.log("Error: Se esperaban valores numericos en el for");
        return `Error: Se esperaban valores numericos en el for`;
    }
    while(hasta.valor){
        hasta = Operacion(_instruccion.expresion, _ambito)
        if(hasta.valor == true){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += ejec.cadena
            hayBreak = ejec.hayBreak
            hayContinue = ejec.hayContinue
            hayReturn = ejec.hayReturn
            hasta = Operacion(_instruccion.expresion, _ambito)
            if(_instruccion.aumento.tipo == TIPO_INSTRUCCION.INCREMENTO){
                SentenciaIncremento(_instruccion.aumento, _ambito)
            }
            else if(_instruccion.aumento.tipo == TIPO_INSTRUCCION.DECREMENTO){
                SentenciaDecremento(_instruccion.aumento, _ambito)
            }
            else if(_instruccion.aumento.tipo == TIPO_INSTRUCCION.ASIGNACION){
                Asignacion(_instruccion.aumento, _ambito)
            }
            if(hayBreak){
                //console.log("MENSAJE BREAK: ")
                //console.log(mensaje)
                break
            }
            else if(hayContinue){
                hasta = Operacion(_instruccion.expresion, _ambito)
                //console.log("MENSAJE CONTINUE: ")
                //console.log(mensaje)
                continue
            }
            else if(hayReturn){
                if(ejec.respuesta){
                    envio = ejec.respuesta
                    return {
                        hayReturn: hayReturn,
                        respuesta: envio,
                        cadena: mensaje
                    }
                }
                else{
                    return
                }
            }
        }
    }
    if(mensaje!=null){
        //console.log("MENSAJE FIN FOR: ")
        //console.log(mensaje)
        return{
            respuesta: envio,
            hayReturn: hayReturn,
            hayBreak: hayBreak,
            hayContinue: hayContinue,
            cadena: mensaje
        }
    }
}
 
module.exports = Sentenciafor


/*

void hanoi(int num,char A,char C,char B){
    if(num==1){
      print("Mueva el bloque " + num + " desde " + A + " hasta  " + C);      
    }
    else{
        hanoi(num-1,A,B,C);
      print("Mueva el bloque " + num + " desde " + A + " hasta  " + C);
        hanoi(num-1,B,C,A);
    }
}
 
void main(){
  int n = 5;
  print("Los clavijas son A B C\n");
  print("Numero de discos: " + n);
  hanoi(n,'A','C','B');       
}
exec main();

*/