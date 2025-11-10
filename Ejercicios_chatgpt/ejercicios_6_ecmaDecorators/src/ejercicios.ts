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
//@TagInfo
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
//console.log(alimento1.disponibilidad);
let alimento2 = new Alimento("ciruelas", 3);
alimento2.disponibilidad = false;
//console.log(alimento2.disponibilidad);

//### **Ejercicio 2.3 — Decorador de método con restricción**
//Implementa `@ReadonlyMethod` que haga que el método no pueda ser reasignado posteriormente.
//
//**Objetivo:**  
//Aplicar `Object.defineProperty` dentro del decorador para proteger la referencia del método.
//
//```ts
//// ✍️ Implementa ReadonlyMethod

function ReadonlyMethod(value: any, context: ClassMethodDecoratorContext) {
  if (context.kind === "method") {
    context.addInitializer(function () {
      Object.defineProperty(
        (this as any).constructor.prototype,
        context.name,
        {
          value,
          writable: false,
          configurable: false,
        }
      );
      console.log(`[ReadonlyMethod] Aplicado sobre ${String(context.name)}`);
    });
  }
  return value;
}

//@TagInfo
class Empleado {
  constructor(public nombre: string) {}

  @ReadonlyMethod
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

//const e = new Empleado("Fran");
//e.saludar(); // ✅ "Hola, soy Fran"
//
//// Intentar sobrescribir el método
//try {
//  (e as any).saludar = function () {
//    console.log("Adiós!");
//  };
//  console.log("Método sobrescrito con éxito (¿?)");
//} catch (err) {
//  console.error("Error al sobrescribir:", err);
//}
//
//e.saludar(); // 🔒 Sigue siendo el original

//### **Ejercicio 3.1 — Uso de `context.addInitializer`**
//Crea `@RegisterInstance` que:
//- Registre cada instancia creada en una lista estática `instances` dentro de la clase.
//- Usa `context.addInitializer` para ejecutar el código de registro cuando se construye la instancia.
//
//**Objetivo:**  
//Practicar el uso de `context.addInitializer` para ejecutar lógica durante la inicialización del objeto.

function RegisterInstance(value: any, context: ClassDecoratorContext) {
  if (context.kind === "class") {
    // Añadimos una propiedad estática 'instances' al constructor
    (value as any).instances = [];

    // Creamos una nueva clase que extiende la original
    const newClass = class extends value {
      constructor(...args: any[]) {
        super(...args);
        // Registramos cada instancia creada
        (value as any).instances.push(this);
      }
    };

    // Mensaje informativo al aplicar el decorador
    console.log(`[RegisterInstance] Decorando clase: ${context.name}`);

    // Retornamos la nueva clase decorada
    return newClass;
  }
}
//@RegisterInstance
class PruebaInstancias {
  constructor(public id: number) {}
}

const a = new PruebaInstancias(1);
const b = new PruebaInstancias(2);
const c = new PruebaInstancias(3);

//console.log("Instancias registradas:", PruebaInstancias.instances);

//### **Ejercicio 3.2 — Decorador de campo que valida tipo**
//Crea `@TypeCheck(expectedType)` que:
//- Guarde el valor original del campo.
//- Use `addInitializer` para verificar, al instanciar la clase, que el tipo del campo coincide con `expectedType`.
//- Lance un error si no coincide.
//
//**Objetivo:**  
//Us
function TypeCheck(expectedType: string) {
  return function (_: undefined, context: ClassFieldDecoratorContext) {
    // Creamos un símbolo único para almacenar el valor interno
    const key = Symbol(String(context.name));

    context.addInitializer(function () {
      // Redefinimos la propiedad en la instancia
      Object.defineProperty(this, context.name, {
        get() {
          return this[key];
        },
        set(value) {
          if (typeof value !== expectedType) {
            throw new TypeError(
              `El campo "${String(context.name)}" debe ser de tipo ${expectedType}`
            );
          }
          this[key] = value;
        },
        enumerable: true,
        configurable: true,
      });
    });
  };
}


class PruebaCampo {
  @TypeCheck("number")
  public campo!: number;
}

const p1 = new PruebaCampo();

// Asignación válida
p1.campo = 123;
console.log(p1.campo); // "hola"

// Asignación inválida
try {
  p1.campo = 'Hola'; // ❌ TypeError
} catch (err) {
  console.error(err.message); // El campo "campo" debe ser de tipo string
}

//### **Ejercicio 3.3 — Decorador de método con memoización**
//Crea `@Memoize` que:
//- Guarde los resultados de la función en un `Map` basado en los argumentos.
//- Devuelva el resultado cacheado si el método se llama con los mismos argumentos.
//
//**Objetivo:**  
//Usar cierre (*closure*) dentro del decorador para mantener estado entre llamadas.

function Memoize(value: any, context: ClassMethodDecoratorContext) {
  if (context.kind !== "method") return value; // solo para métodos

  // Creamos un Map para almacenar los resultados
  const cache = new Map<string, any>();

  // Retornamos una función wrapper que reemplaza al método original
  return function (...args: any[]) {
    // Generamos una clave basada en los argumentos
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`[Memoize] Cache encontrado para ${String(context.name)}(${key})`);
      return cache.get(key);
    }

    // Llamamos al método original
    const result = value.apply(this, args);

    // Guardamos el resultado en cache
    cache.set(key, result);
    console.log(`[Memoize] Guardado en cache: ${String(context.name)}(${key}) = ${result}`);
    return result;
  };
}
class Calculadora {
  // Decoramos el método con @Memoize
  @Memoize
  factorial(n: number): number {
    console.log(`Calculando factorial(${n})`);
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }
}

const calc = new Calculadora();

// Primera llamada → se calcula
console.log(calc.factorial(5));
// Segunda llamada → se devuelve cache
console.log(calc.factorial(5));


