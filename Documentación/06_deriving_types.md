# 📘 Documentación completa de TypeScript Avanzado (de principiante a profesional)

> **Comentario inicial:**  
> Este documento está diseñado para guiarte paso a paso desde los fundamentos hasta un dominio profesional de las capacidades avanzadas del sistema de tipos de TypeScript.  
> Incluye explicaciones detalladas y ejemplos comentados para que comprendas el *por qué* y el *cómo* detrás de cada característica del lenguaje.

---

## 🧭 Índice
1. Uso de `typeof` para derivar tipos desde valores
2. Uso de `keyof` para obtener las claves de un tipo (y su uso en genéricos)
3. *Indexed-access types* — Acceso a tipos de propiedades y elementos
4. *Mapped types* — Transformación de tipos y propiedades (`readonly`, opcionales, etc.)
5. *Template literal types* — Creación de tipos de cadenas dinámicas
6. *Conditional types* — Definición de tipos condicionales
7. Uso de la palabra clave `infer`
8. Uso de la utilidad `Partial`
9. Buenas prácticas profesionales

---

## 1️⃣ Uso de `typeof`

### 📖 Explicación
`typeof` en TypeScript no solo sirve para obtener el tipo en tiempo de ejecución (como en JavaScript), sino que también puede usarse en el *contexto de tipos* para derivar un tipo a partir de un valor existente.

Esto permite mantener sincronizados los valores reales (por ejemplo, objetos de configuración o constantes) con sus tipos derivados, evitando errores de desalineación.

### 📘 Ejemplo

```ts
// Tenemos un objeto con configuración de usuario
const usuario = {
  id: 42,
  nombre: "Ana",
  activo: true,
  preferencias: {
    tema: "dark" as "dark" | "light",
  },
};

// Derivamos un tipo directamente desde el objeto
type Usuario = typeof usuario;

// Ahora el tipo 'Usuario' refleja la estructura exacta del objeto
const nuevoUsuario: Usuario = {
  id: 100,
  nombre: "Carlos",
  activo: false,
  preferencias: { tema: "light" },
};
```

✅ **Ventaja profesional:** Mantener sincronía entre estructuras de datos y sus tipos derivados sin duplicar código.

---

## 2️⃣ Uso de `keyof`

### 📖 Explicación
`keyof` obtiene las claves de un tipo como una unión de *string literal types*.  
Esto permite restringir operaciones o generar tipos dinámicamente basados en las propiedades de otros.

También es fundamental cuando se usa en combinación con **genéricos**, permitiendo construir funciones reutilizables y seguras respecto al tipo.

### 📘 Ejemplo

```ts
type Producto = {
  id: string;
  nombre: string;
  precio: number;
};

// Obtenemos las claves del tipo Producto
type ClavesProducto = keyof Producto; // "id" | "nombre" | "precio"

// Función genérica que usa keyof y acceso a tipo por índice
function obtenerProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const p: Producto = { id: "p1", nombre: "Camiseta", precio: 20 };

const nombre = obtenerProp(p, "nombre"); // string
const precio = obtenerProp(p, "precio"); // number
```

✅ **Ventaja profesional:** Permite escribir funciones genéricas seguras que operan sobre propiedades dinámicas.

---

## 3️⃣ Indexed-access types

### 📖 Explicación
Permiten acceder al tipo de una propiedad dentro de otro tipo.  
Es como usar el operador `[]`, pero en el nivel de tipos.

También puedes usarlos con arrays para obtener el tipo de sus elementos (`TipoArray[number]`).

### 📘 Ejemplo

```ts
type Persona = {
  nombre: string;
  edad: number;
  hobbies: string[];
};

// Acceso al tipo de una propiedad
type TipoNombre = Persona["nombre"]; // string

// Acceso al tipo de un elemento de array
type Hobby = Persona["hobbies"][number]; // string
```

✅ **Ventaja profesional:** Extraer tipos específicos de propiedades complejas o colecciones dinámicas.

---

## 4️⃣ Mapped types

### 📖 Explicación
Los *Mapped Types* permiten transformar todas las propiedades de un tipo existente.  
Podemos crear versiones modificadas de un tipo (por ejemplo, haciéndolas opcionales o de solo lectura).

Se usan comúnmente con utilidades integradas como `Partial<T>` o `Readonly<T>`, pero también puedes definir los tuyos.

### 📘 Ejemplo

