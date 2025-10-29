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
console.log(Sesion.totalSesiones)
Sesion.reiniciarContador()
console.log(Sesion.totalSesiones)

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