# Guía de conceptos avanzados de TypeScript para principiantes

```ts
/**
 * DOCUMENTACIÓN RÁPIDA (comentario introductorio)
 *
 * Este documento explica, con ejemplos comentados paso a paso, varios
 * conceptos avanzados de tipado en TypeScript orientados a un desarrollador
 * principiante-intermedio que quiere trabajar de forma profesional:
 *
 *  - Intersection types vs interfaces con extends
 *  - Union types y protectores de tipo (type guards)
 *  - Discriminated Unions (uniones discriminadas) usando una propiedad común
 *  - Uso de `instanceof` como protector de tipo
 *  - Guards externizados (outsourced type guards) y combinación con funciones
 *    que devuelven información adicional + uso de "type predicate"
 *  - Overload functions (sobrecarga de funciones)
 *  - Index types (mapped types) y comparación con Record
 *  - Tipos constantes con `as const`
 *  - Uso de `satisfies` para comprobar conformidad sin perder literal types
 *
 * Cada sección contiene:
 *  1) Una explicación concisa y profesional de los conceptos relevantes.
 *  2) Un ejemplo sencillo y totalmente comentado que ilustra su uso.
 *
 * Recomendación: copie y pegue los ejemplos en su editor/IDE con TypeScript
 * (tsconfig con `strict: true`) para experimentar y ver el comportamiento del
 * tipeo.
 */
```

---

## Uso de _Intersection types_ y comparación con _interfaces_ con `extends`

**Explicación:**

- Un _intersection type_ combina tipos: `A & B` tiene todas las propiedades de `A` **y** `B`.
- `interface` con `extends` expresa lo mismo en la mayoría de casos: `interface C extends A, B {}`.
- Diferencias prácticas:
  - `interface` permite _declaration merging_ (puedes declarar la misma interfaz en varios lugares y TypeScript las combina). `type` no.
  - `type` puede describir uniones, mapeos, tuplas complejas, etc. `interface` es solo para objetos (y contratos estructurales).
  - Cuando hay propiedades conflictivas incompatibles, la intersección puede volverse `never` (error de tipo).

```ts
type WithId = { id: string };
type WithTimestamps = { createdAt: Date; updatedAt: Date };

type EntityIntersection = WithId & WithTimestamps;

const e1: EntityIntersection = {
  id: "123",
  createdAt: new Date(),
  updatedAt: new Date(),
};

interface IWithId {
  id: string;
}
interface IWithTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface IEntity extends IWithId, IWithTimestamps {}

const e2: IEntity = {
  id: "456",
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

---

## Uso de _Union types_ y empleo de protectores de tipo

**Explicación:**

- Una unión `A | B` significa que una variable puede ser del tipo `A` **o** del tipo `B`.
- Para operar con seguridad sobre una unión usamos _type guards_ (protectores): `typeof`, `instanceof`, `in`, discriminante manual o funciones personalizadas.

```ts
type Success = { ok: true; value: string };
type Failure = { ok: false; error: string };

type Result = Success | Failure;

function handle(result: Result) {
  if (result.ok) {
    console.log("Valor:", result.value);
  } else {
    console.error("Error:", result.error);
  }
}
```

---

## Discriminated Unions

**Explicación:**

- Una discriminated union usa una **propiedad literal** común (ej. `type` o `kind`) con valores literales para que TypeScript pueda hacer _narrowing_ automáticamente.

```ts
type Square = { kind: "square"; size: number };
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };

type Shape = Square | Circle | Rectangle;

function area(s: Shape): number {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "circle":
      return Math.PI * s.radius ** 2;
    case "rectangle":
      return s.width * s.height;
    default:
      const _exhaustive: never = s;
      return _exhaustive;
  }
}
```

---

## Uso de `instanceof` como protector de tipo

```ts
class Dog {
  constructor(public name: string) {}
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  constructor(public name: string) {}
  meow() {
    console.log("Meow!");
  }
}

type Pet = Dog | Cat;

function interact(pet: Pet) {
  if (pet instanceof Dog) pet.bark();
  else if (pet instanceof Cat) pet.meow();
}
```

---

## Outsourced Type Guards y Type Predicates

```ts
type User = { id: string; name: string; age?: number };

function analyzeUser(raw: unknown): {
  ok: boolean;
  user?: User;
  reason?: string;
} {
  if (typeof raw !== "object" || raw === null)
    return { ok: false, reason: "No es objeto" };
  const obj = raw as Record<string, unknown>;
  if (typeof obj.id === "string" && typeof obj.name === "string") {
    const user: User = {
      id: obj.id,
      name: obj.name,
      age: typeof obj.age === "number" ? obj.age : undefined,
    };
    return { ok: true, user };
  }
  return { ok: false, reason: "Faltan propiedades id/name" };
}

function isUser(v: unknown): v is User {
  return analyzeUser(v).ok;
}

const candidate: unknown = { id: "u1", name: "Ana", age: 30 };

if (isUser(candidate)) console.log("Nombre:", candidate.name);
```

---

## Overload Functions

```ts
function format(v: number): string;
function format(v: Date, locale?: string): string;
function format(v: unknown, locale?: string): string {
  if (typeof v === "number") return v.toFixed(2);
  if (v instanceof Date) return v.toLocaleString(locale ?? undefined);
  throw new Error("Argumentos no soportados");
}

const s1 = format(3.14159);
const s2 = format(new Date(), "es-ES");
```

---

## Index Types y comparación con Record

# Nos permite crear incorporar nuevas propiedades que no están directamente definidas en el type, se puede hacer usando los corchetes como vemos en

# ByMapped o con record directamente. De esta forma controlamos los typos y conseguimos un mayor dinamismo

```ts
type Keys = "a" | "b" | "c";

type ByMapped = { [K in Keys]: number };
type ByRecord = Record<Keys, number>;

const obj1: ByMapped = { a: 1, b: 2, c: 3 };
const obj2: ByRecord = { a: 4, b: 5, c: 6 };
```

---

## Constant Types con `as const`

# se emplean para obtener arrays mas cerrados, lo de abajo funciona como un readonly de modo que el array es fijo e invariable.

```ts
const role: string[] = ["admin", "guest", "user"] as const;
let firstrole = role[0];
```

---

## Uso de `satisfies`

```ts
type Theme = { color: string; spacing: number };

const themes = {
  light: { color: "#fff", spacing: 8 },
  dark: { color: "#000", spacing: 8 },
} satisfies Record<"light" | "dark", Theme>;

type Config = { mode: "dev" | "prod"; port: number };
const cfg = { mode: "dev", port: 3000 } satisfies Config;
```

---

## Consejos finales

- Prefiere **discriminated unions** para modelar variantes.
- Usa **outsourced guards** cuando necesites validación detallada.
- Usa `satisfies` en configuraciones para preservar literales y validar tipos.
- `Record` para mapas simples, mapped types para transformaciones complejas.
- Escribe tests para validar _guards_ y casos límite.
