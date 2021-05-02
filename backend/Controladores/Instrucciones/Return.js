function Retorno(_instruccion, _ambito){
    console.log("Entro retorno")
    const id1 = _instruccion.expresion
    if (id1 != null){
        const id = _instruccion.expresion.valor
        console.log(id)
        console.log(_ambito)
        const existe = _ambito.existeSimbolo(id)
        console.log(existe)
        if(existe){
            console.log("entro existe")
            var SimboloTabla = _ambito.getSimbolo(id);
            var envio = SimboloTabla.valor 
            return envio
        }
        return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
    else{
        return
    }
}

module.exports = Retorno
