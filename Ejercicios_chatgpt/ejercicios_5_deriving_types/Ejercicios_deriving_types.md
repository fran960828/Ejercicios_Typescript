# 🧭 Guía de Ejercicios Avanzados de TypeScript

> **Objetivo general:**  
> Lograr un manejo fluido y profesional de los tipos avanzados de TypeScript, aplicables al modelado de datos complejos, validaciones de estructuras y generación automática de tipos derivados.

---

## 🟢 Nivel 1 — Conceptos básicos y derivación de tipos

### Ejercicio 1: `typeof`
**Objetivo:** Derivar tipos desde valores y mantener sincronización entre tipos y objetos reales.

```ts
// 1. Declara un objeto "settings" con propiedades:
// - appName (string)
// - version (number)
// - darkMode (boolean)
// - languages (array de strings)

// 2. Usa `typeof` para derivar un tipo `SettingsType` desde el objeto creado.

// 3. Declara una variable `config` del tipo derivado y asígnale valores válidos.

// BONUS: Declara una segunda variable con un valor incorrecto para comprobar que el tipo se aplica correctamente.
```

---

### Ejercicio 2: `keyof`
**Objetivo:** Obtener las claves de un objeto y usarlas como tipo restringido.

```ts
// 1. Define un tipo "Vehiculo" con propiedades: marca, modelo, año, color.

// 2. Usa `keyof Vehiculo` para crear un tipo "CamposVehiculo".

// 3. Declara una función genérica `getField` que acepte un objeto Vehiculo y una clave del tipo `CamposVehiculo`.
//    Debe retornar el valor correspondiente a esa propiedad.

// 4. Prueba la función con varias claves válidas y una inválida (debería dar error).
```

---

## 🟡 Nivel 2 — Acceso a tipos y transformación de estructuras

### Ejercicio 3: Indexed-access types
**Objetivo:** Obtener tipos de propiedades y elementos.

```ts
// 1. Crea un tipo "Usuario" con propiedades:
// - id (number)
// - nombre (string)
// - roles (array de strings)

// 2. Define:
//   - TipoNombre = Usuario["nombre"]
//   - TipoRoles = Usuario["roles"][number]

// 3. Crea una función `agregarRol` que acepte un Usuario y un valor del tipo `TipoRoles`.
//    Retorna un nuevo Usuario con el rol agregado.
```

---

### Ejercicio 4: Combinando `keyof` y indexed-access
**Objetivo:** Escribir funciones fuertemente tipadas que operen sobre propiedades dinámicas.

```ts
// Crea una función genérica `actualizarPropiedad<T, K extends keyof T>`
// que acepte un objeto, una clave y un nuevo valor del tipo correspondiente.

// Ejemplo de uso:
// const libro = { titulo: "1984", autor: "Orwell", paginas: 300 };
// const actualizado = actualizarPropiedad(libro, "paginas", 350); // ✅
// const error = actualizarPropiedad(libro, "titulo", 123); // ❌
```

---

## 🟠 Nivel 3 — Mapped types y utilidades derivadas

### Ejercicio 5: `Mapped types`
**Objetivo:** Crear tus propias utilidades de transformación de tipos.

```ts
// 1. Crea un tipo genérico `Mutable<T>` que quite la palabra clave readonly de todas las propiedades.
// 2. Crea un tipo `Opcional<T>` que haga opcional cada propiedad.
// 3. Aplica ambos tipos a un objeto definido `UsuarioInmutable` y crea una versión editable y parcial.
```

---

### Ejercicio 6: Mapped type con renombrado de claves
**Objetivo:** Aplicar `as` en mapped types.

```ts
// Dado un tipo:
type ApiResponse = {
  user_id: number;
  user_name: string;
  user_email: string;
};

// Crea un tipo `CamelCaseApiResponse` que renombre las claves
// a "userId", "userName" y "userEmail" automáticamente
// usando template literal types dentro de un mapped type.
```

---

## 🔵 Nivel 4 — Template literal types

### Ejercicio 7: Literales de plantilla dinámicos
**Objetivo:** Generar tipos de cadenas a partir de un conjunto base.

```ts
// 1. Define un tipo "Evento" = "click" | "hover" | "submit"
// 2. Usa template literal types para crear:
//    - TipoHandler = `on${Capitalize<Evento>}`
//    // Resultado: "onClick" | "onHover" | "onSubmit"
// 3. Declara una función que acepte un handler con nombre del tipo TipoHandler y lo imprima.
```

---

### Ejercicio 8: Prefijos y sufijos
**Objetivo:** Componer claves automáticamente para APIs.

```ts
// 1. Define un tipo `Entidad = "User" | "Product" | "Order"`
// 2. Usa template literal types para generar claves de acción:
//    - "createUser" | "createProduct" | "createOrder"
//    - "deleteUser" | "deleteProduct" | "deleteOrder"
// 3. Combina ambas en un tipo union `AccionesCrud`.
// 4. Implementa una función `ejecutarAccion` que acepte una de esas acciones.
```

