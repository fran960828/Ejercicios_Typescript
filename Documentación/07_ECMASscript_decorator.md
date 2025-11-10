# Documentación: Decorators ECMAScript (en TypeScript) — guía para principiantes (con ejemplos comentados)

> **Nota (comentario al inicio — petición del usuario):**
>
> ```ts
> /**
>  * Esta documentación explica, paso a paso y con ejemplos anotados,
>  * cómo usar los decorators según la especificación moderna (ECMAScript / TypeScript).
>  * Cubre:
>  *  - la firma (target / value y context — p. ej. ClassDecoratorContext),
>  *  - modificar clases enteras,
>  *  - modificar métodos,
>  *  - modificar atributos (fields / propiedades),
>  *  - y cómo crear fábricas de decorators (decorator factories).
>  *
>  * Los ejemplos están escritos en TypeScript moderno y usan la interfaz
>  * del decorador donde la función recibe `value` (la cosa decorada)
>  * y `context` (información/operaciones adicionales, p. ej. `context.name`,
>  * `context.kind`, y `context.addInitializer`).
>  */
> ```

---

## Resumen conceptual rápido

- **Qué es un decorator**: función que "anota" o transforma clases, métodos, propiedades o parámetros. En la propuesta moderna (y en las versiones recientes de TypeScript) el decorator recibe **dos cosas**: el _valor_ que se decora (p. ej. la clase constructora, o la función método, o el inicializador de un campo) y un **contexto** (`context`) con metadatos (tipo/kind, nombre, y utilidades como `addInitializer` o `metadata`).

- **Diferencia importante con los "legacy decorators"**: la nueva API pasa `value` + `context` en vez de (target, propertyKey, descriptor) tradicionales; el comportamiento y lo que puedes hacer cambian (por ejemplo: los campos se tratan individualmente, y la capacidad de cambiar atributos del descriptor es diferente). Si vienes de código Angular/Nest antiguo, existen diferencias a tener en cuenta.

- **Orden de aplicación**: los decoradores de elementos (métodos/campos) se ejecutan antes que el decorador de clase; la llamada final al decorador de clase ocurre después de aplicar los demás. Además, los inicializadores estáticos/instancia se aplican en un orden determinado por la especificación.

- **Contexto (`context`)**: contiene información útil (por ejemplo `name`, `kind`) y utilidades como `addInitializer(fn)` (permite registrar código que correrá durante la inicialización de la clase/instancia). TypeScript tipa estos contextos (ej.: `ClassMethodDecoratorContext`, `ClassDecoratorContext`, etc.).

---

## Recomendaciones de configuración (breve)

- Revisa la documentación oficial de TypeScript sobre decoradores; hay opciones de `tsconfig.json` relacionadas (p. ej. `experimentalDecorators` es el flag histórico; para la nueva API revisa la versión de TypeScript y la compatibilidad con tu bundler/transpilador). Si usas características de reflexión en tiempo de ejecución (p. ej. `reflect-metadata`), añade `emitDecoratorMetadata` y la importación necesaria. (Ver documentación oficial para detalles de versión y opciones).

---

# 1) Firma: `value` (objetivo) y `context` (ClassDecoratorContext / MethodContext)

**Idea clave**: en la API moderna los decorators reciben `(value, context)`:

- `value` depende del tipo de decoración:
  - Clase: el constructor (la "clase") — puedes devolver una nueva clase para reemplazarla o modificarla.
  - Método: la función original del método — puedes devolver una función que reemplaza la original.
  - Campo/propiedad (field): en la propuesta moderna el decorator puede observar/transformar el _inicializador_ o usar `context.addInitializer` para ajustar el valor.
- `context` (por ejemplo `ClassDecoratorContext`) incluye propiedades como `name`, `kind`, `static` (para members estáticos), `private` (si aplica), y métodos como `addInitializer`. TypeScript provee tipos para estos contextos (ej. `ClassMethodDecoratorContext`).

---

# 2) Uso: Decorator que modifica una **clase completa**

### Ejemplo: añadir logging a la creación de instancias, y añadir una propiedad estática

```ts
function WithCreationLogger(value: any, context: ClassDecoratorContext) {
  const originalCtor = value;

  const newCtor = class extends originalCtor {
    constructor(...args: any[]) {
      console.log(`[WithCreationLogger] Crear instancia de ${context.name}`, {
        args,
      });
      super(...args);
    }
  };

  (newCtor as any).__decoratorInfo = {
    addedBy: "WithCreationLogger",
    time: new Date().toISOString(),
  };

  return newCtor;
}

@WithCreationLogger
class Persona {
  constructor(public nombre: string) {}
}

const p = new Persona("María");
console.log((Persona as any).__decoratorInfo);
```

