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

console.log(admins);
