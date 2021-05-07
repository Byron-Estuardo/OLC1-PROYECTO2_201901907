function SentenciaDecremento(_instruccion, _ambito){
    const id = _instruccion.expresion
    const existe = _ambito.existeSimbolo(id)
    if(existe){
        var SimboloTabla = _ambito.getSimbolo(id);
        SimboloTabla.valor = SimboloTabla.valor - 1            
        _ambito.actualizar(id, SimboloTabla)
        return null
    }
    return `Error: la variable '${String(id)}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}
module.exports = SentenciaDecremento
