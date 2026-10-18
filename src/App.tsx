import { useState } from 'react';
import { Formulario } from './components/Formulario';
import { Resultado } from './components/Resultado';
import { Prioridad, RespuestasFormulario } from './types/form';
interface R { puntuacion: number; prioridad: Prioridad; respuestas: RespuestasFormulario; codigo: string; }
function App() {
  const [res, setRes] = useState<R | null>(null);
  return <div className="min-h-screen bg-gray-50">{res ? <Resultado {...res} /> : <Formulario onCompletar={setRes} />}</div>;
}
export default App;
