import { TipoServicio, Sistema, Alcance, Urgencia, Prioridad } from '../types/form.ts';
export const reglasPuntuacion = {
  tipoServicio: { presupuesto: 1, ayuda_configuracion: 2, mantenimiento_programado: 3, averia_domicilio: 4, urgencia_negocio: 5 } as Record<TipoServicio, number>,
  sistema: { solar: 1, aerotermia: 2, aacc: 3, vrv: 4, caldera: 5 } as Record<Sistema, number>,
  alcance: { habitacion: 1, hogar: 2, comercio: 3, bloque: 4, edificio: 5 } as Record<Alcance, number>,
  urgencia: { lo_antes_posible: 1, menos_de_un_mes: 2, proximos_15_dias: 3, durante_la_semana: 4, '48h_o_busco_otra': 5 } as Record<Urgencia, number>,
};
export function calcularPuntuacion(ts: TipoServicio, s: Sistema, a: Alcance, u: Urgencia): number {
  return reglasPuntuacion.tipoServicio[ts] + reglasPuntuacion.sistema[s] + reglasPuntuacion.alcance[a] + reglasPuntuacion.urgencia[u];
}
export function determinarPrioridad(p: number): Prioridad {
  if (p >= 15) return 'ALTA';
  if (p >= 9) return 'MEDIA';
  return 'BAJA';
}
export function cualificarLead(ts: TipoServicio, s: Sistema, a: Alcance, u: Urgencia) {
  const puntuacion = calcularPuntuacion(ts, s, a, u);
  return { puntuacion, prioridad: determinarPrioridad(puntuacion) };
}
