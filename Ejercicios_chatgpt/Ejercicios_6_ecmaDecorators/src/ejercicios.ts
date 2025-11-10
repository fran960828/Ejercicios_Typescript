// ### **Ejercicio 1.1 — Explorando el `context`**
// Crea un decorador `@InspectContext` que imprima en consola la información de `context` (propiedades `kind`, `name`, `static`, `private`) al aplicarse sobre una clase, método y campo.

// **Objetivo:**
// Entender qué datos contiene `context` en cada tipo de uso.

// **Pistas:**
// - `context.kind` puede ser `"class"`, `"method"`, `"field"`, etc.
// - Usa este decorador sobre distintos elementos para comparar.

// ```ts

function InspectContext(target: any, context: ClassFieldDecoratorContext) {
  console.log(context);
}

class Persona {
  // @InspectContext
  public numero: number;
  constructor(private name: string, public age: number) {}
  get _name() {
    return this.name;
  }
}

let persona1 = new Persona("Fran", 29);

// ### **Ejercicio 1.2 — Decorador de clase informativo**
// Crea un decorador `@TagInfo` que agregue una propiedad estática `tag = "decorated"` a cualquier clase.

// **Objetivo:**
// Modificar una clase sin reemplazarla, solo añadiendo metadatos.

// **Bonus:** imprime un mensaje en consola al momento de aplicar el decorador indicando el nombre de la clase.

// ```ts

function TagInfo(value: any, context: ClassDecoratorContext) {
  value.tag = "decorator";
  console.log(`[TagInfo] Decorando clase: ${String(context.name)}`);
  return value;
}
@TagInfo
class Person {
  constructor(private name: string, public age: number) {}
  get _name() {
    return this.name;
  }
}
let person1 = new Person("Fran", 19);
// console.log(Person.tag);

// ## **Ejercicio 2.1 — Decorador de método para medir tiempo de ejecución**
// Crea `@MeasureTime` que:
// - Mida el tiempo que tarda un método en ejecutarse.
// - Imprima el tiempo en milisegundos junto al nombre del método.

// **Objetivo:**
// Aprender a envolver una función (`value`) y devolver otra función con lógica adicional.

// ```ts

function MeasureTime(value: any, context: ClassMethodDecoratorContext) {
  // Retornamos una nueva función que envuelve la original
  return function (...args: any[]) {
    const start = performance.now(); // ⏱️ inicio
    const result = value.apply(this, args); // ejecutamos el método original
    const end = performance.now(); // ⏱️ fin

    console.log(
      `[MeasureTime] Método "${String(context.name)}" ejecutado en ${(
        end - start
      ).toFixed(2)} ms`
    );

    return result; // devolvemos el resultado original
  };
}

class Producto {
  constructor(
    public name: string,
    public price: number,
    public unidades: number
  ) {}

  @MeasureTime
  obtenerPrecio() {
    let precioTotal = 0;
    for (let i = 0; i < 1_000_000; i++) {
      precioTotal = this.price * this.unidades;
    }
    return precioTotal;
  }
}

// 🧪 Prueba
// const prod = new Producto("Teclado", 20, 15);
// console.log(`Precio total: ${prod.obtenerPrecio()}`);

// ### **Ejercicio 2.2 — Decorador de campo con valor por defecto**
// Crea `@Default(defaultValue)` que establezca un valor por defecto si el inicializador del campo devuelve `undefined`.

// **Objetivo:**
// Aprender a devolver una función *initializer* en decoradores de campo.

// ```ts
// // ✍️ Implementa Default y pruébalo en una clase con varios campos opcionales

function defaultfn(defaultValue: any) {
  return function (initialValue: any, context: ClassFieldDecoratorContext) {
    return function fieldInitializer(this: any, value: any) {
      return initialValue === undefined ? defaultValue : initialValue;
    };
  };
}

class Alimento {
  @defaultfn(true)
  public disponibilidad?: boolean;
  constructor(public name: string, public price: number) {}
}

let alimento1 = new Alimento("arandanos", 14);
console.log(alimento1.disponibilidad);
let alimento2 = new Alimento("ciruelas", 3);
alimento2.disponibilidad = false;
console.log(alimento2.disponibilidad);