```ts
type Persona = {
  nombre: string;
  edad: number;
  ciudad?: string;
};

// Creamos un tipo genérico que hace todas las propiedades opcionales
type MiPartial<T> = {
  [K in keyof T]?: T[K];
};

type PersonaParcial = MiPartial<Persona>;

// Creamos un tipo genérico que hace todas las propiedades de solo lectura
type MiReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

type PersonaSoloLectura = MiReadonly<Persona>;
```

✅ **Ventaja profesional:** Crear versiones controladas de tipos para distintas capas (entrada, salida, validación, etc.).

---

## 5️⃣ Template Literal Types

### 📖 Explicación
Permiten construir tipos de cadena dinámicos a partir de otros tipos de cadena.  
Son muy útiles para crear *nombres de eventos, clases CSS, rutas de API, etc.*.

### 📘 Ejemplo

```ts
type Sizes = "small" | "medium" | "large";

// Creamos un tipo que genera combinaciones dinámicas de strings
type CssClass = `btn-${Sizes}`; // "btn-small" | "btn-medium" | "btn-large"

type StateKeys = "loading" | "success" | "error";
type ActionType = `SET_${Uppercase<StateKeys>}`;
// "SET_LOADING" | "SET_SUCCESS" | "SET_ERROR"
```

✅ **Ventaja profesional:** Generar tipos de string consistentes con convenciones de nombres o APIs.

---

## 6️⃣ Conditional Types

### 📖 Explicación
Los *conditional types* permiten que un tipo dependa de una condición sobre otro tipo.

Su sintaxis es similar a un `if` ternario:
```ts
T extends U ? X : Y
```
Si `T` es asignable a `U`, el tipo resultante es `X`; de lo contrario, `Y`.

### 📘 Ejemplo

```ts
type EsString<T> = T extends string ? "es string" : "no es string";

type A = EsString<string>; // "es string"
type B = EsString<number>; // "no es string"

// Uso combinado con infer
type MiReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Fn = (a: number) => string;
type R = MiReturnType<Fn>; // string
```

✅ **Ventaja profesional:** Permite inferir tipos dinámicamente, emulando comportamiento polimórfico.

---

## 7️⃣ Uso de `infer`

### 📖 Explicación
La palabra clave `infer` se usa dentro de tipos condicionales para extraer (inferir) subtipos o tipos internos.

Por ejemplo, al analizar un tipo `Promise<T>`, `infer` permite capturar el tipo `T` para usarlo después.

### 📘 Ejemplo

```ts
type ElementType<T> = T extends (infer U)[] ? U : never;
type E1 = ElementType<string[]>; // string

type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
type U1 = UnwrapPromise<Promise<string>>; // string
```

✅ **Ventaja profesional:** Desestructurar tipos complejos y escribir utilidades avanzadas como `ReturnType`, `Parameters`, etc.

---

## 8️⃣ Uso de `Partial`

### 📖 Explicación
`Partial<T>` es una utilidad incorporada que convierte todas las propiedades de un tipo en opcionales.

Es útil cuando queremos representar datos “incompletos” (por ejemplo, actualizaciones parciales o formularios).

### 📘 Ejemplo

```ts
type Usuario = {
  id: string;
  nombre: string;
  email: string;
};

// La función recibe un objeto y un conjunto de cambios parciales
function actualizarUsuario(original: Usuario, cambios: Partial<Usuario>): Usuario {
  return { ...original, ...cambios };
}

const original: Usuario = { id: "1", nombre: "Pepa", email: "p@mail" };

const actualizado = actualizarUsuario(original, { nombre: "Pepita" });
// ✅ solo modificamos una parte del objeto, sin romper el tipo
```

✅ **Ventaja profesional:** Facilita patrones de *patch*, *merge* y *updates* seguros.

---

## 🧠 Buenas prácticas profesionales

- Usa `typeof` para derivar tipos desde valores reales y evitar duplicación.
- Combina `keyof` y genéricos para escribir funciones flexibles y seguras.
- Usa *mapped types* para controlar el acceso o mutabilidad de datos.
- Prefiere utilidades integradas (`Partial`, `Pick`, `Omit`, `Readonly`, etc.) antes de reinventarlas.
- Usa `template literal types` para mantener consistencia semántica en nombres.
- Aprovecha `infer` para extraer tipos dinámicos de funciones y promesas.
- Mantén los tipos simples, expresivos y autoexplicativos.

---
**📘 Fin del documento — TypeScript avanzado desde cero hasta nivel profesional.**
