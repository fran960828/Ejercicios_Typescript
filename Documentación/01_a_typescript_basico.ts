/**
 * DOCUMENTACIÓN RÁPIDA DE TYPESCRIPT (para principiantes con nivel profesional)
 *
 * Este archivo muestra, con ejemplos que se pueden ejecutar en un .ts, cómo usar:
 *  - tipos primitivos (string, number, boolean)
 *  - declarar vs asignar variables (y buenas prácticas: const/let, evitar var)
 *  - any (por qué evitarlo) y alternativa safer: unknown
 *  - Union Types (p. ej. string | number)
 *  - Arrays y las distintas sintaxis: T[], (T|U)[], Array<T|U>
 *  - Tuplas (ej. [number])
 *  - Objetos tipados
 *  - Tipo {} que acepta cualquier valor salvo null y undefined (con strictNullChecks)
 *  - Record<string, number | string>
 *  - enum
 *  - Literal Types y type aliases
 *  - Declaración de parámetros y tipos de retorno en funciones: retornos con tipo concreto, void y never
 *
 * INSTRUCCIONES:
 *  - Copia este archivo a `ejemplos.ts` y compílalo con `tsc` (asegúrate de tener "strict": true en tsconfig.json
 *    para que las comprobaciones sean estrictas y las explicaciones sobre null/undefined sean válidas).
 *  - Los ejemplos imprimen en consola para que puedas ver el comportamiento.
 *
 * Nota sobre estilo/profesionalismo:
 *  - Prefiere `const` cuando no reasignarás la variable.
 *  - Prefiere tipos explícitos en API pública (funciones exportadas, parámetros, retornos).
 *  - Evita `any`; si necesitas flexibilidad, considera `unknown` y luego hacer type guards.
 *  - Usa type aliases y enums para claridad semántica.
 *  - Documenta invariantes (por ejemplo: "no puede ser null") con tipos y/o comentarios.
 */

/* ============================
   1) TIPOS PRIMITIVOS
   ============================ */

// Declaración explícita de tipos primitivos
const nombre: string = "María"; // string
let edad: number = 30; // number
let activo: boolean = true; // boolean

console.log("Nombre:", nombre);
console.log("Edad:", edad);
console.log("Activo:", activo);

/* ============================
   2) DECLARAR vs ASIGNAR (buenas prácticas)
   ============================
   - Declarar: reservar el identificador y opcionalmente su tipo.
   - Asignar: dar un valor.
   - Buena práctica: usar `const` por defecto, `let` si necesitas reasignar; evitar `var`.
*/

// declarar sin asignar (se puede dar tipo)
let contador: number; // solo declarado (tipo conocido), aún no asignado
contador = 1; // asignación posterior

// declarar y asignar a la vez (preferible cuando hay valor inicial)
const saludo: string = "Hola";

// mala práctica (antigua): var x = ... -> evita var por hoisting y scope confuso

console.log("Contador:", contador, "Saludo:", saludo);

/* ============================
   3) USO DE `any` (y alternativas)
   ============================
   - any desactiva comprobación de tipos; útil temporalmente pero peligrosísimo en producción.
   - preferir `unknown` si no conoces el tipo, luego hacer comprobaciones.
*/

// Ejemplo con any (no recomendado)
let libre: any = "texto";
libre = 42; // permitido con any
libre.propiedadNoExiste; // no hay error de compilación -> peligro en tiempo de ejecución

// Ejemplo con unknown (recomendado si no sabes el tipo)
let desconocido: unknown = "algo";

if (typeof desconocido === "string") {
  // el guard establece que ahora TypeScript sabe que es string
  console.log("Longitud:", desconocido.length);
}

/* ============================
   4) UNION TYPES
   ============================
   - Permiten que una variable admita varios tipos.
*/

type Id = string | number; // alias para reutilizar

const id1: Id = "abc123";
const id2: Id = 9876;

