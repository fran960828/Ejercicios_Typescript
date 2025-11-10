# 🧩 Serie de ejercicios — Decorators ECMAScript modernos en TypeScript (sin experimentalDecorators)

> **Objetivo general:**  
> Dominar el uso profesional de los **decoradores ECMAScript estandarizados** en TypeScript moderno (sin el modo `experimentalDecorators`), comprendiendo su uso con `(value, context)`, `addInitializer`, y la creación de fábricas.

---

## 🧠 Nivel 1 — Fundamentos: comprensión del contexto y la firma

### **Ejercicio 1.1 — Explorando el `context`**
Crea un decorador `@InspectContext` que imprima en consola la información de `context` (propiedades `kind`, `name`, `static`, `private`) al aplicarse sobre una clase, método y campo.

**Objetivo:**  
Entender qué datos contiene `context` en cada tipo de uso.

**Pistas:**
- `context.kind` puede ser `"class"`, `"method"`, `"field"`, etc.
- Usa este decorador sobre distintos elementos para comparar.

```ts
// ✍️ Implementa aquí tu decorador InspectContext y prueba su uso
```

---

### **Ejercicio 1.2 — Decorador de clase informativo**
Crea un decorador `@TagInfo` que agregue una propiedad estática `tag = "decorated"` a cualquier clase.

**Objetivo:**  
Modificar una clase sin reemplazarla, solo añadiendo metadatos.

**Bonus:** imprime un mensaje en consola al momento de aplicar el decorador indicando el nombre de la clase.

```ts
// ✍️ Implementa aquí tu decorador TagInfo
```

---

## ⚙️ Nivel 2 — Decoradores funcionales (comportamiento básico)

### **Ejercicio 2.1 — Decorador de método para medir tiempo de ejecución**
Crea `@MeasureTime` que:
- Mida el tiempo que tarda un método en ejecutarse.
- Imprima el tiempo en milisegundos junto al nombre del método.

**Objetivo:**  
Aprender a envolver una función (`value`) y devolver otra función con lógica adicional.

```ts
// ✍️ Implementa MeasureTime y aplícalo sobre un método que realice operaciones pesadas
```

---

### **Ejercicio 2.2 — Decorador de campo con valor por defecto**
Crea `@Default(defaultValue)` que establezca un valor por defecto si el inicializador del campo devuelve `undefined`.

**Objetivo:**  
Aprender a devolver una función *initializer* en decoradores de campo.

```ts
// ✍️ Implementa Default y pruébalo en una clase con varios campos opcionales
```

---

### **Ejercicio 2.3 — Decorador de método con restricción**
Implementa `@ReadonlyMethod` que haga que el método no pueda ser reasignado posteriormente.

**Objetivo:**  
Aplicar `Object.defineProperty` dentro del decorador para proteger la referencia del método.

```ts
// ✍️ Implementa ReadonlyMethod
```

---

## 🧩 Nivel 3 — Decoradores que interactúan con inicialización

### **Ejercicio 3.1 — Uso de `context.addInitializer`**
Crea `@RegisterInstance` que:
- Registre cada instancia creada en una lista estática `instances` dentro de la clase.
- Usa `context.addInitializer` para ejecutar el código de registro cuando se construye la instancia.

**Objetivo:**  
Practicar el uso de `context.addInitializer` para ejecutar lógica durante la inicialización del objeto.

```ts
// ✍️ Implementa RegisterInstance
```

---

### **Ejercicio 3.2 — Decorador de campo que valida tipo**
Crea `@TypeCheck(expectedType)` que:
- Guarde el valor original del campo.
- Use `addInitializer` para verificar, al instanciar la clase, que el tipo del campo coincide con `expectedType`.
- Lance un error si no coincide.

**Objetivo:**  
Usar el `context` para inspeccionar y validar datos de instancia de forma automática.

```ts
// ✍️ Implementa TypeCheck
```

---

### **Ejercicio 3.3 — Decorador de método con memoización**
Crea `@Memoize` que:
- Guarde los resultados de la función en un `Map` basado en los argumentos.
- Devuelva el resultado cacheado si el método se llama con los mismos argumentos.

**Objetivo:**  
Usar cierre (*closure*) dentro del decorador para mantener estado entre llamadas.

```ts
// ✍️ Implementa Memoize
```

---

## 🚀 Nivel 4 — Fábricas de decoradores y configuración avanzada

### **Ejercicio 4.1 — Fábrica de decoradores parametrizada**
Crea `@LogPrefix(prefix: string)` que:
- Agregue el `prefix` a todos los mensajes de `console.log` dentro del método decorado.

**Objetivo:**  
Aprender a crear fábricas (`function outer(...) { return function inner(...) {...} }`) para pasar parámetros.

```ts
// ✍️ Implementa LogPrefix
```

---

### **Ejercicio 4.2 — Decorador de clase con configuración**
Crea `@Configurable(options)` que:
- Reciba un objeto `options` (por ejemplo `{ version: '1.0.0', author: 'Ana' }`).
- Agregue esas propiedades a la clase como estáticas.

