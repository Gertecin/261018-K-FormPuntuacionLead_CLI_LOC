export type TipoServicio =
  | 'presupuesto'
  | 'ayuda_configuracion'
  | 'mantenimiento_programado'
  | 'averia_domicilio'
  | 'urgencia_negocio';

export type Sistema =
  | 'solar'
  | 'aerotermia'
  | 'aacc'
  | 'vrv'
  | 'caldera';

export type Alcance =
  | 'habitacion'
  | 'hogar'
  | 'comercio'
  | 'bloque'
  | 'edificio';

export type Urgencia =
  | 'lo_antes_posible'
  | 'menos_de_un_mes'
  | 'proximos_15_dias'
  | 'durante_la_semana'
  | '48h_o_busco_otra';

export interface RespuestasFormulario {
  tipoServicio: TipoServicio;
  sistema: Sistema;
  alcance: Alcance;
  urgencia: Urgencia;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  consentimiento: boolean;
}

export type Prioridad = 'ALTA' | 'MEDIA' | 'BAJA';

export interface ResultadoCualificacion {
  puntuacion: number;
  prioridad: Prioridad;
  respuestas: RespuestasFormulario;
  fechaCreacion: string;
  codigo: string;
}
