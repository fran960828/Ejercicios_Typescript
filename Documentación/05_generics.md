```ts
/*
  DOCUMENTACIÓN: Genéricos en TypeScript
  Autor: ChatGPT (rol: Experto en TypeScript)
  Objetivo: Explicar de forma clara y práctica los conceptos básicos y avanzados
            sobre *generics* en TypeScript para que un principiante pueda
            aplicarlos de forma profesional.

  Estructura del documento:
  1) Explicación teórica (en formato de comentario)
  2) Ejemplos sencillos y bien comentados para cada concepto
  3) Buenas prácticas y errores comunes

  Nota: Los ejemplos están escritos en TypeScript y contienen comentarios
        en cada paso para facilitar la comprensión. Copia y pega los bloques
        de código en un archivo .ts o en el playground de TypeScript para
        probarlos.
*/
```

# Guía: Uso de *Generics* en TypeScript (para principiantes con nivel profesional)

> **Resumen al inicio (en forma de comentario):**
>
> Los *generics* de TypeScript permiten escribir código que trabaja con diferentes tipos sin perder la seguridad de tipos. En lugar de fijar un tipo concreto (como `string` o `number`), los *generics* usan marcadores de posición (por ejemplo `<T>`) que se sustituyen por tipos reales cuando se usan. Esto hace que las funciones, tipos, interfaces y clases sean reutilizables y tipo-seguras.

---

## Índice

1. Uso de generic types predefinidos: `Array<string>` vs `string[]`
2. Generic types propios: `type DataStore<T>`
3. Funciones genéricas: marcador de posición `<T>`
4. Múltiples marcadores de posición: `<T, U>`
5. Constraints con `extends`: `T extends object` (o interfaces específicas)
6. Genéricos en clases e interfaces
7. Buenas prácticas y errores comunes
8. Ejemplos completos y explicación paso a paso

---

## 1) Uso de generic types predefinidos: `Array<string>` vs `string[]`

**Explicación:**

TypeScript ofrece formas distintas (equivalentes) de anotar arrays:

- Notación con corchetes: `string[]` — simple y compacta.
- Notación genérica: `Array<string>` — explícita y consistente con otros genéricos (por ejemplo `Promise<number>`).

Ambas significan exactamente lo mismo: "un array cuyos elementos son `string`". La elección suele ser de estilo o de claridad cuando los tipos son complejos (por ejemplo `Array<Record<string, number>>` puede leerse más fácil que `Record<string, number>[]`).

**Ejemplo:**

```ts
// string[] (notación común)
const nombres: string[] = ["Ana", "Luis"];

// Array<string> (notación genérica equivalente)
const apellidos: Array<string> = ["Pérez", "García"];

// Ambos compilan y usan las mismas operaciones de array:
const primerNombre = nombres[0]; // tipo: string
const totalNombres = nombres.length; // tipo: number

// Cuando los tipos son complejos, Array<T> puede ser más legible:
const registros: Array<{ id: number; valor: string }> = [
  { id: 1, valor: "uno" },
];

// Error de ejemplo: asignar número a string[] -> TypeScript detecta el error
// nombres.push(42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

---

## 2) Uso de generic types en nuestros propios types: `type DataStore<T>`

**Explicación:**

Podemos definir alias de tipo que acepten parámetros genéricos. Esto permite reutilizar la estructura para diferentes tipos de dato manteniendo la seguridad de tipos.

**Ejemplo:**

```ts
// Definimos un DataStore genérico que guarda valores indexados por clave.
// T es el marcador de posición que representará el tipo del valor guardado.

type DataStore<T> = {
  get: (key: string) => T | undefined; // devuelve T o undefined si no existe
  set: (key: string, value: T) => void; // guarda un valor de tipo T
  keys: () => string[]; // retorna las claves disponibles
};

// Creamos una implementación sencilla usando un objeto interno:
function createDataStore<T>(): DataStore<T> {
  const map: Record<string, T> = {};

  return {
    get(key: string) {
      return map[key];
    },
    set(key: string, value: T) {
      map[key] = value;
    },
    keys() {
      return Object.keys(map);
    },
  };
}

// Usamos DataStore para guardar números:
const storeNumbers = createDataStore<number>();
storeNumbers.set("pi", 3.14);
const pi = storeNumbers.get("pi"); // tipo: number | undefined

// Usamos DataStore para guardar objetos con forma específica:
interface Usuario { id: string; nombre: string }
const storeUsuarios = createDataStore<Usuario>();
storeUsuarios.set("u1", { id: "u1", nombre: "Lucía" });
const usuario = storeUsuarios.get("u1"); // tipo: Usuario | undefined

// Ventaja: la misma estructura DataStore sirve para cualquier tipo T.
```

---

## 3) Uso de funciones genéricas con un marcador de posición `<T>`

**Explicación:**

Las funciones genéricas permiten que sus parámetros y/o su valor de retorno usen tipos que se deciden cuando se llama a la función. El marcador `<T>` se define justo después del nombre de la función (o antes si es función anónima) y luego se puede usar en la firma.

**Ejemplo:**

```ts
// Función genérica que envuelve un valor en un array (identity-to-array)
function wrapInArray<T>(value: T): T[] {
  return [value]; // devuelve un array con el valor, tipo: T[]
}

const n = wrapInArray(42); // TypeScript infiere T = number -> n: number[]
const s = wrapInArray("hola"); // T = string -> s: string[]

