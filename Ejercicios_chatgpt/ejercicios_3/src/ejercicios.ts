// ## 1️⃣ Intersection Types y comparación con Interfaces (`extends`)

// **Objetivo:** comprender cómo combinar estructuras de tipos para crear modelos complejos y consistentes.

// ### Ejercicios

// 1. **Combina propiedades de usuario y permisos:**
//    ```ts
//    // Crea dos tipos: UserBase y Permissions.
//    // Combínalos en un nuevo tipo UserWithPermissions usando una intersección (&).
//    // Crea una función que reciba un objeto de tipo UserWithPermissions y muestre su nombre y sus permisos.
//    ```

type UserBase = {
  usuario: string;
  password: string;
};
type Permissions = {
  permisos: string;
};
type UserWithPermissions = UserBase & Permissions;

const admin: UserWithPermissions = {
  usuario: "admin",
  password: "password123",
  permisos: "todos",
};
// 2. **Versión con interfaces y extends:**
//    ```ts
//    // Repite el ejercicio anterior, pero usando interfaces y extends.
//    // Compara cómo TypeScript infiere los tipos y analiza cuál es más legible.
//    ```
interface userBase {
  user: string;
  password: string;
}
interface permissions {
  permisos: string;
}
interface userWithPermissions extends userBase, permissions {}
const tecnico: userWithPermissions = {
  user: "tecnico",
  password: "password456",
  permisos: "contabilidad",
};

// 3. **Intersección conflictiva:**
//    ```ts
//    // Crea dos tipos que tengan una propiedad 'status' de distinto tipo (string vs number).
//    // Declara una intersección de ambos e intenta asignarle un valor.
//    // Explica por qué TypeScript marca un error y cómo evitarlo.->Se produce el error porque al ponerle en cada type algo distinto da como resultado
// el tipo never, para evitarlo en ambos casos se ponen la dos opciones
//    ```

type empleado = {
  status: string | number;
  puesto: string;
};
type trabajador = {
  status: string | number;
  jornada: string;
};
type subordinados = trabajador & empleado;

const empleado1: subordinados = {
  puesto: "peon",
  jornada: "completa",
  status: 2,
};
// ## 2️⃣ Union Types y protectores de tipo (`type guards`)

// **Objetivo:** dominar el uso de uniones y aprender a escribir lógica segura basada en protecciones de tipo.

// ### Ejercicios

// 4. **Unión de respuesta API:**
//    ```ts
//    // Define dos tipos: ApiSuccess y ApiError con propiedades distintas.
//    // Crea una función handleApiResponse que acepte un parámetro tipo ApiSuccess | ApiError.
//    // Usa "in" o "typeof" para diferenciar los casos.
//    ```
type ApiSuccess = {
  codeApi: number;
  mensaje: string;
};
type ApiError = {
  codeError: number;
  errorMessage: string;
};
function handleApiResponse(respuesta: ApiSuccess | ApiError) {
  if ("codeApi" in respuesta) {
    console.log(respuesta.mensaje);
  } else {
    console.log(`codigo ${respuesta.codeError} --> ${respuesta.errorMessage}`);
  }
}

let resp: ApiSuccess = {
  codeApi: 200,
  mensaje: "Información cargada correctamente",
};
//handleApiResponse(resp);

// 5. **Unión de tipos primitivos:**
//    ```ts
//    // Crea una función printValue(value: string | number | boolean)
//    // que imprima distinto texto según el tipo (usa typeof).
//    ```

function printValue(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log("El valor es un texto");
  } else if (typeof value === "number") {
    console.log("El valor es un numero");
  } else {
    console.log("El valor es booleano");
  }
}
// printValue(12);

// 6. **Type Guard personalizado:**
//    ```ts
//    // Define un tipo Admin con propiedad 'role: "admin"' y otro tipo Guest con 'role: "guest"'.
//    // Escribe una función isAdmin(user): user is Admin.
//    // Úsala en un array de usuarios mixtos para filtrar solo los admins.
//    ```
type Role = "admin" | "guest" | "editor" | "manager";

type User = { role: Role; name: string };

function isAdmin(user: User): user is User & { role: "admin" } {
  return user.role === "admin";
}

const users: User[] = [
  { role: "admin", name: "Ana" },
  { role: "guest", name: "Luis" },
  { role: "manager", name: "Lucía" },
  { role: "admin", name: "Carlos" },
];

const admins = users.filter(isAdmin);

//console.log(admins);

