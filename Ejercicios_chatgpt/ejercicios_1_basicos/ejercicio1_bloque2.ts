/* 🔣 Bloque 2: Tipos especiales (any, unknown, null, undefined)
5. Declara una variable dato: any y asígnale distintos valores (string, número, objeto).
   Accede a una propiedad inexistente y comenta qué problema tiene any.
6. Declara una variable misterio: unknown y prueba a acceder a .length directamente.
   Luego usa un type guard (typeof) para poder hacerlo correctamente.
7. Declara una variable usuario: string | null e intenta asignarle undefined.
   Observa el error y comenta por qué ocurre.
8. Crea una función saluda(nombre?: string) que salude con "Hola, invitado" si no se pasa el parámetro.
   Usa un condicional if (nombre === undefined).*/

//    Ejercicio 5
let dato: any;
dato = 5;
dato = "Casa";
dato = false;
dato.nombre; //el problema de any es que al admitirlo todo pierde la ventaja de typescript que consiste en la detección de errores de tipo
//  Ejercicio 6
let misterio: unknown; //el uso de unknown siempre requiere un comprobación previa antes de usar alguna propiedad de otro tipo
if (typeof misterio === "string") {
  console.log(misterio.length);
}
// Ejercicio 7
let usuario: string | null;
usuario = "undefined"; //no se puede usar undefined porque la variable solo admite string o null

// Ejercicio 8
function saludar(nombre?: string): void {
  if (nombre === undefined) {
    console.log("Hola invitado");
  } else {
    console.log(`Hola ${nombre}`);
  }
}
saludar("Fran");
saludar();
