const Ambito = require("../Controladores/Ambito/Ambito")
const Graficador = require("../Controladores/AST/Graficador")
const Bloque = require("../Controladores/Instrucciones/Bloque")
const Global = require("../Controladores/Instrucciones/Global")
var fs = require("fs")
const { stdout, stderr } = require("process")
const sim = require("../Controladores/Ambito/TablaSimbolos")


module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            const AmbitoGlobal = new Ambito(null)
            //var cadena = Bloque(ast, AmbitoGlobal)
            var cadena = Global(ast, AmbitoGlobal)
            var tabla = sim
            //var grafica = new Graficador(ast);
            //var dot = grafica.graficar()
            //console.log("AST PRRO" )
            //console.log(ast)
            var resultado = {
                arbol: ast,
                consola: cadena ,
                tab: tabla
            }
            /*fs.writeFile('/backend/Controladores/REPORTES/AST.dot', dot, function(error){
                if(error){
                    console.log(error)
                }
            });
            const { exec } = require('child_process')
            exec('dot -Tpng /backend/Controladores/REPORTES/AST.dot -o /backend/Controladores/REPORTES/AST.png', (error, stdout, stderr)=>{
                if(error){
                    console.log(error.message)
                }
                if(stderr){
                    console.log(stderr)
                }
            })*/
            //enviamos la respuesta
            res.send(resultado)
        //} catch (error) {
            //res.send(error)
        //}
    })
}