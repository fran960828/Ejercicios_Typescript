# 🧭 Ruta de Práctica de TypeScript — De Principiante a Profesional

---

## Objetivo
Practicar todos los conceptos explicados en la documentación anterior mediante una serie progresiva de ejercicios.  
Cada ejercicio introduce nuevos temas o combina los anteriores para fortalecer la comprensión y alcanzar un nivel profesional en TypeScript.

---

## 🧩 Nivel 1 — Fundamentos y Propiedades

### 🧠 Ejercicio 1: Inicialización de Propiedades
Crea una clase `Producto` que tenga las propiedades:
- `nombre` (string, inicializada en la declaración),
- `precio` (number, inicializada en el constructor),
- `categoria` (string, opcional).

**Tareas:**
1. Implementa el constructor que reciba los parámetros adecuados.  
2. Instancia varios productos con y sin categoría.  
3. Muestra sus valores en consola.

---

### 🧠 Ejercicio 2: Inicialización estricta y Non-Null Assertion
Crea una clase `Cliente` con propiedades:
- `nombre: string`,
- `email!: string`,
- `telefono?: string`.

**Tareas:**
1. Inicializa `nombre` en el constructor.  
2. Usa el operador `!` para `email` e inicialízalo dentro de un método `registrarCorreo(correo: string)`.  
3. Muestra un error si se intenta imprimir el `email` antes de registrarlo.

---

## 🔒 Nivel 2 — Modificadores de Acceso y Readonly

### 🧠 Ejercicio 3: Public / Private / Protected
Crea una clase `CuentaBancaria` con:
- `private saldo: number`,
- `public titular: string`,
- un método `depositar(monto: number)`,
- un método `retirar(monto: number)` que no permita dejar el saldo negativo,
- un método `consultarSaldo()`.

**Tareas:**
1. Crea una subclase `CuentaEmpresarial` que añada una propiedad `protected limiteCredito`.  
2. Permite retirar más del saldo hasta ese límite.  
3. Verifica el comportamiento con ejemplos.

---

### 🧠 Ejercicio 4: Uso de `readonly`
Crea una clase `Inventario` con:
- una propiedad `readonly productos: string[] = []`.

**Tareas:**
1. Agrega métodos `agregarProducto(nombre: string)` y `listarProductos()`.  
2. Comprueba que no puedes reasignar `productos`, pero sí hacer `push`.

---

## ⚙️ Nivel 3 — Getters, Setters y Validaciones

### 🧠 Ejercicio 5: Validación con Getters/Setters
Crea una clase `Persona` con:
- propiedad privada `_edad: number`,
- getter y setter para `edad`,
- validación: no se permite asignar edades menores de 0 ni mayores de 120.

**Tareas:**
1. Intenta asignar varios valores para probar las validaciones.  
2. Añade un getter `categoria` que devuelva `"niño"`, `"adulto"`, o `"anciano"` según la edad.

---

## 🧱 Nivel 4 — Static, Métodos Utilitarios y Contadores

### 🧠 Ejercicio 6: Contador Global con `static`
Crea una clase `Sesion` que:
- tenga un identificador único autoincremental,
- use una propiedad estática `totalSesiones` para contar las instancias creadas.

**Tareas:**
1. Crea varias sesiones y muestra el total creado.  
2. Agrega un método estático `reiniciarContador()` que restablezca el conteo.

---

## 🧬 Nivel 5 — Herencia, Super, Protected

### 🧠 Ejercicio 7: Herencia Simple
Crea una clase base `Vehiculo` con:
- propiedad `protected marca: string`,
- método `mover()` que devuelva `"El vehículo se mueve"`.

Crea una subclase `Coche` con:
- propiedad `modelo: string`,
- método `mover()` sobrescrito que devuelva `"El coche [marca modelo] está en movimiento"`.

**Tareas:**
1. Usa `super()` en el constructor de la subclase.  
2. Llama al método sobrescrito y observa la diferencia con el de la clase padre.

---

