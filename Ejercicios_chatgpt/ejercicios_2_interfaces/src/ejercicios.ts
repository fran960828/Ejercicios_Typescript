////### 🧠 Ejercicio 1: Inicialización de Propiedades
//Crea una clase `Producto` que tenga las propiedades:
//- `nombre` (string, inicializada en la declaración),
//- `precio` (number, inicializada en el constructor),
//- `categoria` (string, opcional).
//
//**Tareas:**
//1. Implementa el constructor que reciba los parámetros adecuados.  
//2. Instancia varios productos con y sin categoría.  
//3. Muestra sus valores en consola.

class Producto{
    constructor(public nombre:string,public precio:number,public categoria?:string){}
}
let producto1=new Producto('leche',6,'lacteos')
let producto2=new Producto('huevos',2.3)
//console.log(producto1)
//console.log(producto2)

//### 🧠 Ejercicio 2: Inicialización estricta y Non-Null Assertion
//Crea una clase `Cliente` con propiedades:
//- `nombre: string`,
//- `email!: string`,
//- `telefono?: string`.
//
//**Tareas:**
//1. Inicializa `nombre` en el constructor.  
//2. Usa el operador `!` para `email` e inicialízalo dentro de un método `registrarCorreo(correo: string)`.  
//3. Muestra un error si se intenta imprimir el `email` antes de registrarlo.

class Cliente{
    public email!:string;
    constructor(public name:string,public telefono?:string){
    }
    registrarCorreo(correo:string){
        this.email=correo
    }
     mostrarInfo() {
        console.log(`Cliente: ${this.name}, Email: ${this.email ?? 'no registrado'}`);
    }
}
const cliente1 = new Cliente('Alfredo'); // No pasamos email (usamos "!")
cliente1.registrarCorreo('alfredo@mail.com');       // Asignamos luego
//cliente1.mostrarInfo(); // ✅ Cliente: Alfredo, Email: alfredo@mail.com

const cliente2 = new Cliente('María','555-123');
//cliente2.mostrarInfo(); 

//### 🧠 Ejercicio 3: Public / Private / Protected
//Crea una clase `CuentaBancaria` con:
//- `private saldo: number`,
//- `public titular: string`,
//- un método `depositar(monto: number)`,
//- un método `retirar(monto: number)` que no permita dejar el saldo negativo,
//- un método `consultarSaldo()`.
//
//**Tareas:**
//1. Crea una subclase `CuentaEmpresarial` que añada una propiedad `protected limiteCredito`.  
//2. Permite retirar más del saldo hasta ese límite.  
//3. Verifica el comportamiento con ejemplos.

class CuentaBancaria{
    constructor(private saldo:number,public titular: string){}

    depositar(monto:number){
        this.saldo+=monto
        console.log(this.consultarSaldo)
    }
    retirar(monto:number){
        if (monto>this.saldo){
            console.log('Saldo insuficiente')
            return
        }
        this.saldo-=monto
        console.log(this.consultarSaldo)
    }
    get consultarSaldo(){
        return this.saldo
    }
}
let cuenta1=new CuentaBancaria(2000,'Ignacio')
//cuenta1.depositar(400)
//cuenta1.retirar(200)
//cuenta1.retirar(5000)
//console.log(cuenta1.consultarSaldo)

//### 🧠 Ejercicio 4: Uso de `readonly`
//Crea una clase `Inventario` con:
//- una propiedad `readonly productos: string[] = []`.
//
//**Tareas:**
//1. Agrega métodos `agregarProducto(nombre: string)` y `listarProductos()`.  
//2. Comprueba que no puedes reasignar `productos`, pero sí hacer `push`.
class Inventario{
    constructor(readonly productos:string[]=[]){}

    agregarProducto(nombre:string):void{
        if (nombre){
            this.productos.push(nombre)
        }
    }
    listarProductos():void{
        this.productos.forEach((prod:string)=>console.log(prod))
    }
}

let inventario1=new Inventario();
inventario1.agregarProducto('Pan')
inventario1.agregarProducto('leche')
inventario1.agregarProducto('Huevos')
//inventario1.listarProductos()