**Comentarios paso a paso**:

1. La función `WithCreationLogger` recibe el constructor original como `value` y `context` con `context.name === "Persona"`.
2. Creamos `newCtor` que extiende al constructor original y añade comportamiento (log al crear).
3. Retornamos `newCtor` — TypeScript/JS usará la clase devuelta en lugar de la original.
4. También añadimos una propiedad estática `__decoratorInfo` para demostrar modificación de la clase completa.

---

# 3) Uso: Decorator que modifica **métodos** de la clase

### Ejemplo: `@LogCalls` — envuelve un método para hacer log de argumentos y resultado

```ts
function LogCalls(value: Function, context: ClassMethodDecoratorContext) {
  return function wrappedMethod(this: any, ...args: any[]) {
    console.log(`[LogCalls] Llamando ${context.name} con:`, args);
    const result = value.apply(this, args);
    console.log(`[LogCalls] Resultado de ${context.name}:`, result);
    return result;
  };
}

class Calculadora {
  @LogCalls
  sumar(a: number, b: number) {
    return a + b;
  }
}

const c = new Calculadora();
c.sumar(2, 3);
```

---

# 4) Uso: Decorator que modifica **atributos / campos (properties / fields)**

### Ejemplo 1 — Forzar valor por defecto en un campo si se pasa `undefined`

```ts
function DefaultTo(defaultValue: any) {
  return function (initialValue: any, context: ClassFieldDecoratorContext) {
    return function fieldInitializer() {
      return initialValue === undefined ? defaultValue : initialValue;
    };
  };
}

class Config {
  @DefaultTo("es-ES")
  idioma?: string;
}

const cfg = new Config();
console.log(cfg.idioma); // -> "es-ES"
```

### Ejemplo 2 — Usando `context.addInitializer` para ejecutar código de inicialización adicional

```ts
function AddInitMessage(message: string) {
  return function (initialValue: any, context: ClassFieldDecoratorContext) {
    context.addInitializer(function () {
      (this as any).__initMessages = (this as any).__initMessages || [];
      (this as any).__initMessages.push(message);
    });
    return;
  };
}

class EjemploInit {
  @AddInitMessage("campo A inicializado")
  a = 1;
}
const e = new EjemploInit();
console.log((e as any).__initMessages); // -> ["campo A inicializado"]
```

---

# 5) Fabrica de decorators (Decorator Factories)

### Ejemplo: `@Retry(n)` — reintenta un método N veces si lanza excepción

```ts
function Retry(times: number) {
  return function (value: Function, context: ClassMethodDecoratorContext) {
    return async function wrapped(this: any, ...args: any[]) {
      let lastError: any;
      for (let i = 0; i < times; i++) {
        try {
          return await value.apply(this, args);
        } catch (err) {
          lastError = err;
          console.warn(`[Retry] intento ${i + 1} falló para ${context.name}`);
        }
      }
      throw lastError;
    };
  };
}

class ServicioRemoto {
  @Retry(3)
  async fetchData() {
    if (Math.random() < 0.8) throw new Error("Fallo aleatorio");
    return { ok: true };
  }
}
```

---

# 6) Buenas prácticas y advertencias (profesional)

- **Preferir composición sobre magia excesiva**.
- **Cuidado con el tipado**.
- **Orden de ejecución**: recordar el orden correcto.
- **Compatibilidad / Tooling**.
- **Metadata y reflection**: usa `emitDecoratorMetadata` + `reflect-metadata` si lo necesitas.

---

# 7) Recapitulación rápida — ¿qué devuelve cada decorator?

- **Class decorator** `(value, context)` — `value` es la clase (constructor). Puedes devolver una nueva clase para reemplazarla.
- **Method decorator** `(value, context)` — `value` es la función del método; si devuelves una función la reemplazas. `context` es `ClassMethodDecoratorContext`.
- **Field (property) decorator** `(initialValue, context)` — puedes devolver un _initializer_ (función) para controlar el valor final del campo.

---

## Conclusión

Los decorators modernos (ECMAScript + TypeScript) te dan una API más clara y con `context` rico para programar metaprogramación de forma segura. En esta guía has visto:

- la **firma** `value, context` y qué contiene `context`;
- cómo **modificar clases** devolviendo un constructor modificado;
- cómo **envolver métodos** devolviendo una función reemplazo;
- cómo **manipular campos** mediante _initializers_ o `addInitializer`;
- y cómo **crear fábricas** de decorators para parametrizarlos.
