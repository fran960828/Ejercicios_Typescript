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
  appName:'efemis',
  version:1.8,
  darkMode:true,
  languages:['Español','Ingles','Aleman']
}

type settingsType=typeof settings

let config:settingsType = {
  appName:'agroslab',
  version:2.5,
  darkMode:false,
  languages:['Ingles','Chino','Japones']
}

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
  marca:string,
  modelo:string,
  año:number,
  color:string
}
type vehiculokey=keyof vehiculo

const ford:vehiculo={
  marca:'Ford',
  modelo:'Focus',
  año:2017,
  color:'blanco'
}

function getfield<T extends vehiculo,U extends vehiculokey>(obj:T,key:U):T[U]|undefined{
  return obj[key]
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

type User={
  id:number,
  nombre:string,
  roles:string[]
}
const usuario:User={
  id:1,
  nombre:'Francisco',
  roles:['tecnico','enologo']
}

type TipoNombre=User['nombre']
type TipoRoles=User['roles'][number]

function agregarRol(usuario:User,nuevoRol:TipoRoles):User{
  usuario['roles'].push(nuevoRol)
  return usuario
}
console.log(agregarRol(usuario,'informatico'))

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

const libro = { titulo: "1984", autor: "Orwell", paginas: 300 }

type Book= typeof libro
type Keys= keyof Book

function actualizarPropiedad<T extends object,U extends keyof T>(obj:T,key:U,value:T[U]):T{
  return {...obj,[key]:value}
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
  nombre:string,
  edad:number,
  ciudad:string
}

type Partial<T> = {
  [K in keyof T]?:T[K]
}

type PersonaPartial=Partial<Persona>

const francisco:PersonaPartial={
  nombre:'Francisco',
  edad:29,
  ciudad:'Albacete'
}
console.log(actualizarPropiedad(francisco,'edad',24))

type Inmutable<T> ={
  readonly [K in keyof T]:T[K]
} 
type PersonaInmutable=Inmutable<Persona>

const persona2:PersonaInmutable= {
  nombre:'Javier',
  edad:34,
  ciudad:'Albacete'
}

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
  [K in keyof T as K extends
    `${infer preffix}_${infer suffix}` ?
    `${preffix}${Capitalize<suffix>}`:
    K
  ]:T[K]
}

type CamelCaseApiResponse=Separar<ApiResponse>