//### 🧠 Ejercicio 5: Validación con Getters/Setters
//Crea una clase `Persona` con:
//- propiedad privada `_edad: number`,
//- getter y setter para `edad`,
//- validación: no se permite asignar edades menores de 0 ni mayores de 120.
//
//**Tareas:**
//1. Intenta asignar varios valores para probar las validaciones.  
//2. Añade un getter `categoria` que devuelva `"niño"`, `"adulto"`, o `"anciano"` según la edad.
class Persona{
    constructor(private _edad:number){
        if (this._edad>120 || this._edad<0){
            throw new Error('Edad no admitida')
        }
    }

    get edad():number{
        return this._edad
    }
    set edad(age:number){
        if (age<0 || age>120){
            console.log('Edad no admitida')
            return
        }
        this._edad=age
    }
    get categoria(){
        if (this._edad<18){
            return 'niño'
        }else if(this._edad>64){
            return 'anciano'
        }else{
            return 'adulto'
        }
    }
    
}
//let persona1=new Persona(29)
//console.log(persona1.edad)
//console.log(persona1.categoria)
//persona1.edad=-2
//persona1.edad=134
//persona1.edad=12
//console.log(persona1.edad)
//console.log(persona1.categoria)

//### 🧠 Ejercicio 6: Contador Global con `static`
//Crea una clase `Sesion` que:
//- tenga un identificador único autoincremental,
//- use una propiedad estática `totalSesiones` para contar las instancias creadas.
//
//**Tareas:**
//1. Crea varias sesiones y muestra el total creado.  
//2. Agrega un método estático `reiniciarContador()` que restablezca el conteo.
class Sesion{
    static totalSesiones=0
    constructor(){
        Sesion.totalSesiones+=1
    }
    static reiniciarContador(){
        Sesion.totalSesiones=0
    }
}

let sesion1=new Sesion()
let sesion2=new Sesion()
let sesion3=new Sesion()
//console.log(Sesion.totalSesiones)
//Sesion.reiniciarContador()
//console.log(Sesion.totalSesiones)

//### 🧠 Ejercicio 7: Herencia Simple
//Crea una clase base `Vehiculo` con:
//- propiedad `protected marca: string`,
//- método `mover()` que devuelva `"El vehículo se mueve"`.
//
//Crea una subclase `Coche` con:
//- propiedad `modelo: string`,
//- método `mover()` sobrescrito que devuelva `"El coche [marca modelo] está en movimiento"`.
//
//**Tareas:**
//1. Usa `super()` en el constructor de la subclase.  
//2. Llama al método sobrescrito y observa la diferencia con el de la clase padre.

class Vehiculo{
    constructor(protected marca:string){}

    mover(){
        console.log('El vehiculo se mueve')
    }
}
class Coche extends Vehiculo{
    constructor(protected marca:string,protected modelo:string){
        super(marca)
    }
    mover(): void {
        console.log(`el vehiculo ${this.marca} de modelo ${this.modelo} se esta moviendo`)
    }
}

//let vehiculo1=new Vehiculo('Toyota')
//vehiculo1.mover()
//let coche1=new Coche('Toyota','Auris')
//coche1.mover()

//### 🧠 Ejercicio 8: Herencia Múltiple de Comportamiento
//Crea:
//- Clase base `Empleado` con `nombre`, `salario`, y método `detalles()`.
//- Subclase `Gerente` que agregue `departamento` y sobrescriba `detalles()`.
//- Usa `protected` para que el salario sea accesible desde la subclase.
//
//**Tareas:**
//1. Crea varios empleados y gerentes.  
//2. Genera un método `aumentarSalario(porcentaje: number)` reutilizable en ambas clases.

class Empleado{
    constructor(protected nombre:string,protected salario:number){}

    detalles(){
        console.log(`${this.nombre} tiene un salario de ${this.salario} €`)
    }
    aumentarSalario(porcentaje:number){
        return this.salario*=(1+(porcentaje/100))
    }
}
class Gerente extends Empleado{
    constructor(public nombre:string,protected salario:number,public departamento:string){
        super(nombre,salario)
    }
     public override detalles(): void {
    super.detalles();
    console.log(`y pertenece al Departamento: ${this.departamento}`);
  }

