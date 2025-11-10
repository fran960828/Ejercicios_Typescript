//## 🟢 Nivel 1 — Conceptos básicos y derivación de tipos
//
//### Ejercicio 1: `typeof`
//**Objetivo:** Derivar tipos desde valores y mantener sincronización entre tipos y objetos reales.
//
//```ts
//// 1. Declara un objeto "settings" con propiedades:
//// - appName (string)
//// - version (number)
//// - darkMode (boolean)
//// - languages (array de strings)
//
//// 2. Usa `typeof` para derivar un tipo `SettingsType` desde el objeto creado.
//
//// 3. Declara una variable `config` del tipo derivado y asígnale valores válidos.
//
//// BONUS: Declara una segunda variable con un valor incorrecto para comprobar que el tipo se aplica correctamente.
//```

let settings = {
  appName: "efemis",
  version: 1.8,
  darkMode: true,
  languages: ["Español", "Ingles", "Aleman"],
};

type settingsType = typeof settings;

let config: settingsType = {
  appName: "agroslab",
  version: 2.5,
  darkMode: false,
  languages: ["Ingles", "Chino", "Japones"],
};

//### Ejercicio 2: `keyof`
//**Objetivo:** Obtener las claves de un objeto y usarlas como tipo restringido.
//
//```ts
//// 1. Define un tipo "Vehiculo" con propiedades: marca, modelo, año, color.
//
//// 2. Usa `keyof Vehiculo` para crear un tipo "CamposVehiculo".
//
//// 3. Declara una función genérica `getField` que acepte un objeto Vehiculo y una clave del tipo `CamposVehiculo`.
////    Debe retornar el valor correspondiente a esa propiedad.
//
//// 4. Prueba la función con varias claves válidas y una inválida (debería dar error).
//```

type vehiculo = {
  marca: string;
  modelo: string;
  año: number;
  color: string;
};
type vehiculokey = keyof vehiculo;

const ford: vehiculo = {
  marca: "Ford",
  modelo: "Focus",
  año: 2017,
  color: "blanco",
};

function getfield<T extends vehiculo, U extends vehiculokey>(
  obj: T,
  key: U
): T[U] | undefined {
  return obj[key];
}

//console.log(getfield(ford,'color'))
//console.log(getfield(ford,'año'))
//console.log(getfield(ford,'matricula'))

//### Ejercicio 3: Indexed-access types
//**Objetivo:** Obtener tipos de propiedades y elementos.
//
//```ts
//// 1. Crea un tipo "Usuario" con propiedades:
//// - id (number)
//// - nombre (string)
//// - roles (array de strings)
//
//// 2. Define:
////   - TipoNombre = Usuario["nombre"]
////   - TipoRoles = Usuario["roles"][number]
//
//// 3. Crea una función `agregarRol` que acepte un Usuario y un valor del tipo `TipoRoles`.
////    Retorna un nuevo Usuario con el rol agregado.
//```

type User = {
  id: number;
  nombre: string;
  roles: string[];
};
const usuario: User = {
  id: 1,
  nombre: "Francisco",
  roles: ["tecnico", "enologo"],
};

type TipoNombre = User["nombre"];
type TipoRoles = User["roles"][number];

function agregarRol(usuario: User, nuevoRol: TipoRoles): User {
  usuario["roles"].push(nuevoRol);
  return usuario;
}
// console.log(agregarRol(usuario, "informatico"));

//### Ejercicio 4: Combinando `keyof` y indexed-access
//**Objetivo:** Escribir funciones fuertemente tipadas que operen sobre propiedades dinámicas.
//
//```ts
//// Crea una función genérica `actualizarPropiedad<T, K extends keyof T>`
//// que acepte un objeto, una clave y un nuevo valor del tipo correspondiente.
//
//// Ejemplo de uso:
//// const libro = { titulo: "1984", autor: "Orwell", paginas: 300 };
//// const actualizado = actualizarPropiedad(libro, "paginas", 350); // ✅
//// const error = actualizarPropiedad(libro, "titulo", 123); // ❌
//```