### 🧠 Ejercicio 8: Herencia Múltiple de Comportamiento
Crea:
- Clase base `Empleado` con `nombre`, `salario`, y método `detalles()`.
- Subclase `Gerente` que agregue `departamento` y sobrescriba `detalles()`.
- Usa `protected` para que el salario sea accesible desde la subclase.

**Tareas:**
1. Crea varios empleados y gerentes.  
2. Genera un método `aumentarSalario(porcentaje: number)` reutilizable en ambas clases.

---

## 🧩 Nivel 6 — Abstract Classes y Contratos

### 🧠 Ejercicio 9: Clase Abstracta
Crea una clase abstracta `FiguraGeometrica` con:
- propiedad `color: string`,
- método abstracto `area(): number`,
- método común `descripcion(): string`.

**Tareas:**
1. Implementa las subclases `Cuadrado` y `Triangulo`.  
2. Calcula y muestra sus áreas.

---

## 📐 Nivel 7 — Interfaces

### 🧠 Ejercicio 10: Interface como Contrato de Objeto
Crea una interfaz `IProducto` con `nombre`, `precio`, y método `calcularDescuento(porcentaje: number)`.

**Tareas:**
1. Declara un objeto literal que implemente la interfaz.  
2. Calcula el descuento y muestra el precio final.

---

### 🧠 Ejercicio 11: Interface en Clases con `implements`
Crea una interfaz `IVehiculo` con los métodos `encender()`, `apagar()`, y `velocidad: number`.

**Tareas:**
1. Implementa dos clases `Auto` y `Bicicleta` que cumplan el contrato.  
2. Simula movimiento (incrementar velocidad y detenerla).

---

### 🧠 Ejercicio 12: Herencia entre Interfaces
Crea:
- `interface PersonaBase { nombre: string }`
- `interface Empleado extends PersonaBase { puesto: string, salario: number }`

**Tareas:**
1. Crea un objeto que cumpla con `Empleado`.  
2. Agrega un método `promocionar()` que modifique el puesto y salario.

---

## ⚡ Nivel 8 — Type vs Interface y Casos Avanzados

### 🧠 Ejercicio 13: Comparativa Práctica entre `type` e `interface`
1. Declara un `type` llamado `Direccion` con propiedades `calle`, `ciudad`, `pais`.  
2. Declara una `interface` llamada `DireccionExtendida` que extienda `Direccion` y agregue `codigoPostal`.  
3. Crea un objeto que cumpla con `DireccionExtendida`.  
4. Intenta declarar el mismo `type` dos veces (para mostrar el error) y la misma `interface` dos veces (para mostrar el *merge* permitido).

---

## 🧠 Nivel 9 — Proyecto de Integración (Uso Profesional)

### 🏗️ Ejercicio 14: Sistema de Gestión de Biblioteca
Combina todos los conceptos.

**Requisitos:**
1. Crea una `interface IMaterial` con propiedades comunes: `id`, `titulo`, `disponible`, `mostrarInfo()`.  
2. Implementa una clase abstracta `MaterialBase` que implemente `IMaterial`:  
   - use `readonly id`,  
   - tenga un método `prestar()` y `devolver()`,  
   - maneje un contador estático global de materiales.  
3. Crea subclases:  
   - `Libro` (con autor, páginas)  
   - `Revista` (con número, editor)  
4. Usa `protected` y `private` para encapsular comportamiento interno.  
5. Crea una clase `Biblioteca` con:  
   - un array `readonly materiales: MaterialBase[]`,  
   - métodos `agregarMaterial()`, `listarMateriales()`, `buscarPorTitulo()`.

**Bonus:**
- Implementa un `getter totalDisponibles` en `Biblioteca` que cuente cuántos materiales están disponibles.  
- Usa `implements` y `extends` en el diseño.  
- Añade validaciones con setters.

---

## 🎯 Objetivo Final
Tras completar todos los ejercicios:
- Dominarás los modificadores `public`, `private`, `protected`, `readonly`.  
- Sabrás cuándo usar `type`, `interface` y `abstract class`.  
- Comprenderás `get`, `set`, `static`, `extends`, `implements` y `super`.  
- Serás capaz de diseñar modelos orientados a objetos sólidos y escalables en TypeScript.

---
