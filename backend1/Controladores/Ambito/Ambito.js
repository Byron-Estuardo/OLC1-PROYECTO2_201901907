const sim = require("./TablaSimbolos");

class Ambito {
    constructor(_anterior) {
        this.anterior = _anterior
        this.tablaSimbolos = new Map();
        this.tablaMetodos = new Map();
        this.tablaFunciones = new Map();
    }
 
    addSimbolo(_s, _simbolo) {
        this.tablaSimbolos.set(_s.toLowerCase(), _simbolo)
        sim.push(_simbolo)
    }

    addMetodo(_s, _metodo) {
        this.tablaMetodos.set(_s.toLowerCase(), _metodo)
    }
    addFuncion(_s, _metodo) {
        this.tablaFunciones.set(_s.toLowerCase(), _metodo)
    }
    getSimbolo(_s) { //(hola, clase simbolo)
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    getMetodo(_s) { //(hola, clase simbolo)
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    getFuncion(_s) { //(hola, clase simbolo)
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaFunciones.get(_s.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }
    existeSimbolo(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return true
            }
        }
        return false
    }
    existeSimboloAmbitoActual(_s) {
        var encontrado = this.tablaSimbolos.get(_s.toLowerCase()) //hola<=>HoLA
        if (encontrado != null) {
            return true
        }
        return false
    }
    existeMetodo(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return true
            }
        }
        return false
    }
    existeFuncion(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaFunciones.get(_s.toLowerCase()) //hola<=>HoLA
            if (encontrado != null) {
                return true
            }
        }
        return false
    }
    actualizar(_s, _simbolo) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase());
            if (encontrado != null) {
                e.tablaSimbolos.set(_s, _simbolo)
                return true;
            }
        }
        return false
    }
    
}

module.exports = Ambito

//Tabla de simbolos