function imprimirId(id: Id) {
  // debo tratar ambos casos: number o string
  if (typeof id === "string") {
    console.log("ID-string en mayúsculas:", id.toUpperCase());
  } else {
    console.log("ID-number (formateado):", id.toFixed(0));
  }
}

imprimirId(id1);
imprimirId(id2);

/* ============================
   5) ARRAY TYPES: tres formas
   ============================
   - string[]            -> arreglo solo de strings
   - (string|number)[]   -> arreglo cuyos elementos pueden ser string o number
   - Array<string|number>-> equivalente a la anterior, sintaxis genérica
*/

// string[]
const frutas: string[] = ["manzana", "pera"];

// (string|number)[]
const mixto1: (string | number)[] = ["hola", 100, "mundo", 3];

// Array<string|number>
const mixto2: Array<string | number> = ["uno", 2, "tres"];

console.log(frutas, mixto1, mixto2);

/* ============================
   6) TUPLAS
   ============================
   - Una tupla fija: tipos y longitud conocida.
   - Ejemplo: [number] -> tupla con un solo número
*/

const tuplaUno: [number] = [42]; // tupla de un elemento que debe ser number
const tuplaMixta: [string, number] = ["edad", 25]; // dos elementos con tipos fijos

// Desestructurar tupla
const [valor] = tuplaUno;
console.log("Tupla uno:", tuplaUno, "desestructurado:", valor);
console.log("Tupla mixta:", tuplaMixta);

/* ============================
   7) OBJETOS TIPADOS
   ============================
   - Describe la forma (propiedades y sus tipos)
*/

type Persona = {
  name: string;
  age: number;
  hobbies: string[]; // array de strings
};

const personaEj: Persona = {
  name: "Carlos",
  age: 28,
  hobbies: ["futbol", "ajedrez"],
};

console.log("Persona:", personaEj);

/* ============================
   8) TIPO `{}` — cualquier valor salvo null/undefined (con strictNullChecks)
   ============================
   - `{} ` en TS representa "objeto no-primtivo vacío" en el sentido amplio:
     acepta valores que no sean null o undefined. Con `--strict` activado, `null` y `undefined`
     no son compatibles con `{}`.
   - No es el más útil para modelar datos (mejor usar interfaces/aliases concretos).
*/

let noNull: {} = { algo: 123 }; // válido
noNull = "cadena"; // también válido (string es asignable a {})
noNull = 55; // también válido
// noNull = null;                // ERROR si strictNullChecks = true
// noNull = undefined;           // ERROR si strictNullChecks = true

console.log("Valor noNull:", noNull);

/* ============================
   9) USO DE `Record<K,T>`
   ============================
   - Útil para tipar objetos cuya claves son de un tipo y los valores de otro.
*/

type Scores = Record<string, number | string>;
// ejemplo: claves dinámicas (nombres de usuario) y valores que pueden ser número o string
const puntuaciones: Scores = {
  alice: 10,
  bob: "participó", // permitimos también string
  charlie: 42,
};

console.log("Puntuaciones:", puntuaciones);

/* ============================
   10) ENUMS
   ============================
   - Const enum (si usas compilación con --preserveConstEnums=false) o enum estándar.
   - Proporcionan nombres legibles a valores numéricos o strings.
*/

enum Estado {
  Pendiente, // 0
  EnProgreso, // 1
  Listo, // 2
}

const tareaEstado: Estado = Estado.EnProgreso;
console.log(
  "Estado enum (numérico):",
  tareaEstado,
  "nombre:",
  Estado[tareaEstado]
);

// string enum
enum Direccion {
  Norte = "NORTE",
  Sur = "SUR",
  Este = "ESTE",
  Oeste = "OESTE",
}

console.log("Dirección:", Direccion.Norte);

