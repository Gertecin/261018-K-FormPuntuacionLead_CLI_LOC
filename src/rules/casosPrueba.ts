import { cualificarLead } from './puntuacion';
import { TipoServicio, Sistema, Alcance, Urgencia, Prioridad } from '../types/form.ts';
export interface CasoPrueba { id: number; ts: TipoServicio; s: Sistema; a: Alcance; u: Urgencia; expP: Prioridad; expN: number; }
export const casosPrueba: CasoPrueba[] = [
  { id: 1, ts: 'urgencia_negocio', s: 'caldera', a: 'edificio', u: '48h_o_busco_otra', expP: 'ALTA', expN: 20 },
  { id: 2, ts: 'urgencia_negocio', s: 'vrv', a: 'bloque', u: 'durante_la_semana', expP: 'ALTA', expN: 17 },
  { id: 3, ts: 'averia_domicilio', s: 'vrv', a: 'bloque', u: 'proximos_15_dias', expP: 'ALTA', expN: 15 },
  { id: 4, ts: 'averia_domicilio', s: 'aacc', a: 'comercio', u: 'proximos_15_dias', expP: 'MEDIA', expN: 13 },
  { id: 5, ts: 'mantenimiento_programado', s: 'vrv', a: 'hogar', u: 'durante_la_semana', expP: 'MEDIA', expN: 13 },
  { id: 6, ts: 'mantenimiento_programado', s: 'aacc', a: 'comercio', u: 'proximos_15_dias', expP: 'MEDIA', expN: 12 },
  { id: 7, ts: 'averia_domicilio', s: 'aerotermia', a: 'hogar', u: 'proximos_15_dias', expP: 'MEDIA', expN: 11 },
  { id: 8, ts: 'mantenimiento_programado', s: 'aacc', a: 'hogar', u: 'durante_la_semana', expP: 'MEDIA', expN: 12 },
  { id: 9, ts: 'ayuda_configuracion', s: 'vrv', a: 'bloque', u: 'proximos_15_dias', expP: 'MEDIA', expN: 13 },
  { id: 10, ts: 'ayuda_configuracion', s: 'aacc', a: 'comercio', u: 'durante_la_semana', expP: 'MEDIA', expN: 12 },
  { id: 11, ts: 'presupuesto', s: 'caldera', a: 'edificio', u: 'proximos_15_dias', expP: 'MEDIA', expN: 14 },
  { id: 12, ts: 'presupuesto', s: 'solar', a: 'habitacion', u: 'lo_antes_posible', expP: 'BAJA', expN: 4 },
  { id: 13, ts: 'presupuesto', s: 'aerotermia', a: 'hogar', u: 'lo_antes_posible', expP: 'BAJA', expN: 6 },
  { id: 14, ts: 'ayuda_configuracion', s: 'solar', a: 'habitacion', u: 'menos_de_un_mes', expP: 'BAJA', expN: 6 },
  { id: 15, ts: 'presupuesto', s: 'aacc', a: 'hogar', u: 'menos_de_un_mes', expP: 'BAJA', expN: 8 },
];
export function validarCasosPrueba() {
  const resultados: string[] = [];
  let exitoso = true;
  casosPrueba.forEach(c => {
    const r = cualificarLead(c.ts, c.s, c.a, c.u);
    const ok = r.puntuacion === c.expN && r.prioridad === c.expP;
    if (!ok) exitoso = false;
    resultados.push(`Caso ${c.id}: ${ok ? 'OK' : 'FAIL'} Esperado: ${c.expP}(${c.expN}) | Obtenido: ${r.prioridad}(${r.puntuacion})`);
  });
  return { exitoso, resultados };
}