---

## 🔴 Nivel 5 — Conditional types e inferencia avanzada

### Ejercicio 9: Tipos condicionales básicos
**Objetivo:** Crear tipos condicionales para validar estructuras.

```ts
// Crea un tipo `SoloStrings<T>` que devuelva T si es string, o never si no lo es.

// type A = SoloStrings<string>;  // string
// type B = SoloStrings<number>;  // never
// type C = SoloStrings<string | number>; // string
```

---

### Ejercicio 10: Uso de `infer`
**Objetivo:** Extraer tipos internos mediante inferencia.

```ts
// 1. Crea un tipo genérico `PromiseType<T>` que extraiga el tipo interno de una Promise usando infer.
// 2. Crea un tipo `ReturnTypeOf<T>` que extraiga el tipo de retorno de una función.
// 3. Aplica ambos en ejemplos como:
//    - PromiseType<Promise<number>>
//    - ReturnTypeOf<() => string[]>
```

---

### Ejercicio 11: `infer` y tipos anidados
**Objetivo:** Desempaquetar estructuras complejas.

```ts
// Define un tipo recursivo `DeepUnwrap<T>` que extraiga el tipo interno
// de Promises o Arrays anidados hasta llegar al tipo base.

// Ejemplo:
// type T1 = DeepUnwrap<Promise<string[]>>; // string
// type T2 = DeepUnwrap<Promise<Promise<number[]>>>; // number
```

---

## ⚫ Nivel 6 — Integración y casos reales

### Ejercicio 12: Modelo API con tipos derivados
**Objetivo:** Aplicar `typeof`, `keyof`, `Partial`, y `indexed-access` juntos.

```ts
// 1. Declara un objeto `apiUser` con propiedades `id`, `name`, `email`, `roles` (array).
// 2. Deriva un tipo `User` usando typeof.
// 3. Declara un tipo `UserPatch = Partial<User>`.
// 4. Implementa una función `updateUser(original: User, patch: UserPatch)` que devuelva un nuevo objeto fusionado.
```

---

### Ejercicio 13: `keyof` + `infer` + mapped types para validación
**Objetivo:** Validar estructuras de datos dinámicamente.

```ts
// Crea una función genérica `validarCampos<T>(obj: T, campos: (keyof T)[])`
// que devuelva un objeto con las mismas claves, pero los valores sean booleanos
// indicando si existen en el objeto original.

// Ejemplo:
// validarCampos({ id: 1, nombre: "Ana" }, ["id", "email"])
// ➜ { id: true, email: false }
```

---

### Ejercicio 14: Tipos condicionales complejos y template literals
**Objetivo:** Generar rutas de API basadas en entidades y acciones.

```ts
// 1. Define un tipo `Entidad = "user" | "product" | "order"`
// 2. Define un tipo `Accion = "get" | "create" | "update" | "delete"`
// 3. Crea un tipo `RutaAPI = \`/${Entidad}/${Accion}\``
//    ➜ "/user/get" | "/product/update" | ...
// 4. Crea una función `llamarAPI(ruta: RutaAPI)` que acepte sólo rutas válidas.
```

---

### Ejercicio 15: Implementación profesional
**Objetivo:** Crear un sistema de tipado completo para eventos personalizados.

```ts
// 1. Define un tipo base `Eventos = { click: MouseEvent; change: InputEvent; submit: FormEvent }`
// 2. Crea un tipo `NombreEvento = keyof Eventos`
// 3. Define un tipo `Listener<E extends NombreEvento>` que sea una función que reciba Eventos[E].
// 4. Crea una función `registrarListener<E extends NombreEvento>(nombre: E, listener: Listener<E>): void`
// 5. Demuestra que al pasar "click" el listener recibe correctamente un MouseEvent.
```

---

## 🧩 Nivel Experto — Combina todo

### Ejercicio final: Sistema de formularios tipado
**Objetivo:** Integrar todos los conceptos.

```ts
// 1. Declara un objeto `formSchema`:
//    {
//      username: { required: true, type: "string" },
//      age: { required: false, type: "number" },
//      email: { required: true, type: "string" }
//    }

// 2. Usa `typeof` y `keyof` para derivar el tipo del formulario.
// 3. Crea un tipo condicional que derive el tipo de cada campo según su propiedad `type` ("string" o "number").
// 4. Crea un tipo `FormData` que represente el tipo inferido de los valores reales del formulario.
// 5. Implementa una función `validarForm(data: FormData)` que verifique que los campos requeridos están presentes.
```

---

# 🧠 Consejos para dominar los ejercicios
- Intenta **no mirar ejemplos previos** hasta que obtengas un error de tipo.
- Usa `as const` para mantener literales y probar comportamientos exactos.
- Usa la herramienta de “Quick Info” de VSCode (hover) para analizar tipos inferidos.
- Experimenta combinando tipos condicionales, infer y template literals.