  // Los gerentes tienen un aumento adicional del 10%
  public override aumentarSalario(porcentaje: number): number {
    const porcentajeFinal = porcentaje + 10; // bonificación del 10% adicional
    console.log(`${this.nombre} recibe un aumento adicional por ser gerente.`);
    return super.aumentarSalario(porcentajeFinal);
  }
}
let empleado1=new Empleado('augusto',2000)
let empleado2=new Empleado('cesar',2200)
let empleado3=new Empleado('aurelio',1500)
let gerente1=new Gerente('Fran',4000,'IT')

//empleado1.detalles()
//empleado2.detalles()
//empleado3.detalles()
//gerente1.detalles()
//
//empleado1.aumentarSalario(10)
//empleado2.aumentarSalario(15)
//empleado3.aumentarSalario(5)
//gerente1.aumentarSalario(15)
//
//empleado1.detalles()
//empleado2.detalles()
//empleado3.detalles()
//gerente1.detalles()

//Crea una clase abstracta `FiguraGeometrica` con:
//- propiedad `color: string`,
//- método abstracto `area(): number`,
//- método común `descripcion(): string`.
//
//**Tareas:**
//1. Implementa las subclases `Cuadrado` y `Triangulo`.  
//2. Calcula y muestra sus áreas.

abstract class FiguraGeometrica{
    constructor(public color:string){}

    descripcion(){
        return `figura de color ${this.color}`
    }

    abstract area():number;
}
class Cuadrado extends FiguraGeometrica{
    constructor(public color:string,public lado:number){
        super(color)
    }

    public override descripcion(): string {
        return `cuadrado de color ${this.color}`
    }
    public override area(): number {
        return this.lado*this.lado;
    }
}
class triangulo extends FiguraGeometrica{
    constructor(public color:string,public base:number,public altura:number){
        super(color)
    }

    public override descripcion(): string {
        return `triangulo de color ${this.color}`
    }
    public override area(): number {
        return this.base*this.altura/2;
    }
}

let cuadrado1=new Cuadrado('azul',7)
let triangulo1=new triangulo('verde',10,8)
//console.log(cuadrado1.descripcion())
//console.log(cuadrado1.area())
//console.log(triangulo1.descripcion())
//console.log(triangulo1.area())

//### 🧠 Ejercicio 10: Interface como Contrato de Objeto
//Crea una interfaz `IProducto` con `nombre`, `precio`, y método `calcularDescuento(porcentaje: number)`.
//
//**Tareas:**
//1. Declara un objeto literal que implemente la interfaz.  
//2. Calcula el descuento y muestra el precio final.

interface Iproducto {
    nombre:string,
    precio:number,
    calcularDescuento(porcentaje:number):number
}
let producto:Iproducto={
    nombre:'ordenador',
    precio:1600,
    calcularDescuento(porcentaje) {
        return producto.precio*(1-(porcentaje/100))
    }
}
//console.log(producto.calcularDescuento(10))

//### 🧠 Ejercicio 11: Interface en Clases con `implements`
//Crea una interfaz `IVehiculo` con los métodos `encender()`, `apagar()`, y `velocidad: number`.
//
//**Tareas:**
//1. Implementa dos clases `Auto` y `Bicicleta` que cumplan el contrato.  
//2. Simula movimiento (incrementar velocidad y detenerla).
interface IvehiculoMovil {
    velocidad:number,
    aumentarVelocidad():number|string,
    disminuirVelocidad():number|string,
}
interface IvehiculoMotor {
    encender():boolean,
    apagar():boolean
}

class auto implements IvehiculoMovil,IvehiculoMotor{
    constructor(public velocidad:number=0,public encendido:boolean=false){}