// También se puede indicar explícitamente el tipo:
const explícito = wrapInArray<boolean>(true); // explícito: T = boolean

// Otro ejemplo: función que devuelve el primer elemento con tipo conservado
function firstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

const primer = firstElement(["x", "y"]); // tipo: string | undefined
```

---

## 4) Uso de generic types o funciones genéricas con varios marcadores de posición `<T, U>`

**Explicación:**

Puedes declarar múltiples parámetros genéricos para relacionar distintos componentes del tipo entre sí. Esto es útil cuando una estructura necesita mantener relación entre distintos tipos.

**Ejemplo:**

```ts
// Función que combina una clave con un valor en un par genérico
function pair<T, U>(key: T, value: U) {
  return { key, value };
}

const p1 = pair<string, number>("edad", 30); // p1: { key: string; value: number }
// TypeScript suele inferir los tipos por los argumentos:
const p2 = pair("activo", true); // infiere T = string, U = boolean

// Tipo genérico con dos parámetros:

type Entry<K, V> = { k: K; v: V };
const e: Entry<number, string> = { k: 1, v: "uno" };
```

---

## 5) Uso de constraints para poner una restricción al tipo genérico con `extends` (ej: `T extends object`)

**Explicación:**

En ocasiones necesitamos que el tipo genérico cumpla ciertas condiciones (p. ej. que sea un objeto, que tenga una propiedad específica, etc.). Usamos `extends` para imponer esa restricción. Si no se cumple, TypeScript marcará error al instanciar el genérico.

**Ejemplo 1 — restringir a **``**:**

```ts
// Queremos una función que copie propiedades (shallow) solo de objetos
function shallowCopy<T extends object>(obj: T): T {
  return { ...obj } as T;
}

const original = { a: 1, b: 2 };
const copia = shallowCopy(original); // OK

// shallowCopy(42); // Error: number no extiende object
```

**Ejemplo 2 — restringir a tipos que tengan una propiedad **``**:**

```ts
// Definimos la forma mínima esperada con una interfaz
interface HasId { id: string }

function getId<T extends HasId>(obj: T) {
  return obj.id; // TypeScript sabe que `id` existe
}

const item = { id: "x1", name: "Artículo" };
getId(item); // OK

// const bad = getId({ name: "sin id" }); // Error: falta la propiedad 'id'
```

---

## 6) Uso de generics en clases e interfaces

**Explicación:**

Las clases y las interfaces pueden ser genéricas. Esto es muy útil para estructuras de datos (como pilas, colas, repositorios) que deben ser reutilizables para distintos tipos de elementos.

**Ejemplo — Clase Stack genérica:**

```ts
class Stack<T> {
  private items: T[] = []; // usamos T para los elementos internos

  push(item: T) {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const stackNumbers = new Stack<number>();
stackNumbers.push(1);
stackNumbers.push(2);
const top = stackNumbers.pop(); // tipo: number | undefined

const stackStrings = new Stack<string>();
stackStrings.push("a");

// Interfaces genéricas:
interface Repository<T, ID = string> { // ID tiene un valor por defecto
  findById(id: ID): T | undefined;
  save(entity: T): void;
}

// Implementación ejemplo
class MemoryRepo<T extends { id: string }> implements Repository<T> {
  private map = new Map<string, T>();

  findById(id: string) {
    return this.map.get(id);
  }

  save(entity: T) {
    this.map.set(entity.id, entity);
  }
}

interface Producto { id: string; nombre: string }
const repo = new MemoryRepo<Producto>();
repo.save({ id: "p1", nombre: "Camiseta" });
```

---

## 7) Buenas prácticas y errores comunes

- **Preferir inferencia cuando sea claro.** Escriba `wrapInArray(2)` y deje que TS infiera `T = number` en lugar de `wrapInArray<number>(2)` salvo que necesite forzar un tipo.
- **Usar nombres descriptivos cuando hace falta claridad:** `<T>` está bien para ejemplos, pero en APIs públicas considera `<Entity, ID>` o `<TData>`.
- **Evitar **``**:** No reemplace genéricos con `any` porque pierde la seguridad de tipos. Use `unknown` si necesita un punto de partida seguro.
- **Preferir constraints a las aserciones:** En vez de `as Foo`, usar `T extends Foo` para obtener seguridad estática.
- **Documentar la relación entre parámetros genéricos:** Si `U` depende de `T`, explícalo en comentarios.
- **Usar valores por defecto en parámetros genéricos** cuando tenga sentido (`ID = string`).

Errores comunes:

- Intentar usar operaciones que no existen en el tipo genérico sin restricciones.
- Pensar que `<T>` añade comportamiento en tiempo de ejecución (no lo hace): solo afecta al sistema de tipos en tiempo de compilación.

---

## 8) Ejemplos completos y explicados paso a paso

A continuación un ejemplo combinado que ilustra muchas de las ideas anteriores.

```ts
/* Ejemplo combinado: Repositorio genérico en memoria con restricciones
   - Repository<T, ID> (interfaz genérica)
   - MemoryRepo<T extends { id: ID }, ID = string> (clase genérica con constraint)
   - Funciones auxiliares genéricas (p.ej. clone)
*/

interface Repository<T, ID = string> {
  findById(id: ID): T | undefined;
  save(entity: T): void;
  all(): T[];
}

class MemoryRepo<T extends { id: ID }, ID = string> implements Repository<T, ID> {
  private map = new Map<ID, T>();

  constructor(initial: T[] = []) {
    for (const e of initi
```
