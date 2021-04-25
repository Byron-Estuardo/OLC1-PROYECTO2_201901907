const Ambito = require("../Controladores/Ambito/Ambito")
const Bloque = require("../Controladores/Instrucciones/Bloque")
const Global = require("../Controladores/Instrucciones/Global")

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            var ast = parser.parse(prueba)
            const AmbitoGlobal = new Ambito(null)
            //var cadena = Bloque(ast, AmbitoGlobal)
            var cadena = Global(ast, AmbitoGlobal)
            var resultado = {
                arbol: ast,
                consola: cadena  
            }
            res.send(resultado)
        //} catch (error) {
            //res.send(error)
        //}
    })
}