    encender(): boolean {
        console.log('Encender auto')
        return this.encendido=true
    }
    apagar(): boolean {
        if (this.velocidad===0){
            console.log('Apagar vehiculo')
            return this.encendido=false
        }
        console.log('Debes disminuir previamente la velocidad')
        return this.encendido=true
    }
    aumentarVelocidad(): number|string {
        if (this.encendido){
            return this.velocidad+=10
        }
        return `Debes encender el vehiculo`
    }
    disminuirVelocidad(): number | string {
        if (this.encendido && this.velocidad>=10){
            return this.velocidad-=10
        }
        return 'El coche esta parado'
    }
}
class Bicicleta implements IvehiculoMovil{
    constructor(public velocidad:number=0){}
    aumentarVelocidad(): number|string {
        if (this.velocidad<50){
            return this.velocidad+=10
        }
        return `Las piernas no me dan`
    }
    disminuirVelocidad(): number | string {
        if (this.velocidad>=10){
            return this.velocidad-=10
        }
        return 'Ya estas parado'
    }

}
let auto1=new auto();
let bicicleta=new Bicicleta();
auto1.encender()
auto1.aumentarVelocidad()
auto1.aumentarVelocidad()
auto1.disminuirVelocidad()
auto1.disminuirVelocidad()
auto1.apagar()
console.log(auto1.velocidad)
console.log(auto1.aumentarVelocidad())


// ### 🧠 Ejercicio 12: Herencia entre Interfaces
// Crea:
// - `interface PersonaBase { nombre: string }`
// - `interface Empleado extends PersonaBase { puesto: string, salario: number }`

// **Tareas:**
// 1. Crea un objeto que cumpla con `Empleado`.
// 2. Agrega un método `promocionar()` que modifique el puesto y salario.

interface PersonaBase {
  nombre: string;
}
interface Employee extends PersonaBase {
  puesto: string;
  salary: number;
  promocionar(nuevoPuesto: string, nuevoSalario: number): void;
}

let employee1: Employee = {
  nombre: "Francisco",
  puesto: "ingeniero técnico agrícola",
  salary: 2000,
  promocionar(nuevoPuesto, nuevoSalario) {
    employee1.puesto = nuevoPuesto;
    employee1.salary = nuevoSalario;
  },
};

console.log(
  `el empleado ${employee1.nombre} es ${employee1.puesto} con un salario de ${employee1.salary}`
);
employee1.promocionar("enologo", 2500);
console.log(
  `el empleado ${employee1.nombre} es ${employee1.puesto} con un salario de ${employee1.salary}`
);

// ### 🧠 Ejercicio 13: Comparativa Práctica entre `type` e `interface`
// 1. Declara un `type` llamado `Direccion` con propiedades `calle`, `ciudad`, `pais`.  
// 2. Declara una `interface` llamada `DireccionExtendida` que extienda `Direccion` y agregue `codigoPostal`.  
// 3. Crea un objeto que cumpla con `DireccionExtendida`.  
// 4. Intenta declarar el mismo `type` dos veces (para mostrar el error) y la misma `interface` dos veces (para mostrar el *merge* permitido).

type address ={
    street:string,
    city:string,
    country:string
}
interface Address {
    street:string,
    city:string,
    country:string
}
interface Address {
    Postalcode:string
}
let personalAddress:Address={
    street:'calle los pasos',
    city:'Albacete',
    country:'España',
    Postalcode: '02652'
}

// ## 🧠 Nivel 9 — Proyecto de Integración (Uso Profesional)

// ### 🏗️ Ejercicio 14: Sistema de Gestión de Biblioteca
// Combina todos los conceptos.

// **Requisitos:**
// 1. Crea una `interface IMaterial` con propiedades comunes: `id`, `titulo`, `disponible`, `mostrarInfo()`.  
// 2. Implementa una clase abstracta `MaterialBase` que implemente `IMaterial`:  
//    - use `readonly id`,  
//    - tenga un método `prestar()` y `devolver()`,  
//    - maneje un contador estático global de materiales.  
// 3. Crea subclases:  
//    - `Libro` (con autor, páginas)  
//    - `Revista` (con número, editor)  
// 4. Usa `protected` y `private` para encapsular comportamiento interno.  
// 5. Crea una clase `Biblioteca` con:  
//    - un array `readonly materiales: MaterialBase[]`,  
//    - métodos `agregarMaterial()`, `listarMateriales()`, `buscarPorTitulo()`.

