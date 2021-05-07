function Retorno(_instruccion, _ambito){
    const id1 = _instruccion.expresion
    if (id1 != null){
        const id = _instruccion.expresion.valor
        const existe = _ambito.existeSimbolo(id)
        if(existe){
            var SimboloTabla = _ambito.getSimbolo(id);
            return SimboloTabla
        }
        return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
    else{
        return
    }
}

module.exports = Retorno
