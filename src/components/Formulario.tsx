import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProgressBar } from './ProgressBar';
import { cualificarLead } from '../rules/puntuacion';
import { RespuestasFormulario, Prioridad } from '../types/form';
interface Props { onCompletar: (r: { puntuacion: number; prioridad: Prioridad; respuestas: RespuestasFormulario; codigo: string }) => void; }
export const Formulario: React.FC<Props> = ({ onCompletar }) => {
  const [paso, setPaso] = useState(1);
  const [codigo] = useLocalStorage('codigo', `HVAC-${Date.now().toString(36).toUpperCase()}`);
  const [r, setR] = useLocalStorage<Partial<RespuestasFormulario>>('respuestas', {});
  const upd = (k: keyof RespuestasFormulario, v: any) => setR({ ...r, [k]: v });
  const enviar = () => {
    const rc = r as RespuestasFormulario;
    if (!rc.consentimiento) { alert('Acepta el consentimiento'); return; }
    const { puntuacion, prioridad } = cualificarLead(rc.tipoServicio, rc.sistema, rc.alcance, rc.urgencia);
    const regs = JSON.parse(localStorage.getItem('registrosHVAC') || '[]');
    regs.push({ puntuacion, prioridad, respuestas: rc, codigo, fechaCreacion: new Date().toISOString() });
    localStorage.setItem('registrosHVAC', JSON.stringify(regs));
    localStorage.removeItem('respuestas'); localStorage.removeItem('codigo');
    onCompletar({ puntuacion, prioridad, respuestas: rc, codigo });
  };
  const opts = (label: string, values: { v: string; t: string }[]) => (
    <><option value="">{label}</option>{values.map(x => <option key={x.v} value={x.v}>{x.t}</option>)}</>
  );
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-hvac-accent mb-2">Formulario HVAC</h1>
      <p className="text-sm text-hvac-neutral mb-4">Codigo: {codigo}</p>
      <ProgressBar pasoActual={paso} totalPasos={4} />
      {paso === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Tipo de Servicio</h2>
          <select value={r.tipoServicio || ''} onChange={e => upd('tipoServicio', e.target.value)} className="w-full p-3 border rounded-lg">
            {opts('Selecciona...', [{ v: 'presupuesto', t: 'Presupuesto' }, { v: 'ayuda_configuracion', t: 'Ayuda configuracion' }, { v: 'mantenimiento_programado', t: 'Mantenimiento' }, { v: 'averia_domicilio', t: 'Averia domicilio' }, { v: 'urgencia_negocio', t: 'Urgencia negocio' }])}
          </select>
        </div>
      )}
      {paso === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Sistema y Alcance</h2>
          <select value={r.sistema || ''} onChange={e => upd('sistema', e.target.value)} className="w-full p-3 border rounded-lg">
            {opts('Sistema...', [{ v: 'solar', t: 'Solar' }, { v: 'aerotermia', t: 'Aerotermia' }, { v: 'aacc', t: 'AACC' }, { v: 'vrv', t: 'VRV' }, { v: 'caldera', t: 'Caldera' }])}
          </select>
          <select value={r.alcance || ''} onChange={e => upd('alcance', e.target.value)} className="w-full p-3 border rounded-lg">
            {opts('Alcance...', [{ v: 'habitacion', t: 'Habitacion (1)' }, { v: 'hogar', t: 'Hogar (2-10)' }, { v: 'comercio', t: 'Comercio (11-30)' }, { v: 'bloque', t: 'Bloque (31-80)' }, { v: 'edificio', t: 'Edificio (+80)' }])}
          </select>
        </div>
      )}
      {paso === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Urgencia</h2>
          <select value={r.urgencia || ''} onChange={e => upd('urgencia', e.target.value)} className="w-full p-3 border rounded-lg">
            {opts('Urgencia...', [{ v: 'lo_antes_posible', t: 'Lo antes posible' }, { v: 'menos_de_un_mes', t: 'Menos de un mes' }, { v: 'proximos_15_dias', t: 'Proximos 15 dias' }, { v: 'durante_la_semana', t: 'Durante la semana' }, { v: '48h_o_busco_otra', t: '48h o busco otra' }])}
          </select>
        </div>
      )}
      {paso === 4 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Contacto</h2>
          <input type="text" placeholder="Nombre" value={r.nombre || ''} onChange={e => upd('nombre', e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Direccion" value={r.direccion || ''} onChange={e => upd('direccion', e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="tel" placeholder="Telefono" value={r.telefono || ''} onChange={e => upd('telefono', e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="email" placeholder="Email" value={r.email || ''} onChange={e => upd('email', e.target.value)} className="w-full p-3 border rounded-lg" />
          <label className="flex items-start space-x-2">
            <input type="checkbox" checked={r.consentimiento || false} onChange={e => upd('consentimiento', e.target.checked)} className="mt-1" />
            <span className="text-sm text-hvac-neutral">Acepto el tratamiento de mis datos.</span>
          </label>
        </div>
      )}
      <div className="flex justify-between mt-8">
        {paso > 1 && <button onClick={() => setPaso(paso - 1)} className="px-6 py-3 bg-gray-300 rounded-lg">Anterior</button>}
        {paso < 4 ? <button onClick={() => setPaso(paso + 1)} className="px-6 py-3 bg-hvac-blue text-white rounded-lg ml-auto">Siguiente</button> : <button onClick={enviar} className="px-6 py-3 bg-hvac-orange text-white rounded-lg ml-auto">Enviar</button>}
      </div>
    </div>
  );
};
