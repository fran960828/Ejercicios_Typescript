// ### 🧩 Ejercicio 1: Array Genérico
// **Objetivo:** Familiarizarte con `Array<T>` y su equivalencia con `T[]`.

// **Instrucción:**
// Crea una función genérica `createArray<T>` que acepte un solo valor y devuelva un `Array<T>` con ese valor repetido tres veces.

function createArray<T>(value: T): T[] {
  let array: T[] = [];
  for (let i = 0; i < 3; i++) {
    array.push(value);
  }
  return array;
}
// console.log(createArray(5));

// ### 🧩 Ejercicio 2: Genéricos con inferencia automática
// **Objetivo:** Comprender la inferencia automática de tipos genéricos.

// **Instrucción:**
// Crea una función genérica `identity` que devuelva exactamente el mismo valor que recibe. No indiques el tipo explícitamente: TypeScript debe inferirlo.
function identity<T>(value: T): T {
  return value;
}
// console.log(typeof identity("Hola"));
// console.log(identity("Hola"));

// ### 🧩 Ejercicio 3: DataContainer Genérico
// **Objetivo:** Crear tu propio tipo genérico.

// **Instrucción:**
// Define un tipo `DataContainer<T>` que contenga una propiedad `data` de tipo `T` y un método `print()` que muestre el contenido por consola.

type DataContainer<T> = {
  data: T;
  print: () => void;
};

let saludo: DataContainer<string> = {
  data: "Hola que tal",
  print: () => {
    console.log(saludo.data);
  },
};
// saludo.print();
let calculo: DataContainer<number> = {
  data: 7,
  print: () => {
    console.log(calculo.data * 7);
  },
};
// calculo.print();

// ### 🧩 Ejercicio 4: Función genérica con varios parámetros `<T, U>`
// **Objetivo:** Practicar múltiples parámetros genéricos.

// **Instrucción:**
// Implementa una función `combine<T, U>(first: T, second: U)` que devuelva un objeto `{ first, second }`.

function combine<T, U>(first: T, second: U): { first: T; second: U } {
  return { first, second };
}

// console.log(combine(true, 78));

// ## 🧩 Ejercicio 5: Filtrar por Propiedad
// **Objetivo:** Usar `extends` para restringir el tipo.

// **Instrucción:**
// Crea una función `filterById<T extends { id: number }>(items: T[], id: number)` que devuelva el elemento cuyo `id` coincida.

interface identificador {
  id: number;
}
function filterById<T extends identificador>(items: T[], id: number) {
  let item = items.filter((it) => it.id === id);
  return item;
}

const users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Luis" },
];
// console.log(filterById(users, 1));

// ### 🧩 Ejercicio 6: Mezclar Objetos
// **Objetivo:** Restringir los genéricos a objetos y practicar el *spread operator*.

// **Instrucción:**
// Crea una función genérica `mergeObjects<T extends object, U extends object>(objA: T, objB: U)` que combine las propiedades de ambos objetos.

function mergeObjects<T extends object, U extends object>(objA: T, objB: T) {
  return { ...objA, ...objB };
}

// console.log(mergeObjects({ name: "Fran" }, { edad: 29 }));

// ### 🧩 Ejercicio 7: Clase Genérica `Box<T>`
// **Objetivo:** Practicar clases genéricas.

// **Instrucción:**
// Crea una clase `Box<T>` que permita guardar un valor (`value: T`) y un método `getValue(): T`.

class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

let box1 = new Box("Caja");
// console.log(box1.getValue());

// ### 🧩 Ejercicio 8: Repositorio en Memoria (Interfaz + Clase)
// **Objetivo:** Integrar interfaces genéricas con clases concretas.

// **Instrucción:**
// Define una interfaz genérica `Repository<T>` con los métodos `save(entity: T)` y `findAll(): T[]`. Implementa una clase `InMemoryRepository<T>`
// que use un array interno para guardar los datos.
interface Repository<T> {
  save(entity: T): void;
  findAll(): T[];
}

class InMemoryRepository<T> implements Repository<T> {
  private container: T[] = [];

  save(entity: T) {
    this.container.push(entity);
  }
  findAll(): T[] {
    return this.container;
  }
}
interface Persona {
  nombre: string;
  edad: number;
}

let repositorio = new InMemoryRepository<Persona>();
repositorio.save({ nombre: "francisco", edad: 29 });
repositorio.save({ nombre: "Ivan", edad: 46 });
repositorio.save({ nombre: "anatoly", edad: 35 });
// console.log(repositorio.findAll());

// ### 🧩 Ejercicio 9: Repositorio con ID Genérico
// **Objetivo:** Combinar genéricos múltiples, constraints y valores por defecto.

// **Instrucción:**
// Implementa una interfaz `Repository<T extends { id: ID }, ID = string>` y una clase `MemoryRepo<T, ID>` que use un `Map<ID, T>` para almacenar elementos.

