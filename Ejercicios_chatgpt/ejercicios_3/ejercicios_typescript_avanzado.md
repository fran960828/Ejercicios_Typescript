# 🧠 Serie de Ejercicios Avanzados de TypeScript

Esta guía de ejercicios está diseñada para practicar y dominar conceptos avanzados de TypeScript,
progresando desde lo básico hasta un nivel profesional.  
Cada conjunto incluye objetivos de aprendizaje y retos con dificultad creciente.

---

## 1️⃣ Intersection Types y comparación con Interfaces (`extends`)

**Objetivo:** comprender cómo combinar estructuras de tipos para crear modelos complejos y consistentes.

### Ejercicios

1. **Combina propiedades de usuario y permisos:**
   ```ts
   // Crea dos tipos: UserBase y Permissions.
   // Combínalos en un nuevo tipo UserWithPermissions usando una intersección (&).
   // Crea una función que reciba un objeto de tipo UserWithPermissions y muestre su nombre y sus permisos.
   ```

2. **Versión con interfaces y extends:**
   ```ts
   // Repite el ejercicio anterior, pero usando interfaces y extends.
   // Compara cómo TypeScript infiere los tipos y analiza cuál es más legible.
   ```

3. **Intersección conflictiva:**
   ```ts
   // Crea dos tipos que tengan una propiedad 'status' de distinto tipo (string vs number).
   // Declara una intersección de ambos e intenta asignarle un valor.
   // Explica por qué TypeScript marca un error y cómo evitarlo.
   ```

---

## 2️⃣ Union Types y protectores de tipo (`type guards`)

**Objetivo:** dominar el uso de uniones y aprender a escribir lógica segura basada en protecciones de tipo.

### Ejercicios

4. **Unión de respuesta API:**
   ```ts
   // Define dos tipos: ApiSuccess y ApiError con propiedades distintas.
   // Crea una función handleApiResponse que acepte un parámetro tipo ApiSuccess | ApiError.
   // Usa "in" o "typeof" para diferenciar los casos.
   ```

5. **Unión de tipos primitivos:**
   ```ts
   // Crea una función printValue(value: string | number | boolean)
   // que imprima distinto texto según el tipo (usa typeof).
   ```

6. **Type Guard personalizado:**
   ```ts
   // Define un tipo Admin con propiedad 'role: "admin"' y otro tipo Guest con 'role: "guest"'.
   // Escribe una función isAdmin(user): user is Admin.
   // Úsala en un array de usuarios mixtos para filtrar solo los admins.
   ```

---

## 3️⃣ Discriminated Unions

**Objetivo:** crear jerarquías de tipos robustas y seguras usando una propiedad discriminante.

### Ejercicios

7. **Figuras geométricas:**
   ```ts
   // Crea un tipo Shape con variantes:
   //   - { kind: "triangle"; base: number; height: number }
   //   - { kind: "circle"; radius: number }
   //   - { kind: "square"; side: number }
   // Implementa una función area(shape: Shape): number
   // Usa un switch y asegúrate de que el caso default sea never.
   ```

8. **Eventos del sistema:**
   ```ts
   // Crea un tipo SystemEvent discriminado por 'type':
   //   - { type: "click"; x: number; y: number }
   //   - { type: "keypress"; key: string }
   //   - { type: "resize"; width: number; height: number }
   // Implementa handleEvent(event: SystemEvent) que imprima un mensaje distinto según el tipo.
   ```

---

## 4️⃣ Uso de `instanceof` en Union Types

**Objetivo:** diferenciar clases y sus instancias en runtime.

### Ejercicios

9. **Vehículos:**
   ```ts
   // Crea clases Car y Bike con métodos drive() y pedal().
   // Define un tipo Vehicle = Car | Bike.
   // Implementa una función useVehicle(v: Vehicle) que llame al método correcto usando instanceof.
   ```

10. **Errores personalizados:**
   ```ts
   // Crea clases NotFoundError y ValidationError extendiendo Error.
   // Crea una función handleError(err: Error | NotFoundError | ValidationError)
   // que actúe distinto según la clase usando instanceof.
   ```

---

## 5️⃣ Outsourced Type Guards y Type Predicates

**Objetivo:** separar la validación runtime de la lógica de negocio usando funciones que retornan `x is Type`.

### Ejercicios

11. **Validador de producto:**
   ```ts
   // Crea un tipo Product con propiedades id, name, price.
   // Implementa una función isProduct(value: unknown): value is Product.
   // Dentro, valida tipos y devuelve true/false.
   // Usa la función en una lista de valores heterogéneos para filtrar solo los productos válidos.
   ```