// **Bonus:**
// - Implementa un `getter totalDisponibles` en `Biblioteca` que cuente cuántos materiales están disponibles.  
// - Usa `implements` y `extends` en el diseño.  
// - Añade validaciones con setters.
interface IMaterial {
    readonly id:Number,
    titulo:string,
    disponible:boolean,
    stock:number;
    mostrarinfo():void
}
abstract class MaterialBase implements IMaterial {
    

    constructor(public readonly id: number, public titulo: string, public disponible: boolean,public stock:number) {
    }

    mostrarinfo(): void {
        console.log(`ID: ${this.id}, Título: ${this.titulo}, Disponible: ${this.disponible}`);
    }

    prestar():void{
        if (this.stock!==0){
            this.stock-=1
        }else{
            this.disponible=false
        }
    }
    devolver():void{
        this.stock+=1
        this.disponible=true
    }
}

class Revistas extends MaterialBase {
    static instancias=0

    constructor(public readonly id:number,public titulo:string,public disponible:boolean,
        public stock:number,public editor:string,public numero:string){
        super(id,titulo,disponible,stock)
        Revistas.instancias+=1
    }

    public override mostrarinfo(): void {
        console.log(`ID: ${this.id}, Título: ${this.titulo}, Disponible: ${this.disponible}, 
            stock: ${this.stock}, editor: ${this.editor}, numeros: ${this.numero}`);
    }

    public override prestar(): void {
        if (this.stock!==0){
            this.stock-=1
        }else{
            this.disponible=false
        }
    }

    public override devolver(): void {
        this.stock+=1
        this.disponible=true
    }
}

class Libro extends MaterialBase {
    static instancias=0

    constructor(public readonly id:number,public titulo:string,public disponible:boolean,
        public stock:number,public autor:string,public paginas:string){
        super(id,titulo,disponible,stock)
        Libro.instancias+=1
    }

    public override mostrarinfo(): void {
        console.log(`ID: ${this.id}, Título: ${this.titulo}, Disponible: ${this.disponible}, 
            stock: ${this.stock}, autor: ${this.autor}, paginas: ${this.paginas}`);
    }

    public override prestar(): void {
        if (this.stock!==0){
            this.stock-=1
        }else{
            this.disponible=false
        }
    }

    public override devolver(): void {
        this.stock+=1
        this.disponible=true
    }
}

class Biblioteca {
    constructor(public almacen: IMaterial[] = []) {}

    agregarMaterial(elemento: IMaterial): void {
        if (this.almacen.some(mat => mat.id === elemento.id)) {
            console.log(`⚠️ El material con ID ${elemento.id} ya existe.`);
            return;
        }
        this.almacen.push(elemento);
        console.log(`✅ Material "${elemento.titulo}" agregado correctamente.`);
    }

    listarMaterial(): void {
        console.log("\n📚 MATERIALES EN BIBLIOTECA:");
        this.almacen.forEach(mat => mat.mostrarinfo());
    }

    filtrarPorTitulo(titulo: string): void {
        const resultados = this.almacen.filter(mat => mat.titulo.toLowerCase() === titulo.toLowerCase());
        if (resultados.length === 0) {
            console.log(`❌ No se encontró ningún material con el título "${titulo}".`);
            return;
        }
        resultados.forEach(mat => mat.mostrarinfo());
    }

    // 🔹 Nuevo método: préstamo por título
    prestamo(titulo: string): void {
        const materiales = this.almacen.filter(mat => mat.titulo.toLowerCase() === titulo.toLowerCase());
        if (materiales.length === 0) {
            console.log(`❌ No se encontró ningún material con el título "${titulo}".`);
            return;
        }

        materiales.forEach(material => {
            if (!material.disponible || material.stock === 0) {
                console.log(`⚠️ El material "${material.titulo}" no está disponible actualmente.`);
            } else {
                material.prestar();
                console.log(`🤝 Se ha prestado "${material.titulo}".`);
            }
        });
    }