//## 3️⃣ Discriminated Unions
//
//**Objetivo:** crear jerarquías de tipos robustas y seguras usando una propiedad discriminante.
//
//### Ejercicios
//
//7. **Figuras geométricas:**
//   ```ts
//   // Crea un tipo Shape con variantes:
//   //   - { kind: "triangle"; base: number; height: number }
//   //   - { kind: "circle"; radius: number }
//   //   - { kind: "square"; side: number }
//   // Implementa una función area(shape: Shape): number
//   // Usa un switch y asegúrate de que el caso default sea never.
//   ```
type Triangulo = {
  kind: "triangle";
  base: number;
  height: number;
};
type Circle = {
  kind: "circle";
  radius: number;
};
type Square = {
  kind: "square";
  side: number;
};
type Shape = Triangulo | Circle | Square;
function area(shape: Shape): number {
  switch (shape.kind) {
    case "triangle":
      return (shape.base * shape.height) / 2;
    case "circle":
      return shape.radius ** 2 * Math.PI;
    case "square":
      return shape.side * shape.side;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}
let figura: Circle = {
  kind: "circle",
  radius: 5,
};
//console.log(area(figura))

//8. **Eventos del sistema:**
//   ```ts
//   // Crea un tipo SystemEvent discriminado por 'type':
//   //   - { type: "click"; x: number; y: number }
//   //   - { type: "keypress"; key: string }
//   //   - { type: "resize"; width: number; height: number }
//   // Implementa handleEvent(event: SystemEvent) que imprima un mensaje distinto según el tipo.
//   ```
type Click = {
  type: "click";
  x: number;
  y: number;
};

type Keypress = {
  type: "keypress";
  key: string;
};

type Resize = {
  type: "resize";
  width: number;
  height: number;
};

type SystemEvent = Click | Keypress | Resize;

function handleEvent(event: SystemEvent): void {
  switch (event.type) {
    case "click":
      // TypeScript sabe que event es de tipo Click aquí
      console.log(`Click detectado en posición (${event.x}, ${event.y})`);
      break;

    case "keypress":
      // Aquí event es de tipo Keypress
      console.log(`Has presionado la tecla: ${event.key}`);
      break;

    case "resize":
      // Aquí event es de tipo Resize
      console.log(`Pantalla redimensionada a ${event.width}x${event.height}`);
      break;

    default:
      // Exhaustiveness check: si se añade un nuevo tipo y no se maneja, TypeScript avisa
      const _exhaustive: never = event;
      return _exhaustive;
  }
}

// Ejemplos de uso
//handleEvent({ type: 'click', x: 100, y: 200 });
//handleEvent({ type: 'keypress', key: 'Enter' });
//handleEvent({ type: 'resize', width: 1920, height: 1080 });

//## 4️⃣ Uso de `instanceof` en Union Types
//
//**Objetivo:** diferenciar clases y sus instancias en runtime.
//
//### Ejercicios
//
//9. **Vehículos:**
//   ```ts
//   // Crea clases Car y Bike con métodos drive() y pedal().
//   // Define un tipo Vehicle = Car | Bike.
//   // Implementa una función useVehicle(v: Vehicle) que llame al método correcto usando instanceof.
//   ```
class Car {
  drive() {
    console.log("Conduciendo");
  }
}
class Bike {
  pedal() {
    console.log("pedaleando");
  }
}

type Vehicle = Car | Bike;

function useVehicle(v: Vehicle) {
  if (v instanceof Car) {
    v.drive();
  } else {
    v.pedal();
  }
}
let toyota = new Car();
//useVehicle(toyota)

//10. **Errores personalizados:**
//   ```ts
//   // Crea clases NotFoundError y ValidationError extendiendo Error.
//   // Crea una función handleError(err: Error | NotFoundError | ValidationError)
//   // que actúe distinto según la clase usando instanceof.
//   ```

class NotFoundError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

class ValidationError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

function handleError(err: Error | NotFoundError | ValidationError): void {
  if (err instanceof NotFoundError) {
    console.log(`❌ No encontrado: ${err.message}`);
  } else if (err instanceof ValidationError) {
    console.log(`⚠️ Error de validación: ${err.message}`);
  } else if (err instanceof Error) {
    console.log(`Error general: ${err.message}`);
  } else {
    const _exhaustive: never = err;
    return _exhaustive;
  }
}

// Ejemplos de uso:
//handleError(new NotFoundError("Recurso no existe"));
//handleError(new ValidationError("Campo 'email' no es válido"));
//handleError(new Error("Error genérico"));

//## 5️⃣ Outsourced Type Guards y Type Predicates
//
//**Objetivo:** separar la validación runtime de la lógica de negocio usando funciones que retornan `x is Type`.
//
//### Ejercicios
//
//11. **Validador de producto:**
//   ```ts
//   // Crea un tipo Product con propiedades id, name, price.
//   // Implementa una función isProduct(value: unknown): value is Product.
//   // Dentro, valida tipos y devuelve true/false.
//   // Usa la función en una lista de valores heterogéneos para filtrar solo los productos válidos.
//   ```
type Product = {
  id: string;
  name: string;
  price: number;
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.price === "number"
  );
}