const libro = { titulo: "1984", autor: "Orwell", paginas: 300 };

type Book = typeof libro;
type Keys = keyof Book;

function actualizarPropiedad<T extends object, U extends keyof T>(
  obj: T,
  key: U,
  value: T[U]
): T {
  return { ...obj, [key]: value };
}

//console.log(actualizarPropiedad(libro,'autor','Brandon Sanderson'))
//console.log(actualizarPropiedad(libro,'titulo','Archivo de tormentas'))
//console.log(actualizarPropiedad(libro,'paginas',398))

//## 🟠 Nivel 3 — Mapped types y utilidades derivadas
//
//### Ejercicio 5: `Mapped types`
//**Objetivo:** Crear tus propias utilidades de transformación de tipos.
//
//```ts
//// 1. Crea un tipo genérico `Mutable<T>` que quite la palabra clave readonly de todas las propiedades.
//// 2. Crea un tipo `Opcional<T>` que haga opcional cada propiedad.
//// 3. Aplica ambos tipos a un objeto definido `UsuarioInmutable` y crea una versión editable y parcial.
//```

type Persona = {
  nombre: string;
  edad: number;
  ciudad: string;
};

type Partial<T> = {
  [K in keyof T]?: T[K];
};

type PersonaPartial = Partial<Persona>;

const francisco: PersonaPartial = {
  nombre: "Francisco",
  edad: 29,
  ciudad: "Albacete",
};
// console.log(actualizarPropiedad(francisco, "edad", 24));

type Inmutable<T> = {
  readonly [K in keyof T]: T[K];
};
type PersonaInmutable = Inmutable<Persona>;

const persona2: PersonaInmutable = {
  nombre: "Javier",
  edad: 34,
  ciudad: "Albacete",
};

//### Ejercicio 6: Mapped type con renombrado de claves
//**Objetivo:** Aplicar `as` en mapped types.
//
//```ts
//// Dado un tipo:
//type ApiResponse = {
//  user_id: number;
//  user_name: string;
//  user_email: string;
//};
//
//// Crea un tipo `CamelCaseApiResponse` que renombre las claves
//// a "userId", "userName" y "userEmail" automáticamente
//// usando template literal types dentro de un mapped type.
//```
type ApiResponse = {
  user_id: number;
  user_name: string;
  user_email: string;
};
type Separar<T> = {
  [K in keyof T as K extends `${infer preffix}_${infer suffix}`
    ? `${preffix}${Capitalize<suffix>}`
    : K]: T[K];
};

type CamelCaseApiResponse = Separar<ApiResponse>;

// ### Ejercicio 7: Literales de plantilla dinámicos
// **Objetivo:** Generar tipos de cadenas a partir de un conjunto base.

// ```ts
// // 1. Define un tipo "Evento" = "click" | "hover" | "submit"
// // 2. Usa template literal types para crear:
// //    - TipoHandler = `on${Capitalize<Evento>}`
// //    // Resultado: "onClick" | "onHover" | "onSubmit"
// // 3. Declara una función que acepte un handler con nombre del tipo TipoHandler y lo imprima.
// ```
type Evento = "click" | "hover" | "submit";

type TipoHandler = `on${Evento}`;

function mostrar(event: TipoHandler): void {
  console.log(event);
}
// mostrar("onclick");

// ### Ejercicio 8: Prefijos y sufijos
// **Objetivo:** Componer claves automáticamente para APIs.

// ```ts
// // 1. Define un tipo `Entidad = "User" | "Product" | "Order"`
// // 2. Usa template literal types para generar claves de acción:
// //    - "createUser" | "createProduct" | "createOrder"
// //    - "deleteUser" | "deleteProduct" | "deleteOrder"
// // 3. Combina ambas en un tipo union `AccionesCrud`.
// // 4. Implementa una función `ejecutarAccion` que acepte una de esas acciones.
// ```
type Entidad = "User" | "Product" | "Order";