12. **Analizador con retorno extendido:**
   ```ts
   // Crea una función analyzeOrder(obj: unknown)
   // que devuelva { ok: boolean; order?: { id: number; items: string[] }; reason?: string }.
   // Luego crea un type guard isOrder(value: unknown): value is { id: number; items: string[] }.
   // Combina ambos en un flujo de validación completo.
   ```

---

## 6️⃣ Overload Functions

**Objetivo:** dominar el uso de sobrecargas para funciones que aceptan distintos parámetros.

### Ejercicios

13. **Formato flexible:**
   ```ts
   // Crea una función formatValue que acepte:
   //   - un string → lo devuelva en mayúsculas
   //   - un número → lo devuelva con dos decimales
   //   - un Date → lo formatee con .toISOString()
   // Usa overloads para declarar las firmas.
   ```

14. **Concatenación tipada:**
   ```ts
   // Escribe una función concat que:
   //   - si recibe dos strings, devuelva string
   //   - si recibe dos arrays del mismo tipo, devuelva array concatenado
   // Usa overloads y asegúrate de que los tipos se infieran correctamente.
   ```

---

## 7️⃣ Index Types y comparación con Record

**Objetivo:** practicar el uso de `Record` y *mapped types* para crear estructuras tipadas dinámicas.

### Ejercicios

15. **Mapa de traducciones:**
   ```ts
   // Define un tipo Languages = "en" | "es" | "fr"
   // Crea un tipo TranslationRecord usando Record<Languages, string>
   // Asigna un objeto que cumpla con ese tipo y agrega una función translate(lang: Languages).
   ```

16. **Transformador genérico:**
   ```ts
   // Crea un tipo Transform<T> = { [K in keyof T]: () => T[K] }
   // Usa este tipo para transformar un objeto de configuración:
   // { port: number; env: string } → { port: () => number; env: () => string }
   // Implementa una función applyTransform<T>(t: Transform<T>): T
   ```

---

## 8️⃣ Constant Types con `as const`

**Objetivo:** trabajar con literales y tuplas inmutables para mejorar la inferencia de tipos.

### Ejercicios

17. **Lista de roles:**
   ```ts
   // Declara const roles = ["admin", "editor", "viewer"] as const.
   // Crea un tipo Role = typeof roles[number].
   // Escribe una función assignRole(user: string, role: Role) que solo acepte esos valores.
   ```

18. **Sistema de rutas:**
   ```ts
   // Crea const routes = { home: "/", about: "/about", dashboard: "/dashboard" } as const.
   // Crea un tipo Route = keyof typeof routes.
   // Escribe una función navigate(route: Route): void que imprima la ruta correspondiente.
   ```

---

## 9️⃣ Uso de `satisfies`

**Objetivo:** verificar estructuras sin perder información de tipo literal.

### Ejercicios

19. **Configuración validada:**
   ```ts
   // Crea un tipo AppConfig con { mode: "dev" | "prod"; debug: boolean }.
   // Declara const config = { mode: "dev", debug: true } satisfies AppConfig.
   // Cambia 'mode' a "development" y observa el error de verificación.
   ```

20. **Mapa de endpoints:**
   ```ts
   // Crea un tipo Endpoint = { path: string; secure: boolean }.
   // Declara const endpoints = {
   //   login: { path: "/login", secure: false },
   //   user: { path: "/user", secure: true }
   // } satisfies Record<string, Endpoint>;
   // Usa typeof endpoints para crear un tipo inferido EndpointKey.
   ```

---

## 🔟 Proyecto final: **Mini sistema tipado**

**Objetivo:** integrar todos los conceptos.

### Descripción del reto:

Crea un pequeño módulo TypeScript que modele un sistema de órdenes de compra tipado:

- Tipos base:
  - `UserBase`, `ProductBase`, `OrderBase`.
- Usa **Intersection types** para combinar datos de usuario con metadatos.
- Usa **Union types** y **discriminated unions** para representar estados del pedido (`"pending" | "paid" | "cancelled"`).
- Usa **instanceof** para distinguir entre clases `OnlineOrder` y `StoreOrder`.
- Define un **type guard** `isPaidOrder(order): order is PaidOrder`.
- Añade una **función sobrecargada** `getOrderSummary()` que acepte:
  - Un solo pedido → devuelve string.
  - Un array de pedidos → devuelve string[].
- Define un **mapa tipado** con `Record<Status, number>` para contar pedidos.
- Usa `as const` para declarar los estados válidos.
- Usa `satisfies` para verificar que tu catálogo de productos cumple la forma `Record<string, ProductBase>`.

💡 *Este ejercicio integra todos los conceptos y refleja escenarios de desarrollo profesional.*