**Objetivo:**  
Aprender a modificar y extender una clase desde un decorador configurable.

```ts
// ✍️ Implementa Configurable
```

---

### **Ejercicio 4.3 — Decorador de campo dinámico**
Crea `@EnvVar(varName)` que:
- Reemplace el valor inicial del campo por el valor de `process.env[varName]` (si existe).
- Si no existe la variable de entorno, mantenga el valor original.

**Objetivo:**  
Conectar datos del entorno con inicialización de propiedades.

```ts
// ✍️ Implementa EnvVar
```

---

## 🧱 Nivel 5 — Decoradores compuestos y metaprogramación

### **Ejercicio 5.1 — Composición de decoradores**
Crea dos decoradores:
- `@UpperCaseMethod`: convierte el resultado de un método en mayúsculas.  
- `@TrimResult`: elimina espacios del inicio y fin del resultado.

Aplica ambos sobre el mismo método y analiza el orden de ejecución.

**Objetivo:**  
Comprender cómo se combinan decoradores en cadena y cómo el orden afecta el resultado.

```ts
// ✍️ Implementa UpperCaseMethod y TrimResult
```

---

### **Ejercicio 5.2 — Decorador híbrido con `addInitializer` y retorno**
Crea `@AutoID` que:
- Asigne automáticamente un campo `id` incremental a cada instancia creada.
- Lleve un contador estático dentro de la clase.
- Use `context.addInitializer` para asignar el `id` a la instancia.

**Objetivo:**  
Combinar inicialización dinámica con estado compartido entre instancias.

```ts
// ✍️ Implementa AutoID
```

---

### **Ejercicio 5.3 — Decorador de clase que audita métodos**
Crea `@Audit` que:
- Intercepte todos los métodos públicos de la clase.
- Envuélvelos para registrar cada llamada (nombre del método y argumentos).
- No modifiques manualmente cada método: hazlo recorriendo las propiedades del prototipo dentro del decorador.

**Objetivo:**  
Usar metaprogramación para modificar múltiples elementos desde un decorador de clase.

```ts
// ✍️ Implementa Audit
```

---

## 🧭 Nivel 6 — Uso profesional y patrones de arquitectura

### **Ejercicio 6.1 — Decorador de clase “Service”**
Crea `@Service(name: string)` que:
- Registre automáticamente la clase en un `ServiceRegistry`.
- Permita luego recuperar la clase por su nombre (`ServiceRegistry.get('UserService')`).

**Objetivo:**  
Usar decoradores de clase como base para un patrón de *Dependency Injection* o *Service Locator*.

```ts
// ✍️ Implementa Service y ServiceRegistry
```

---

### **Ejercicio 6.2 — Decorador de método para control de acceso**
Crea `@RequireRole(role: string)` que:
- Antes de ejecutar el método, verifique si `this.currentUserRole === role`.
- Si no, lanza un error de permiso denegado.

**Objetivo:**  
Aplicar lógica contextual basada en el estado del objeto (autorización).

```ts
// ✍️ Implementa RequireRole
```

---

### **Ejercicio 6.3 — Decorador de clase para validación de modelo**
Crea `@ValidateModel(schema)` donde:
- `schema` es un objeto que define tipos esperados de campos (`{ name: "string", age: "number" }`).
- Usa `context.addInitializer` para validar los campos de instancia durante la construcción.

**Objetivo:**  
Simular validaciones automáticas tipo ORM (similar a `class-validator` o `zod`).

```ts
// ✍️ Implementa ValidateModel
```

---

## 🧩 Nivel 7 — Proyecto integrador profesional

### **Ejercicio 7.1 — Mini-framework con decorators**
Diseña un mini sistema que use varios tipos de decorators:
- `@Controller(path: string)` para marcar clases como controladores.
- `@Route(method: "GET" | "POST", path: string)` para métodos.
- `@InjectService(ServiceClass)` para campos que deban recibir una instancia automática.

**Objetivo:**  
Combinar decoradores de clase, método y campo para construir un patrón estructurado tipo *framework web* (como NestJS, pero con ES decorators puros).

**Extras opcionales:**
- Usa `context.addInitializer` para inicializar dependencias.
- Registra rutas y servicios automáticamente.

```ts
// ✍️ Implementa Controller, Route e InjectService
```

---

# ✅ Conclusión

Esta secuencia te llevará de:
1. **Comprender la base (`value`, `context`)**,  
2. **Controlar comportamiento y estado de clases y métodos**,  
3. **Aplicar patrones profesionales de metaprogramación y DI.**

Con estos ejercicios:
- Dominarás la sintaxis ECMAScript oficial de decorators.
- Sabrás cuándo y cómo usar `addInitializer`.
- Aprenderás a crear decoradores reutilizables y configurables.
- Estarás preparado para escribir código de calidad profesional en TypeScript moderno.
