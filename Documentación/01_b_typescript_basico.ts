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
