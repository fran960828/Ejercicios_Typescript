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
