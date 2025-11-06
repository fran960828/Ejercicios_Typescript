# Ejercicios Prácticos: Dominando los *Generics* en TypeScript

A continuación encontrarás una serie de ejercicios diseñados para reforzar tu comprensión de los *genéricos* en TypeScript. Los ejercicios comienzan con conceptos básicos y avanzan gradualmente hasta alcanzar un nivel profesional.

Cada ejercicio incluye:
- Un **objetivo claro**
- Una breve **explicación de lo que se busca practicar**
- Indicaciones o fragmentos de código incompletos que deberás completar

---

## **Nivel 1 — Fundamentos de Genéricos**

### 🧩 Ejercicio 1: Array Genérico
**Objetivo:** Familiarizarte con `Array<T>` y su equivalencia con `T[]`.

**Instrucción:**
Crea una función genérica `createArray<T>` que acepte un solo valor y devuelva un `Array<T>` con ese valor repetido tres veces.

```ts
function createArray<T>(value: T): Array<T> {
  // TODO: devuelve un array con tres copias del valor recibido
}

// Resultado esperado:
// createArray<number>(5) => [5, 5, 5]
// createArray<string>("TS") => ["TS", "TS", "TS"]
```

---

### 🧩 Ejercicio 2: Genéricos con inferencia automática
**Objetivo:** Comprender la inferencia automática de tipos genéricos.

**Instrucción:**
Crea una función genérica `identity` que devuelva exactamente el mismo valor que recibe. No indiques el tipo explícitamente: TypeScript debe inferirlo.

```ts
function identity<T>(value: T): T {
  // TODO: retorna el valor tal cual
}

// identity(123) => 123 (tipo: number)
// identity("Hola") => "Hola" (tipo: string)
```

---

## **Nivel 2 — Tipos y Funciones Genéricas Propias**

### 🧩 Ejercicio 3: DataContainer Genérico
**Objetivo:** Crear tu propio tipo genérico.

**Instrucción:**
Define un tipo `DataContainer<T>` que contenga una propiedad `data` de tipo `T` y un método `print()` que muestre el contenido por consola.

```ts
type DataContainer<T> = {
  data: T;
  print: () => void;
};

// Crea una instancia con data tipo string y otra con tipo number.
```

---

### 🧩 Ejercicio 4: Función genérica con varios parámetros `<T, U>`
**Objetivo:** Practicar múltiples parámetros genéricos.

**Instrucción:**
Implementa una función `combine<T, U>(first: T, second: U)` que devuelva un objeto `{ first, second }`.

```ts
// Ejemplo:
const result = combine<string, number>("edad", 25);
// Esperado: { first: "edad", second: 25 }
```

---

## **Nivel 3 — Constraints (Restricciones con `extends`)**

### 🧩 Ejercicio 5: Filtrar por Propiedad
**Objetivo:** Usar `extends` para restringir el tipo.

**Instrucción:**
Crea una función `filterById<T extends { id: number }>(items: T[], id: number)` que devuelva el elemento cuyo `id` coincida.

```ts
const users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Luis" },
];

const found = filterById(users, 2); // { id: 2, name: "Luis" }
```

---

### 🧩 Ejercicio 6: Mezclar Objetos
**Objetivo:** Restringir los genéricos a objetos y practicar el *spread operator*.

**Instrucción:**
Crea una función genérica `mergeObjects<T extends object, U extends object>(objA: T, objB: U)` que combine las propiedades de ambos objetos.

```ts
const merged = mergeObjects({ name: "Ana" }, { age: 25 });
// Resultado: { name: "Ana", age: 25 }
```

---

## **Nivel 4 — Clases e Interfaces Genéricas**

### 🧩 Ejercicio 7: Clase Genérica `Box<T>`
**Objetivo:** Practicar clases genéricas.

**Instrucción:**
Crea una clase `Box<T>` que permita guardar un valor (`value: T`) y un método `getValue(): T`.

```ts
const box = new Box<number>(99);
box.getValue(); // 99
```

---

### 🧩 Ejercicio 8: Repositorio en Memoria (Interfaz + Clase)
**Objetivo:** Integrar interfaces genéricas con clases concretas.

**Instrucción:**
Define una interfaz genérica `Repository<T>` con los métodos `save(entity: T)` y `findAll(): T[]`. Implementa una clase `InMemoryRepository<T>` que use un array interno para guardar los datos.

```ts
interface Repository<T> {
  save(entity: T): void;
  findAll(): T[];
}

class InMemoryRepository<T> implements Repository<T> {
  // TODO: implementar usando un array interno
}
```

---

## **Nivel 5 — Ejercicios Profesionales (Avanzados)**

### 🧩 Ejercicio 9: Repositorio con ID Genérico
**Objetivo:** Combinar genéricos múltiples, constraints y valores por defecto.

**Instrucción:**
Implementa una interfaz `Repository<T extends { id: ID }, ID = string>` y una clase `MemoryRepo<T, ID>` que use un `Map<ID, T>` para almacenar elementos.

Agrega los métodos `save()`, `findById()` y `findAll()`.

---

### 🧩 Ejercicio 10: Utilidad Genérica `pluck`
**Objetivo:** Usar *keyof* y constraints con propiedades dinámicas.

**Instrucción:**
Crea una función `pluck<T, K extends keyof T>(items: T[], key: K): T[K][]` que extraiga el valor de una propiedad específica de todos los objetos del array.

```ts
const users = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Luis" },
];

const names = pluck(users, "name"); // ['Ana', 'Luis']
```

---

### 🧩 Ejercicio 11: Cache Genérica con Expiración
**Objetivo:** Aplicar clases genéricas con comportamiento complejo.

**Instrucción:**
Crea una clase `Cache<T>` con:
- Método `set(key: string, value: T, ttlMs: number)`
- Método `get(key: string): T | undefined` (expira automáticamente pasado el tiempo indicado)

Usa `Map` internamente y controla el tiempo de expiración con `Date.now()`.

---

### 🧩 Ejercicio 12: Transformador Flexible `<T, U>`
**Objetivo:** Crear funciones genéricas con transformación de tipos.

**Instrucción:**
Implementa una función `mapArray<T, U>(arr: T[], fn: (item: T) => U): U[]`.

```ts
// Ejemplo:
const numbers = [1, 2, 3];
const doubled = mapArray(numbers, n => n * 2); // [2, 4, 6]
```

---

### 🧩 Ejercicio 13: Validación Tipada Avanzada
**Objetivo:** Dominar constraints con condiciones.

**Instrucción:**
Crea una función `validateField<T extends object, K extends keyof T>(obj: T, key: K): boolean` que verifique que el campo no sea `null` ni `undefined`.

```ts
const person = { name: "Ana", age: 25 };
validateField(person, "name"); // true
validateField(person, "email"); // Error: 'email' no existe en 'person'
```

---

### 🧩 Ejercicio 14: Builder Genérico
**Objetivo:** Simular un patrón de diseño usando genéricos.

**Instrucción:**
Crea una clase `Builder<T>` que permita construir objetos paso a paso con métodos encadenados, y un método `build(): T` que devuelva el resultado.

```ts
interface User { id: number; name: string; active: boolean }
const user = new Builder<User>()
  .set("id", 1)
  .set("name", "Lucía")
  .set("active", true)
  .build();
```

---

## ✅ **Conclusión**

Si completas estos ejercicios en orden y verificas los tipos inferidos por TypeScript, alcanzarás un dominio sólido del sistema de *generics*, comprendiendo desde su sintaxis básica hasta su aplicación en arquitecturas profesionales.

