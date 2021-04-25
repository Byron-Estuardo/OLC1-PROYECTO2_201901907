const TIPO_INSTRUCCION = {
    IMPRIMIR:           'INSTR_IMPRIMIR',
    DECLARACION:        'INSTR_DECLARACION',
    ASIGNACION:         'INSTR_ASIGNACION',
    WHILE:              'INSTR_WHILE',
	IF:                 'INSTR_IF',
	IF_ELSE:            'INSTR_ELSE',
    SWITCH:			    'SWITCH',
	SWITCH_OP:		    'SWITCH_OP',
	SWITCH_DEF:		    'SWITCH_DEF',
    PARA:               'INSTR_FOR',
    DEC_METODO:         'DEC_METODO',
    EXEC:               'EXEC',
    LLAMADA_METODO:     'LLAMADA_METODO'
}

const TIPO_OPCION_SWITCH = { 
	CASO: 			'CASO',
	DEFECTO: 		'DEFECTO'
} 
module.exports= TIPO_INSTRUCCION;
module.exports= TIPO_OPCION_SWITCH;