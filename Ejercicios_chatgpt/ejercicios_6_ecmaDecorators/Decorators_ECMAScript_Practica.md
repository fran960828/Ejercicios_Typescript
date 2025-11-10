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


