import React from 'react';
interface Props { pasoActual: number; totalPasos: number; }
export const ProgressBar: React.FC<Props> = ({ pasoActual, totalPasos }) => {
  const pct = ((pasoActual - 1) / (totalPasos - 1)) * 100;
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2 text-sm font-semibold text-hvac-neutral">
        <span>Paso {pasoActual} de {totalPasos}</span><span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-hvac-blue h-2.5 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
};
