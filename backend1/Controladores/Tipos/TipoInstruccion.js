const TIPO_INSTRUCCION = {
    IMPRIMIR:           'INSTR_IMPRIMIR',
    DECLARACION:        'INSTR_DECLARACION',
    FUNCION:            'DEC_FUNCION',
    ASIGNACION:         'INSTR_ASIGNACION',
    WHILE:              'INSTR_WHILE',
	IF:                 'INSTR_IF',
    IFELSE:             'INSTR_IFELSE',
    IFELSEIF:           'INSTR_IFELSEIF',
    SWITCH:			    'SWITCH',
	SWITCH_OP:		    'SWITCH_OP',
	SWITCH_DEF:		    'SWITCH_DEF',
    DOWHILE:            'INSTR_DO_WHILE',
    FOR:                'INSTR_FOR',
    DEC_METODO:         'DEC_METODO',
    INCREMENTO:         'INSTR_INCREMENTO',
    DECREMENTO:         'INSTR_DECREMENTO',
    EXEC:               'EXEC',
    LLAMADA_METODO:     'LLAMADA_METODO',
    BREAK:              'INSTR_BREAK',
    RETURN:             'INSTR_RETURN',
    CONTINUE:           'CONTINUE',
    CASO: 			    'CASO',
	DEFECTO: 		    'DEFECTO'
} 

module.exports = TIPO_INSTRUCCION