    // 🔹 Nuevo método: devolución por título
    devolucion(titulo: string): void {
        const materiales = this.almacen.filter(mat => mat.titulo.toLowerCase() === titulo.toLowerCase());
        if (materiales.length === 0) {
            console.log(`❌ No se encontró ningún material con el título "${titulo}".`);
            return;
        }

        materiales.forEach(material => {
            material.devolver();
            console.log(`🔁 Se ha devuelto "${material.titulo}".`);
        });
    }
}


// ==============================
// 🔹 BLOQUE DE PRUEBAS 🔹
// ==============================

// ==============================
// 🔹 BLOQUE DE PRUEBAS ACTUALIZADO 🔹
// ==============================

// Crear instancia de la biblioteca
const biblioteca = new Biblioteca();

// Crear libros
const libro1 = new Libro(1, "El Quijote", true, 3, "Cervantes", "863");
const libro2 = new Libro(2, "Cien años de soledad", true, 2, "García Márquez", "471");
const libro3 = new Libro(3, "El Hobbit", true, 1, "J.R.R. Tolkien", "320");

// Crear revistas
const revista1 = new Revistas(4, "National Geographic", true, 5, "NG Society", "202");
const revista2 = new Revistas(5, "Muy Interesante", true, 4, "Zeta", "101");

// Agregar materiales a la biblioteca
console.log("\n=== 🏛️ AGREGANDO MATERIALES A LA BIBLIOTECA ===");
biblioteca.agregarMaterial(libro1);
biblioteca.agregarMaterial(libro2);
biblioteca.agregarMaterial(libro3);
biblioteca.agregarMaterial(revista1);
biblioteca.agregarMaterial(revista2);

// Intentar agregar un duplicado
biblioteca.agregarMaterial(libro1);

// Listar materiales actuales
console.log("\n=== 📚 LISTADO INICIAL DE MATERIALES ===");
biblioteca.listarMaterial();

// Mostrar cuántas instancias de cada clase existen
console.log("\n=== 🔢 CONTADOR DE INSTANCIAS ===");
console.log(`Libros creados: ${Libro.instancias}`);
console.log(`Revistas creadas: ${Revistas.instancias}`);

// ==============================
// 🔹 PRÉSTAMOS POR TÍTULO
// ==============================

console.log("\n=== 🤝 PRÉSTAMOS POR TÍTULO ===");

// Caso exitoso
biblioteca.prestamo("El Quijote");

// Caso exitoso múltiple (revista con stock > 1)
biblioteca.prestamo("National Geographic");

// Caso inexistente
biblioteca.prestamo("No existe");

// Agotar stock (libro3 solo tiene 1 ejemplar)
biblioteca.prestamo("El Hobbit"); // primer préstamo OK
biblioteca.prestamo("El Hobbit"); // sin stock
biblioteca.prestamo("El Hobbit"); // sin stock
biblioteca.filtrarPorTitulo("El Hobbit");

// ==============================
// 🔹 DEVOLUCIONES POR TÍTULO
// ==============================

console.log("\n=== 🔁 DEVOLUCIONES POR TÍTULO ===");

// Caso exitoso
biblioteca.devolucion("El Quijote");

// Caso exitoso
biblioteca.devolucion("National Geographic");

// Caso inexistente
biblioteca.devolucion("No existe");

// ==============================
// 🔹 FILTRAR POR TÍTULO
// ==============================

console.log("\n=== 🔍 FILTRO POR TÍTULO ===");

// Existente
biblioteca.filtrarPorTitulo("Cien años de soledad");

// Inexistente
biblioteca.filtrarPorTitulo("El Señor de los Anillos");

// ==============================
// 🔹 ESTADO FINAL DE LA BIBLIOTECA
// ==============================

console.log("\n=== 📖 ESTADO FINAL DE LA BIBLIOTECA ===");
biblioteca.listarMaterial();

// ==============================
// 🔹 MENSAJE FINAL
// ==============================

console.log("\n✅ Pruebas completadas correctamente.");