type CreateEntidad = `create${Entidad}`;
type DeletedEntidad = `delete${Entidad}`;
type AccionesCrud = CreateEntidad | DeletedEntidad;

function ejecutarAccion<T>(accion: T): void {
  console.log(accion);
}
// ejecutarAccion<AccionesCrud>("createOrder");

// ### Ejercicio 9: Tipos condicionales básicos
// **Objetivo:** Crear tipos condicionales para validar estructuras.

// ```ts
// // Crea un tipo `SoloStrings<T>` que devuelva T si es string, o never si no lo es.

// // type A = SoloStrings<string>;  // string
// // type B = SoloStrings<number>;  // never
// // type C = SoloStrings<string | number>; // string
// ```

type SoloStrings<T> = T extends string ? string : never;

type A = SoloStrings<string>;
type B = SoloStrings<number>;
type C = SoloStrings<string | number>;

// ### Ejercicio 10: Uso de `infer`
// **Objetivo:** Extraer tipos internos mediante inferencia.

// ```ts
// // 1. Crea un tipo genérico `PromiseType<T>` que extraiga el tipo interno de una Promise usando infer.
// // 2. Crea un tipo `ReturnTypeOf<T>` que extraiga el tipo de retorno de una función.
// // 3. Aplica ambos en ejemplos como:
// //    - PromiseType<Promise<number>>
// //    - ReturnTypeOf<() => string[]>
// ```

type PromiseType<T> = T extends Promise<infer U> ? U : T;
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

type D = PromiseType<Promise<number>>;

type DE = Awaited<Promise<number[]>>; //Funcion nativa por defecto

type E = ReturnTypeOf<() => string | number>;

type F = ReturnType<() => string[]>; //Funcion nativa por defecto

// ### Ejercicio 11: `infer` y tipos anidados
// **Objetivo:** Desempaquetar estructuras complejas.

// ```ts
// // Define un tipo recursivo `DeepUnwrap<T>` que extraiga el tipo interno
// // de Promises o Arrays anidados hasta llegar al tipo base.

// // Ejemplo:
// // type T1 = DeepUnwrap<Promise<string[]>>; // string
// // type T2 = DeepUnwrap<Promise<Promise<number[]>>>; // number
// ```

type DeepUnwrap<T> = T extends Promise<infer U>
  ? DeepUnwrap<U>
  : T extends (infer U)[]
  ? DeepUnwrap<U>
  : T;

type T1 = DeepUnwrap<Promise<string[]>>;
type T2 = DeepUnwrap<number>;
type T3 = ReturnType<() => string[]>;

// ### Ejercicio 12: Modelo API con tipos derivados
// **Objetivo:** Aplicar `typeof`, `keyof`, `Partial`, y `indexed-access` juntos.

// ```ts
// // 1. Declara un objeto `apiUser` con propiedades `id`, `name`, `email`, `roles` (array).
// // 2. Deriva un tipo `User` usando typeof.
// // 3. Declara un tipo `UserPatch = Partial<User>`.
// // 4. Implementa una función `updateUser(original: User, patch: UserPatch)` que devuelva un nuevo objeto fusionado.
// ```

// 1️⃣ Objeto base
let apiUser = {
  id: 1,
  name: "Elena",
  email: "Elena@hotmail.com",
  roles: ["tecnico", "administrador", "usuario"],
};

// 2️⃣ Derivar tipo con typeof
type Users = typeof apiUser;

// 3️⃣ Crear tipo parcial
type UserPatch = Partial<Users>;

// 4️⃣ Función para actualizar usuario
function updateUser(original: Users, patch: UserPatch): Users {
  return { ...original, ...patch }; // combinación segura y tipada
}

// 🧪 Ejemplo de uso
const originalUser: Users = {
  id: 1,
  name: "Elena",
  email: "elena@hotmail.com",
  roles: ["tecnico", "usuario"],
};

const cambios: UserPatch = {
  name: "Elena Pérez",
  roles: ["administrador"],
};

const actualizado = updateUser(originalUser, cambios);
// console.log(actualizado);

