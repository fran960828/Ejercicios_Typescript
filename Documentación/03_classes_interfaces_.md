# DOCUMENTACIÓN RÁPIDA DE TYPESCRIPT — Nivel: Principiante → Profesional

---

**Objetivo:** Explicar, con claridad y ejemplos comentados, cómo usar las características clave de TypeScript relacionadas con clases, propiedades y tipos: inicialización de propiedades, modificadores de acceso (public/private/protected), readonly, getters/setters, static, herencia (extends/super), abstract classes, interfaces, diferencias entre `type` e `interface`, `implements` y herencia entre interfaces.

Cada sección contiene:
1. Explicación conceptual y buenas prácticas.
2. Ejemplo sencillo con comentarios paso a paso.

Lee la explicación y luego ejecuta/experimenta con el ejemplo en tu entorno TypeScript (ts-node / playground).

---

## Índice
1. Inicializar propiedades en TypeScript (vs JavaScript)  
2. `public` / `private` antes de los parámetros del constructor (y declarar propiedades fuera del constructor)  
3. `readonly` (propiedades y arrays — diferencias importantes)  
4. `get` y `set` (getters y setters)  
5. `static` (propiedades y métodos estáticos)  
6. Herencia con `extends`, `super` y `protected`  
7. `abstract class` (clases abstractas)  
8. `interface` (como objeto y como contrato)  
9. Comparativa: `type` vs `interface` (incluye merge de interfaces)  
10. Uso de `implements` en clases  
11. Herencia en interfaces con `extends`  

---

## 1. Inicializar propiedades en TypeScript (¿es diferente a JavaScript?)

**Explicación:**  
En JavaScript puedes añadir propiedades en cualquier momento (por ejemplo `this.x = 1` dentro del constructor), y no hay comprobación de tipos.  
TypeScript añade tipado estático y reglas sobre la inicialización de propiedades: si una propiedad no se inicializa ni en su declaración ni en el constructor, TypeScript mostrará un error (según `--strictPropertyInitialization`).

Puedes:
- Inicializar en la declaración.
- Inicializar en el constructor.
- Marcar la propiedad como opcional (`?`) o `| undefined`.
- Usar el non-null assertion `!` si estás seguro que la inicializarás antes de usarla.

**Ejemplo:**
```ts
class Persona {
  nombre: string = "Sin nombre";
  edad: number;
  apodo?: string;
  saludo!: string;

  constructor(edad: number, nombre?: string) {
    if (nombre) this.nombre = nombre;
    this.edad = edad;
    this.saludo = `Hola, soy ${this.nombre}`;
  }
}

const p = new Persona(30, "Ana");
console.log(p.nombre, p.edad, p.saludo);
```

---

## 2. `public`, `private` antes de los parámetros del constructor (shorthand)

**Explicación:**  
TypeScript permite declarar propiedades directamente en los parámetros del constructor.  
Al anteponer `public`, `private`, `protected` o `readonly`, TypeScript crea automáticamente las propiedades y las inicializa.

**Ejemplo:**
```ts
class UsuarioA {
  public nombre: string;
  private password: string;

  constructor(nombre: string, password: string) {
    this.nombre = nombre;
    this.password = password;
  }
}

class UsuarioB {
  constructor(public nombre: string, private password: string) {}
}

const a = new UsuarioA("María", "secretoA");
const b = new UsuarioB("Luis", "secretoB");

console.log(a.nombre);
console.log(b.nombre);
```

---

## 3. `readonly` — propiedades y arrays

**Explicación:**  
`readonly` impide reasignar la propiedad después de inicializarla, pero **no** evita mutar su contenido si es un objeto o array.

**Ejemplo:**
```ts
class Carrito {
  readonly productos: string[] = [];
  readonly inmovil: readonly string[] = ["fijo"];

  constructor() {
    this.productos.push("manzana");
    // this.inmovil.push("pera"); // ERROR
    // this.productos = []; // ERROR
  }
}
```

---

## 4. Getters y setters (`get` / `set`)

**Ejemplo:**
```ts
class Rectangulo {
  private _ancho: number;
  private _alto: number;

  constructor(ancho: number, alto: number) {
    this._ancho = ancho;
    this._alto = alto;
  }

  get area(): number {
    return this._ancho * this._alto;
  }

  get ancho(): number {
    return this._ancho;
  }
  set ancho(valor: number) {
    if (valor <= 0) throw new Error("El ancho debe ser > 0");
    this._ancho = valor;
  }
}
```

---

## 5. `static` en propiedades y métodos

