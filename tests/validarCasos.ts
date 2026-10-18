import { validarCasosPrueba } from '../src/rules/casosPrueba';
console.log('=== VALIDACION 15 CASOS ===');
const { exitoso, resultados } = validarCasosPrueba();
resultados.forEach(r => console.log(r));
console.log(exitoso ? 'TODOS OK' : 'ALGUNOS FALLARON');
if (!exitoso) process.exit(1);