// ### Ejercicio 13: `keyof` + `infer` + mapped types para validación
// **Objetivo:** Validar estructuras de datos dinámicamente.

// ```ts
// // Crea una función genérica `validarCampos<T>(obj: T, campos: (keyof T)[])`
// // que devuelva un objeto con las mismas claves, pero los valores sean booleanos
// // indicando si existen en el objeto original.

// // Ejemplo:
// // validarCampos({ id: 1, nombre: "Ana" }, ["id", "email"])
// // ➜ { id: true, email: false }
// ```

type Producto = {
  id: number;
  name: string;
  price: number;
  stock: number;
};
type KeyProducts = keyof Producto;

function validarCampos<T extends object, U extends keyof T>(
  prod: T,
  campos: U[]
) {
  return campos.reduce((acc, campo) => {
    acc[campo] = campo in prod;
    return acc;
  }, {} as Record<U, boolean>);
}
let producto1: Producto = {
  id: 1,
  name: "arandanos",
  price: 12,
  stock: 70,
};
// console.log(validarCampos(producto1, ["id", "name", "email"]));

// ### Ejercicio 14: Tipos condicionales complejos y template literals
// **Objetivo:** Generar rutas de API basadas en entidades y acciones.

// ```ts
// // 1. Define un tipo `Entidad = "user" | "product" | "order"`
// // 2. Define un tipo `Accion = "get" | "create" | "update" | "delete"`
// // 3. Crea un tipo `RutaAPI = \`/${Entidad}/${Accion}\``
// //    ➜ "/user/get" | "/product/update" | ...
// // 4. Crea una función `llamarAPI(ruta: RutaAPI)` que acepte sólo rutas válidas.
// ```
type Entity = "user" | "product" | "order";
type Accion = "get" | "create" | "update" | "delete";
type RutaApi2 = `/${Accion}/${Capitalize<Entity>}`;

function LlamarApi(ruta: RutaApi2): void {
  console.log(ruta);
}
LlamarApi("/create/Order");

// ### Ejercicio 15: Implementación profesional
// **Objetivo:** Crear un sistema de tipado completo para eventos personalizados.

// ```ts
// // 1. Define un tipo base `Eventos = { click: MouseEvent; change: InputEvent; submit: FormEvent }`
// // 2. Crea un tipo `NombreEvento = keyof Eventos`
// // 3. Define un tipo `Listener<E extends NombreEvento>` que sea una función que reciba Eventos[E].
// // 4. Crea una función `registrarListener<E extends NombreEvento>(nombre: E, listener: Listener<E>): void`
// // 5. Demuestra que al pasar "click" el listener recibe correctamente un MouseEvent.
// ```
// 1️⃣ Tipo base con los eventos disponibles y su tipo asociado
type Eventos = {
  click: MouseEvent;
  change: InputEvent;
  submit: KeyboardEvent;
};

// 2️⃣ Tipo que representa el nombre de los eventos
type NombreEvento = keyof Eventos; // "click" | "change" | "submit"

// 3️⃣ Tipo de listener: una función que recibe un evento del tipo correspondiente
type Listener<E extends NombreEvento> = (evento: Eventos[E]) => void;

// 4️⃣ Función genérica que registra el listener, fuertemente tipada
function registrarListener<E extends NombreEvento>(
  nombre: E,
  listener: Listener<E>
): void {
  // simulación de registro (podrías imaginarlo como addEventListener)
  console.log(`Listener registrado para el evento: ${nombre}`);
}

// 5️⃣ Ejemplos de uso
registrarListener("click", (e) => {
  console.log(e.clientX, e.clientY); // ✅ MouseEvent
});

registrarListener("change", (e) => {
  console.log(e.data); // ✅ InputEvent
});

registrarListener("submit", (e) => {
  console.log(e.key); // ✅ KeyboardEvent
});

// ❌ Si intentas usar un tipo incorrecto, TypeScript lo detecta:
registrarListener("click", (e) => {
  // e.data; // ❌ Error: MouseEvent no tiene la propiedad 'data'
});