const items: unknown[] = [
  { id: "1", name: "Teclado", price: 49.99 },
  { id: "2", name: "Monitor", price: "100" },
  { nombre: "Mouse", precio: 25 },
  "cadena",
  123,
  null,
  { id: "3", name: "Laptop", price: 999 },
];

const validProducts = items.filter(isProduct);

// console.log(validProducts);

//
//12. **Analizador con retorno extendido:**
//   ```ts
//   // Crea una función analyzeOrder(obj: unknown)
//   // que devuelva { ok: boolean; order?: { id: number; items: string[] }; reason?: string }.
//   // Luego crea un type guard isOrder(value: unknown): value is { id: number; items: string[] }.
//   // Combina ambos en un flujo de validación completo.
//   ```

function analyzeOrder(obj: unknown): {
  ok: boolean;
  order?: { id: number; items: string[] };
  reason?: string;
} {
  if (typeof obj !== "object" || obj === null) {
    return { ok: false, reason: "No es un objeto" };
  }
  const element = obj as Record<string, unknown>;
  if (
    typeof element.id === "number" &&
    Array.isArray(element.items) &&
    element.items.every((item) => typeof item === "string")
  ) {
    const ord = {
      id: element.id,
      items: element.items,
    };
    return { ok: true, order: ord };
  }
  return { ok: false, reason: "No estan todas las propiedades" };
}

function isOrder(value: unknown): value is { id: number; items: string[] } {
  return analyzeOrder(value).ok;
}

const dataSamples: unknown[] = [
  { id: 1, items: ["mouse", "keyboard"] },
  { id: 2, items: "monitor" }, // ❌ items no es array
  { id: "3", items: ["cable"] }, // ❌ id no es number
  null,
  "texto",
  { id: 4, items: ["laptop", "bag"] },
];

const validOrders = dataSamples.filter(isOrder);
// console.log("Pedidos válidos:", validOrders);

// 13. **Formato flexible:**
//    ```ts
//    // Crea una función formatValue que acepte:
//    //   - un string → lo devuelva en mayúsculas
//    //   - un número → lo devuelva con dos decimales
//    //   - un Date → lo formatee con .toISOString()
//    // Usa overloads para declarar las firmas.
//    ```
function formatValue(v: string): string;
function formatValue(v: number): number;
function formatValue(v: Date): string;
function formatValue(v: unknown): unknown {
  if (typeof v === "string") return v.toUpperCase();
  if (typeof v === "number") return v.toFixed(2);
  if (v instanceof Date) return v.toISOString();
  throw new Error("El dato no es Valido");
}
const s1 = formatValue(2.345343);
const s2 = formatValue("como lo llevas");
const s3 = formatValue(new Date());
// console.log(s1);
// console.log(s2);
// console.log(s3);

// 14. **Concatenación tipada:**
//    ```ts
//    // Escribe una función concat que:
//    //   - si recibe dos strings, devuelva string
//    //   - si recibe dos arrays del mismo tipo, devuelva array concatenado
//    // Usa overloads y asegúrate de que los tipos se infieran correctamente.
//    ```

// 🔹 Sobrecarga 1: dos strings -> string
function concat(a: string, b: string): string;

// 🔹 Sobrecarga 2: dos arrays del mismo tipo -> array del mismo tipo-->Usa genericos
function concat<T>(a: T[], b: T[]): T[];

// 🔹 Implementación general
function concat(a: unknown, b: unknown): unknown {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return [...a, ...b];
  }

  throw new Error(
    "Tipos incompatibles: deben ser strings o arrays del mismo tipo"
  );
}
const el1 = "Hola ";
const el2 = "Mundo";
const result1 = concat(el1, el2);
// console.log(result1); // "Hola Mundo"

const nums1 = [1, 2];
const nums2 = [3, 4];
const result2 = concat(nums1, nums2);
// console.log(result2); // [1, 2, 3, 4]

// 15. **Mapa de traducciones:**
//    ```ts
//    // Define un tipo Languages = "en" | "es" | "fr"
//    // Crea un tipo TranslationRecord usando Record<Languages, string>
//    // Asigna un objeto que cumpla con ese tipo y agrega una función translate(lang: Languages).
//    ```
type Languages = "en" | "es" | "fr";
type TranlationRecord = Record<Languages, string>;

const traductor: TranlationRecord = {
  en: "Ingles",
  es: "Español",
  fr: "Frances",
};

function translate(lang: Languages) {
  return traductor[lang];
}
console.log(translate("es"));

// 16. **Transformador genérico:**
//    ```ts
//    // Crea un tipo Transform<T> = { [K in keyof T]: () => T[K] }
//    // Usa este tipo para transformar un objeto de configuración:
//    // { port: number; env: string } → { port: () => number; env: () => string }
//    // Implementa una función applyTransform<T>(t: Transform<T>): T
//    ```
// Pendiente cuando aprendamos genericos
