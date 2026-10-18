import React from 'react';
import { Prioridad, RespuestasFormulario } from '../types/form';
interface Props { puntuacion: number; prioridad: Prioridad; respuestas: RespuestasFormulario; codigo: string; }
export const Resultado: React.FC<Props> = ({ puntuacion, prioridad, respuestas, codigo }) => {
  const color = prioridad === 'ALTA' ? 'bg-priority-high' : prioridad === 'MEDIA' ? 'bg-priority-medium' : 'bg-priority-low';
  const msg = prioridad === 'ALTA' ? 'Le llamaremos URGENTE.' : prioridad === 'MEDIA' ? 'Verificaremos y contactaremos.' : 'Le contactaremos a la mayor brevedad.';
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className={`${color} text-white p-6 rounded-lg shadow-lg mb-6`}>
        <h1 className="text-3xl font-bold mb-2">{msg}</h1>
        <p className="text-sm mt-4">Codigo: {codigo} | Puntuacion: {puntuacion} | Prioridad: {prioridad}</p>
      </div>
      {prioridad === 'ALTA' && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="font-semibold mb-2">Contacto:</h3>
          <p>Tel: {respuestas.telefono} | Email: {respuestas.email}</p>
          <button className="mt-4 px-4 py-2 bg-hvac-blue text-white rounded-lg">Segundo telefono</button>
        </div>
      )}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Resumen:</h3>
        <ul className="space-y-1 text-hvac-neutral">
          <li><b>Servicio:</b> {respuestas.tipoServicio}</li>
          <li><b>Sistema:</b> {respuestas.sistema}</li>
          <li><b>Alcance:</b> {respuestas.alcance}</li>
          <li><b>Urgencia:</b> {respuestas.urgencia}</li>
        </ul>
      </div>
    </div>
  );
};
