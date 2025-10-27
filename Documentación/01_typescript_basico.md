# 📘 TypeScript Básico - Parte 1 y 2

Este documento combina el contenido de los archivos:
- `01_a_typescript_basico.ts`
- `01_b_typescript_basico.ts`

---

## 🧩 Parte 1: 01_a_typescript_basico.ts

```ts
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

```

---

## 🧩 Parte 2: 01_b_typescript_basico.ts

```ts
/**
 * DOCUMENTACIÓN: TIPOS AVANZADOS Y CONTROL DE NULL/UNDEFINED EN TYPESCRIPT
 *
 * Propósito:
 *  - Esta guía está pensada para principiantes con intención profesional.
 *  - Explica y demuestra con ejemplos (ejecutables en un archivo .ts) conceptos clave:
 *      • Pasar funciones como parámetros / Arrow functions
 *      • Null y Undefined (tipos separados) y cómo TS los trata con `--strict`
 *      • Operador de aserción no nula `!` y operador opcional `?`
 *      • Parámetros opcionales y propiedades opcionales en objetos
 *      • Tipos DOM: HTMLElement y elementos concretos (HTMLInputElement, HTMLButtonElement...)
 *      • Aserciones con `as`
 *      • Tipo `unknown` y trato seguro con type-guards
 *      • Operador nullish coalescing `??`
 *
 * Instrucciones rápidas:
 *  - Recomiendo compilar con `tsc --noEmit` o ejecutar con `ts-node` usando un tsconfig con `"strict": true`.
 *  - Si pruebas el código que accede al DOM, ejecútalo en un entorno con `dom` (p. ej. una página web o Deno/ts-node con libs apropiadas).
 *
 * Estructura:
 *  - Cada bloque contiene: explicación breve y un ejemplo comentado línea a línea.
 */

/* ===========================================================
   1) EMPLEAR UNA FUNCIÓN COMO PARÁMETRO (callbacks) y Arrow functions
   ===========================================================
   - Tip: declarar la firma del callback para que TypeScript valide el uso.
*/

type Callback = (n: number) => number; // alias de tipo: función que recibe number y devuelve number

/**
 * applyTwice: recibe un number y una función (callback).
 * - muestra cómo pasar una función normal y una arrow function.
 */
function applyTwice(value: number, cb: Callback): number {
  // Llamamos al callback dos veces y devolvemos el resultado final
  const first = cb(value);
  const second = cb(first);
  return second;
}

// Ejemplo: función tradicional
function addOne(x: number): number {
  return x + 1;
}

// Ejemplo: arrow function (concisa)
const multiplyByTwo: Callback = (x) => x * 2;

// Uso
const result1 = applyTwice(5, addOne); // (5 +1) +1 = 7
const result2 = applyTwice(5, multiplyByTwo); // ((5*2)*2) = 20

console.log("applyTwice con addOne:", result1);
console.log("applyTwice con multiplyByTwo:", result2);

/* ===========================================================
   2) NULL TYPE y UNDEFINED TYPE
   ===========================================================
   - En TS con `--strict`:
 *    - `null` y `undefined` no están permitidos en tipos que no los incluyan explícitamente.
 *    - Puedes escribir `string | null` o `number | undefined`.
   - Diferencia práctica:
 *    - `undefined`: normalmente indica "no asignado" (p. ej. parámetro no pasado).
 *    - `null`: asignación explícita "vacío".
*/

// Variable que puede ser null o string
let posibleNombre: string | null = null; // explícitamente permitimos null
// posibleNombre = undefined; // ERROR: undefined no está permitido (a menos que lo incluyamos en el union)

posibleNombre = "Luisa";
console.log("posibleNombre:", posibleNombre);

// Parámetro opcional (implícitamente `undefined` si no se pasa)
function saludarOpcional(name?: string) {
  // `name` es de tipo string | undefined
  if (name === undefined) {
    console.log("Hola, invitado!");
  } else {
    console.log("Hola,", name);
  }
}

saludarOpcional(); // name = undefined
saludarOpcional("Ana"); // name = "Ana"

/* ===========================================================
   3) OPERADOR `!` (NON-NULL ASSERTION) y OPERADOR `?` (OPTIONAL / NULLABLE)
   ===========================================================
   - `!` le dice al compilador "confía en mí: esto no es null/undefined".
     Úsalo con mucha cautela: si estás equivocado se producirá un error en tiempo de ejecución.
   - `?` en parámetros o propiedades hace que sean opcionales (tipo incluye undefined).
   - `?` en tipos como `prop?: T` equivale a `prop: T | undefined`.
*/

// Ejemplo peligroso con `!`
// Imaginemos que obtienes un elemento del DOM que sabes que existe
// const el = document.getElementById("mi-id")!; // si no existe, en runtime será null y provocarás error
// Para evitar crash, mejor comprobar primero:
declare const document: any; // declaración para evitar errores de compilación si ejecutas en Node sin DOM

function ejemploNonNullAssertion() {
  // Supongamos que intentamos leer un input del DOM; aquí mostramos la forma segura y la no segura.

  // Forma segura: guard y aserción de tipo
  const maybeEl =
    typeof document !== "undefined"
      ? document.getElementById("mi-input")
      : null;
  if (maybeEl instanceof HTMLInputElement) {
    // TypeScript infiere que maybeEl no es null y que es HTMLInputElement
    console.log("Valor seguro:", maybeEl.value);
  } else {
    console.log("Elemento no encontrado o no es input");
  }

  // Forma con `!` (no recomendada salvo que estés 100% seguro)
  // const unsafe = document.getElementById("mi-input")! as HTMLInputElement;
  // console.log("Valor (unsafe):", unsafe.value);
}

/* ===========================================================
   4) PARÁMETROS OPCIONALES y PROPIEDADES OPCIONALES EN OBJETOS
   ===========================================================
   - Parámetro opcional: function foo(a?: T) -> a: T | undefined
   - Propiedad opcional: interface X { p?: T } -> p?: T (puede estar ausente o ser undefined)
*/

type Config = {
  url: string;
  timeout?: number; // opcional: puede no estar presente
  debug?: boolean | null; // opcional y además puede ser null si lo deseamos
};

function connect(cfg: Config) {
  // Uso seguro de valores opcionales usando nullish coalescing más abajo
  const timeoutToUse = cfg.timeout ?? 5000; // si cfg.timeout es undefined -> 5000
  console.log(`Conectando a ${cfg.url} con timeout ${timeoutToUse}ms`);
}

connect({ url: "https://api.ejemplo.com" }); // sin timeout -> usa 5000
connect({ url: "https://api.ejemplo.com", timeout: 1000 });

/* ===========================================================
   5) USO DE HTMLElement y ELEMENTOS MÁS ESPECÍFICOS
   ===========================================================
   - En TypeScript existen tipos DOM específicos:
 *    - HTMLElement (genérico)
 *    - HTMLInputElement, HTMLButtonElement, HTMLDivElement, ...
   - Al obtener elementos desde el DOM `getElementById` retorna `HTMLElement | null`.
   - Sugerencia profesional: comprobar la instancia o usar `as` tras verificación.
*/

// Ejemplo: obtén un input y lee su value (forma segura)
function ejemploDOM() {
  if (typeof document === "undefined") {
    console.log("[ejemploDOM] No hay DOM en este entorno.");
    return;
  }

  const maybeInput = document.getElementById("mi-input");
  // Comprobación de tipo en runtime -> luego TS entiende que es HTMLInputElement
  if (maybeInput && maybeInput instanceof HTMLInputElement) {
    const valor: string = maybeInput.value; // seguro
    console.log("Input value seguro:", valor);
  } else {
    console.log("Input no encontrado o no es HTMLInputElement.");
  }

  // Otra forma: usar `as` si ya validaste de otra manera (ejemplo ilustrativo)
  // const inputFuerza = document.getElementById("mi-input") as HTMLInputElement | null;
  // if (inputFuerza) console.log("Valor con as:", inputFuerza.value);
}

/* ===========================================================
   6) USO DE `as` (TYPE ASSERTION)
   ===========================================================
   - `as` no cambia el valor en runtime; sólo le dice al compilador que trate la expresión como otro tipo.
   - Úsalo cuando sepas más que el compilador (por ejemplo tras comprobaciones).
*/

// Ejemplo de `as` para convertir un valor unknown a string (después de guard)
function ejemploAs(valor: unknown) {
  // No podemos acceder a propiedades de `valor` hasta verificar su tipo
  if (typeof valor === "string") {
    // Podemos hacer una aserción si necesitamos (aunque aquí no es necesaria)
    const s = valor as string;
    console.log("Longitud de la cadena (mediante as):", s.length);
  } else {
    console.log("No es una string");
  }
}

/* ===========================================================
   7) `unknown` TYPE y COMO TRATARLO (type guards)
   ===========================================================
   - `unknown` es el tipo seguro alternativo a `any`.
   - No puedes usar propiedades ni asignarlo a otro tipo sin comprobar antes.
*/

function tratarUnknown(u: unknown) {
  // Error si intentas usarlo directamente:
  // console.log(u.length); // ERROR: Object is of type 'unknown'.

  // Ejemplo de guards:
  if (typeof u === "string") {
    // Aqui TypeScript entiene que u es string
    console.log("String:", u.toUpperCase());
  } else if (typeof u === "number") {
    console.log("Number:", u.toFixed(2));
  } else if (Array.isArray(u)) {
    console.log("Array con longitud:", u.length);
  } else {
    console.log("Tipo desconocido:", u);
  }
}

// Ejecutar tratarUnknown con distintos tipos
tratarUnknown("hola");
tratarUnknown(3.1415);
tratarUnknown([1, 2, 3]);
tratarUnknown({ foo: "bar" });

/* ===========================================================
   8) OPERADOR NULLISH COALESCING `??`
   ===========================================================
   - `a ?? b` devuelve `a` si `a` no es `null` ni `undefined`, sino `b`.
   - Diferencia con `||`: `||` considera falsy (0, "", false) como fallback; `??` no.
*/

const valorNumero = 0;
const fallback1 = valorNumero || 10; // -> 10 (porque 0 es falsy)
const fallback2 = valorNumero ?? 10; // -> 0 (porque no es null ni undefined)

console.log("fallback (||):", fallback1);
console.log("fallback (??):", fallback2);

// Uso práctico con configuración
function ejemploNullish(cfg?: { retries?: number }) {
  // Si cfg.retries es 0 queremos conservarlo; por eso usamos `??`
  const retries = cfg?.retries ?? 3;
  console.log("Retries:", retries);
}

ejemploNullish({ retries: 0 }); // imprime 0
ejemploNullish(); // imprime 3

/* ===========================================================
   9) EJEMPLO COMPLETO QUE COMBINA VARIOS CONCEPTOS
   ===========================================================
   - Creamos una función que recibe:
 *   - un callback (función como parámetro)
 *   - un valor desconocido (unknown) que puede ser string | number | null | undefined
 *   - una referencia opcional a un input del DOM (por id)
   - La función debe:
 *   - validar el unknown, convertirlo a número si es posible
 *   - aplicar el callback
 *   - devolver el resultado o un valor por defecto con `??`
*/

type Processor = (n: number) => number;

function processInput(
  raw: unknown,
  proc: Processor,
  inputId?: string // opcional: id de un input del DOM que contiene un número como string
): number {
  // 1) obtener un número base a partir de `raw`
  let base: number | null = null;

  if (typeof raw === "number") {
    base = raw;
  } else if (typeof raw === "string") {
    const parsed = Number(raw);
    base = Number.isFinite(parsed) ? parsed : null;
  } else {
    base = null;
  }

  // 2) si hay inputId consultamos el DOM (si existe) — forma segura
  if (inputId && typeof document !== "undefined") {
    const el = document.getElementById(inputId);
    if (el instanceof HTMLInputElement) {
      const maybeNum = Number(el.value);
      if (Number.isFinite(maybeNum)) {
        base = maybeNum; // sobrescribimos base si input contiene número válido
      }
    }
  }

  // 3) Si a estas alturas base es null/undefined, usamos un fallback con `??`
  //    Aquí usamos `0` como valor por defecto pero esto podría venir de config.
  const safeBase = base ?? 0;

  // 4) aplicamos la función `proc` (callback) -- demostrar arrow usage
  const res = proc(safeBase);

  return res;
}

// Uso del ejemplo completo:
const double: Processor = (n) => n * 2; // arrow function como Processor
console.log("processInput con raw '7':", processInput("7", double)); // -> 14
console.log("processInput con raw null:", processInput(null, double)); // -> 0 -> *2 = 0

/* ===========================================================
   10) BUENAS PRÁCTICAS PROFESIONALES (resumidas)
   ===========================================================
   - Habilitar `strict` y `noUncheckedIndexedAccess` en tsconfig para comprobaciones fuertes.
   - Preferir `unknown` sobre `any`.
   - Evitar `!` salvo tras comprobaciones o cuando es imposible que sea null por diseño.
   - Utilizar `??` cuando quieras diferenciar entre `0`/`""`/`false` y `null`/`undefined`.
   - Comprobar elementos del DOM con `instanceof` antes de usar `as`.
   - Documentar la intención: usa comentarios y type aliases para dejar claro qué valores son permitidos.
 */

/**
 * COMENTARIO FINAL (TRAS LA EXPLICACIÓN):
 *
 * - Este archivo muestra ejemplos comentados que puedes copiar a un `ejemplos.ts`.
 * - Recomendación para pruebas:
 *     1) Para probar la parte DOM: colócalo en una página HTML con un input id="mi-input" y ejecuta el bundle/transpilado en el navegador.
 *     2) Para probar la parte no-DOM: ejecuta con `ts-node` o `node` después de compilar; las funciones que acceden al DOM detectan si `document` no existe.
 *
 * - Si quieres, puedo:
 *     • Adaptar los ejemplos para un proyecto React (con JSX/TSX) y mostrar tipos de eventos (React.ChangeEvent<HTMLInputElement>).
 *     • Escribir tests unitarios (Jest) que verifiquen las funciones `applyTwice`, `processInput`, etc.
 *     • Crear una README resumida con las reglas de estilo recomendadas para tu equipo.
 *
 * Fin de la documentación.
 */

```
