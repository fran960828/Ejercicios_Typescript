// 26. Crea una variable texto: string | null e intenta imprimir su longitud directamente.
//     Luego usa texto! para evitar el error (comenta por qué puede ser peligroso).
let texto: string | null = "Hola";
if (texto !== null) {
  console.log(texto.length);
} else {
  console.log("Esto es null");
}

// 27. Crea una función mostrarLongitud(s?: string) que use el operador ?. para imprimir s?.length sin errores.
function mostrarLongitud(s?: string): number | undefined {
  return s?.length;
}
console.log(mostrarLongitud("Francisco"));
console.log(mostrarLongitud());

// 28. Crea una variable valor = null y usa const resultado = valor ?? "Valor por defecto"; imprime el resultado.
let valor = null;
const resultado = valor ?? 29;
console.log(resultado);

// 29. Declara una función obtenerConfiguracion(cfg?: {modo?: string}) que imprima cfg?.modo ?? "estándar".
function obtenerConfiguracion(cfg?: { modo?: string }): string | undefined {
  let resultado = cfg?.modo ?? "estándar";
  return resultado;
}
console.log(obtenerConfiguracion());
console.log(obtenerConfiguracion({ modo: "oscuro" }));
// 30. a) Crea una función mostrarMensaje(msg: string): void que imprima el mensaje.
//     b) Crea otra función lanzarError(mensaje: string): never que lance una excepción.
//     c) Llama a ambas y comenta la diferencia entre void y never.
function mostrarMensaje(msg: string): void {
  console.log(msg);
}
function lanzarError(error: string): never {
  throw new Error(error);
}
mostrarMensaje("Hola esto es una prueba");
try {
  mostrarMensaje("Intentando conectar...");
  lanzarError("Conexión fallida");
  mostrarMensaje("Esto no se ejecuta"); // nunca llega aquí
} catch (e) {
  console.error("Se capturó un error:", (e as Error).message);
}
