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
type Triangulo={
  kind:'triangle',
  base:number,
  height:number
}
type Circle={
  kind:'circle',
  radius:number,
}
type Square={
  kind:'square',
  side:number
}
type Shape= Triangulo | Circle | Square;
function area(shape:Shape):number{
  switch (shape.kind){
    case 'triangle':
      return (shape.base * shape.height)/2
    case 'circle':
      return (shape.radius**2)*Math.PI
    case 'square':
      return (shape.side*shape.side)
    default:
      const _exhaustive:never=shape
      return _exhaustive
  }

}
let figura:Circle={
  kind:'circle',
  radius:5
}
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
  type: 'click';
  x: number;
  y: number;
};

type Keypress = {
  type: 'keypress';
  key: string;
};

type Resize = {
  type: 'resize';
  width: number;
  height: number;
};

type SystemEvent = Click | Keypress | Resize;

function handleEvent(event: SystemEvent): void {
  switch (event.type) {
    case 'click':
      // TypeScript sabe que event es de tipo Click aquí
      console.log(`Click detectado en posición (${event.x}, ${event.y})`);
      break;

    case 'keypress':
      // Aquí event es de tipo Keypress
      console.log(`Has presionado la tecla: ${event.key}`);
      break;

    case 'resize':
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
  drive(){
    console.log ('Conduciendo')
  }
}
class Bike {
  pedal(){
    console.log('pedaleando')
  }
}

type Vehicle= Car | Bike

function useVehicle(v: Vehicle){
  if (v instanceof Car){
    v.drive()
  }else{
    v.pedal()
  }
}
let toyota=new Car()
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
  id:string,
  name:string,
  price:number
}
function isProduct(value: unknown):{ok:boolean;value?:Product;mensaje?:string}{
if (typeof value !=='object')
  return {ok:false,mensaje:'Esto no es un producto'}
}




//
//12. **Analizador con retorno extendido:**
//   ```ts
//   // Crea una función analyzeOrder(obj: unknown)
//   // que devuelva { ok: boolean; order?: { id: number; items: string[] }; reason?: string }.
//   // Luego crea un type guard isOrder(value: unknown): value is { id: number; items: string[] }.
//   // Combina ambos en un flujo de validación completo.
//   ```