/* ============================
   11) LITERAL TYPES y TYPE ALIASES
   ============================
   - Literal types restringen el valor a constantes específicas.
   - Type aliases (type) permiten dar nombre a tipos compuestos.
*/

type MetodoPago = "tarjeta" | "efectivo" | "paypal"; // literal type
const pago: MetodoPago = "tarjeta";
// pago = "bitcoin"; // ERROR: no está permitido

type Coordenada = { x: number; y: number }; // alias para un objeto con x,y
const punto: Coordenada = { x: 10, y: 20 };

console.log("Pago:", pago, "Punto:", punto);

/* ============================
   12) FUNCIONES: parámetros, retornos, void, never
   ============================
   - declarar tipos de parámetros y tipo de retorno
   - void: función que no retorna valor (retorna undefined)
   - never: función que nunca retorna (lanza error o bucle infinito)
*/

// función con parámetros tipados y retorno tipado
function sumar(a: number, b: number): number {
  return a + b;
}
console.log("Sumar 2+3 =", sumar(2, 3));

// función que retorna void (no devuelve valor útil)
function saludar(persona: Persona): void {
  console.log(`Hola, ${persona.name}! Tienes ${persona.age} años.`);
}
saludar(personaEj);

// función que nunca retorna normalmente: ejemplo lanzando error -> tipo never
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}

// llamarla provocará excepción en tiempo de ejecución, así que la dejamos comentada
// lanzarError("Esto es un error intencional para demostrar `never`");

/* ============================
   EXTRA: GUARDAS DE TIPO Y BUENAS PRÁCTICAS
   ============================
   - Usa type guards (typeof, instanceof, comprobaciones de propiedad) cuando trabajes con unions/unknown.
   - Para API públicas: documenta y exporta tipos (type/interface), evita any.
   - Usa `readonly` para propiedades que no deberían cambiar.
*/

type PuntoReadonly = {
  readonly x: number;
  readonly y: number;
};

const p: PuntoReadonly = { x: 1, y: 2 };
// p.x = 3; // ERROR: readonly

/* ============================
   EJEMPLO RESUMEN: función que combina muchos conceptos
   ============================ */

/**
 * convierte un id (string|number) y un conjunto de scores (Record<string, number|string>)
 * en un resumen legible. Retorna un objeto tipado (type alias).
 */

type Resumen = {
  id: Id;
  totalScores: number;
  detalles: Record<string, string>;
};

function generarResumen(id: Id, scores: Scores): Resumen {
  let total = 0;
  const detalles: Record<string, string> = {};

  for (const clave in scores) {
    const val = scores[clave];
    // normalizamos a string para detalles
    detalles[clave] = String(val);

    // sumamos solo si es number
    if (typeof val === "number") {
      total += val;
    }
  }

  return {
    id,
    totalScores: total,
    detalles,
  };
}

const resumen = generarResumen(id2, puntuaciones);
console.log("Resumen generado:", resumen);

/* ============================
   FIN — Conclusión práctica
   ============================
   - Este archivo demuestra las construcciones de tipos más usadas en TypeScript.
   - Recomendaciones finales:
     1) Activa "strict" en tsconfig.json para tener comprobaciones fuertes.
     2) Usa type aliases/interfaces para describir formas de datos.
     3) Evita `any`; usa `unknown` + guards si necesitas flexibilidad.
     4) Prefiere `const` y usa `readonly` cuando corresponda.
     5) Documenta la intención (por ejemplo: "no puede ser null") y refleja esa intención en el tipo.
*/

/* --------------------------
   Comentario final (para el usuario):
   - Puedes ejecutar este archivo con `ts-node` o compilar con `tsc` y ejecutar con `node`.
   - Si quieres, preparo versiones adicionales:
     * con ejemplos más orientados a APIs (fetch / axios),
     * con pruebas unitarias (Jest),
     * o una versión reducida para copy-paste en proyectos.
   - Dime cuál prefieres y lo hago.
   -------------------------- */