**Ejemplo:**
```ts
class Contador {
  static instancias = 0;

  constructor() {
    Contador.instancias += 1;
  }

  static obtenerInstancias() {
    return Contador.instancias;
  }
}

const a = new Contador();
const b = new Contador();
console.log(Contador.obtenerInstancias()); // 2
```

---

## 6. Herencia con `extends`, `super` y `protected`

**Ejemplo:**
```ts
class Animal {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  hablar() {
    return `${this.nombre} hace un sonido.`;
  }
}

class Perro extends Animal {
  private raza: string;

  constructor(nombre: string, raza: string) {
    super(nombre);
    this.raza = raza;
  }

  hablar() {
    return `${this.nombre} ladra. (raza: ${this.raza})`;
  }
}
```

---

## 7. `abstract class`

**Ejemplo:**
```ts
abstract class Figura {
  constructor(public color: string) {}

  describir() {
    return `Figura de color ${this.color}`;
  }

  abstract area(): number;
}

class Circulo extends Figura {
  constructor(color: string, public radio: number) {
    super(color);
  }

  area(): number {
    return Math.PI * this.radio * this.radio;
  }
}
```

---

## 8. `interface` — como objeto o contrato

**Ejemplo:**
```ts
interface IUser {
  id: number;
  nombre: string;
  email?: string;
  saludar(): string;
}

const usuario: IUser = {
  id: 1,
  nombre: "Ana",
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
};
```

---

## 9. Comparativa: `type` vs `interface`

**Diferencias clave:**
- `interface` puede hacer *declaration merging*.
- `type` puede describir uniones, tuplas, tipos complejos.
- Usa `interface` para API públicas y `type` para composiciones internas.

**Ejemplo:**
```ts
interface Config {
  host: string;
}
interface Config {
  port: number;
}

const cfg: Config = { host: "localhost", port: 8080 };

type Persona = { nombre: string };
// type Persona = { edad: number }; // Error: duplicado
```

---

## 10. Uso de `implements` en clases

**Ejemplo:**
```ts
interface IVehiculo {
  encender(): void;
  apagar(): void;
  velocidad?: number;
}

class Moto implements IVehiculo {
  velocidad = 0;

  encender() {
    console.log("Moto encendida");
  }
  apagar() {
    console.log("Moto apagada");
  }
}
```

---

## 11. Herencia en interfaces (`extends`)

**Ejemplo:**
```ts
interface SerVivo {
  vida: number;
  respirar(): void;
}

interface Persona extends SerVivo {
  nombre: string;
  hablar(): void;
}

const p: Persona = {
  vida: 100,
  nombre: "Luis",
  respirar() {
    console.log("respirando...");
  },
  hablar() {
    console.log("hola");
  }
};
```

---

## Ejemplo final completo — combinando varios conceptos

```ts
interface IEntity {
  id: number;
  createdAt: Date;
  toJSON(): object;
}

abstract class BaseEntity implements IEntity {
  readonly tags: string[] = [];
  protected id: number;
  createdAt: Date;
  private static _counter = 0;

  constructor() {
    this.id = ++BaseEntity._counter;
    this.createdAt = new Date();
  }

  getId() {
    return this.id;
  }

  addTag(tag: string) {
    this.tags.push(tag);
  }

  abstract toJSON(): object;
}

class Usuario extends BaseEntity {
  constructor(public nombre: string, private _password: string) {
    super();
  }

  get displayName() {
    return this.nombre.toUpperCase();
  }

  set password(nueva: string) {
    if (nueva.length < 6) throw new Error("Password muy corto");
    this._password = nueva;
  }

  toJSON() {
    return {
      id: this.getId(),
      nombre: this.nombre,
      createdAt: this.createdAt,
      tags: this.tags.slice()
    };
  }
}

class Admin extends Usuario {
  constructor(nombre: string, password: string, public nivel: number = 1) {
    super(nombre, password);
  }

  static crearSuperAdmin(nombre: string, password: string) {
    const a = new Admin(nombre, password, 99);
    a.addTag("super");
    return a;
  }

  toJSON() {
    return { ...super.toJSON(), nivel: this.nivel };
  }
}

const u = new Usuario("Ana", "123456");
u.addTag("nuevo");
console.log(u.displayName);
u.password = "nuevopass";

const sa = Admin.crearSuperAdmin("Root", "rootpass");
console.log(sa.toJSON());
```

---

## Consejos de uso profesional
- Activa `strict` en `tsconfig.json`.
- Inicializa propiedades o decláralas como opcionales.
- Usa `private` y `protected` para encapsular.
- Usa `readonly` para evitar reasignaciones accidentales.
- Usa `interface` para contratos públicos y `type` para uniones o composiciones.
- Recuerda: interfaces y tipos desaparecen en tiempo de ejecución (solo existen en compilación).

---