// Agrega los métodos `save()`, `findById()` y `findAll()`.
interface repositorio<T extends { id: ID }, ID = string> {
  save(entity: T): void;
  findById(id: ID): T | undefined;
  findAll(): T[];
}

class memoryRepo<T extends { id: ID }, ID = string>
  implements repositorio<T, ID>
{
  private mapa = new Map<ID, T>();

  save(entity: T): void {
    this.mapa.set(entity.id, entity);
  }

  findById(id: ID): T | undefined {
    return this.mapa.get(id);
  }
  findAll(): T[] {
    return Array.from(this.mapa.values());
  }
}

interface persona {
  id: string;
  name: string;
  age: number;
}

let repo = new memoryRepo<persona, string>();

// Guardamos varios usuarios en el repositorio
repo.save({ id: "u1", name: "Lucía", age: 28 });
repo.save({ id: "u2", name: "Carlos", age: 35 });
repo.save({ id: "u3", name: "Ana", age: 22 });

// Recuperamos un usuario por su id
const encontrado = repo.findById("u2");
//console.log("🔍 Usuario encontrado:", encontrado);

// Listamos todos los usuarios guardados
//console.log("📦 Todos los usuarios:", repo.findAll());


//### 🧩 Ejercicio 10: Utilidad Genérica `pluck`
//**Objetivo:** Usar *keyof* y constraints con propiedades dinámicas.
//
//**Instrucción:**
//Crea una función `pluck<T, K extends keyof T>(items: T[], key: K): T[K][]` que extraiga el valor de una 
//propiedad específica de todos los objetos del array.

function pluck<T,K extends keyof T>(items:T[],key:K):T[K][]{
  let lista=[]
 for (let it of items){
    lista.push(it[key])
 }
 return lista
}

const usuarios = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Luis" },
];
//console.log(pluck(usuarios,'name'))


//### 🧩 Ejercicio 11: Cache Genérica con Expiración
//**Objetivo:** Aplicar clases genéricas con comportamiento complejo.
//
//**Instrucción:**
//Crea una clase `Cache<T>` con:
//- Método `set(key: string, value: T, ttlMs: number)`
//- Método `get(key: string): T | undefined` (expira automáticamente pasado el tiempo indicado)
//
//Usa `Map` internamente y controla el tiempo de expiración con `Date.now()`

class Cache<T>{
  private mapa=new Map<string,{value:T,expire:number}>()
  
  set(key:string,value:T,ttlMs:number){
    let expire=Date.now()+ttlMs
    this.mapa.set(key,{value,expire})
  }
  get(key:string):T|undefined{
    const item=this.mapa.get(key)
    if (!item){
      return undefined
    }

    if (Date.now()>item.expire){
      this.mapa.delete(key)
      return undefined
    }

    return item.value
  }
}

let cache=new Cache<string>()

cache.set('nombre','Ana',20*1000)

//console.log(cache.get('nombre'))
//
//console.log(cache.get('edad'))
//
//setTimeout(() => {
//  console.log(cache.get('nombre'))
//}, 30*1000);

//### 🧩 Ejercicio 12: Transformador Flexible `<T, U>`
//**Objetivo:** Crear funciones genéricas con transformación de tipos.
//
//**Instrucción:**
//Implementa una función `mapArray<T, U>(arr: T[], fn: (item: T) => U): U[]`.
//
//```ts
//// Ejemplo:
//const numbers = [1, 2, 3];
//const doubled = mapArray(numbers, n => n * 2); // [2, 4, 6]

function mapArray<T,U>(array:T[],fn:(item:T)=>U):U[]{
  return array.map((item)=>fn(item))
}
//console.log(mapArray<number,number>([1,2,3,4],(item)=>item*3))

//### 🧩 Ejercicio 13: Validación Tipada Avanzada
//**Objetivo:** Dominar constraints con condiciones.
//
//**Instrucción:**
//Crea una función `validateField<T extends object, K extends keyof T>(obj: T, key: K): boolean` que verifique que el campo no sea `null` ni `undefined`.
//
//```ts
//const person = { name: "Ana", age: 25 };
//validateField(person, "name"); // true
//validateField(person, "email"); // Error: 'email' no existe en 'person'
//```

function validateField<T extends object,K extends keyof T>(obj:T,key:K):boolean{
  if (obj[key]){
    return true
  }
  return false
}

const student={name:'Fran',age:29,discipline:'fullstack'}
//console.log(validateField(student,'age'))
//console.log(validateField(student,'nacionality'))

//### 🧩 Ejercicio 14: Builder Genérico
//**Objetivo:** Simular un patrón de diseño usando genéricos.
//
//**Instrucción:**
//Crea una clase `Builder<T>` que permita construir objetos paso a paso con métodos encadenados, y un método `build(): T` que devuelva el resultado.
//
//```ts
//interface User { id: number; name: string; active: boolean }
//const user = new Builder<User>()
//  .set("id", 1)
//  .set("name", "Lucía")
//  .set("active", true)
//  .build();
//```
