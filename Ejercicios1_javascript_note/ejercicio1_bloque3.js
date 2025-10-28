"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//### 1 Número par o impar
//
//- Crear un programa que pida al usuario ingresar un número y mostrar en un mensaje si el valor ingresado es par o impar.
//- **Requisitos TS:** `let numero: number`.
let num;
num = 2;
if (num % 2 == 0) {
    console.log('par');
}
else {
    console.log('Impar');
}
//### 2 Días del mes
//
//- Crear un programa que pida por un mes y devuelva la cantidad de días que ese mes tiene.
//- **Requisitos TS:** Si el usuario ingresa el nombre del mes, la variable de control (`mes`) debe ser `string`.
let mes = 'ENERO';
let mes31 = ['enero', 'marzo', 'mayo', 'julio', 'agosto', 'octubre', 'diciembre'];
if (mes31.includes(mes.toLowerCase())) {
    console.log('Mes con 31 días');
}
else if (mes === 'Febrero') {
    console.log('Mes de 28 días');
}
else {
    console.log('Mes de 30 días');
}
//### 4 Examen aprobado
//
//- Crear un programa que pida al usuario ingresar la nota un examen y mostrar en un mensaje si el examen está aprobado, si debe recuperar o es un aplazo (mayor a 7 aprueba, mayor a 4 recupera, menor a 4 aplazo).
//- **Requisitos TS:** `let nota: number`.
let nota = 7;
if (nota > 7) {
    console.log('aprobado');
}
else if (nota < 4) {
    console.log('aplazo');
}
else {
    console.log('recuperación');
}
//### 11 Calculadora
//
//- Crear un programa que permita elegir entre las operaciones: SUMA, RESTA, DIVISION y MULTIPLICACION, y luego de elegida, ingresar dos números y hacer dicha operación con ella.
//- **Requisitos TS:** Utilizar `switch`. La variable para la operación puede ser `operacion: string`. Las entradas para los cálculos deben ser `num1: number` y `num2: number`.
let num1 = 7;
let num2 = 0;
let operacion = 'division';
switch (operacion) {
    case 'suma':
        console.log(num1 + num2);
        break;
    case 'resta':
        console.log(num1 - num2);
        break;
    case 'multiplicacion':
        console.log(num1 * num2);
        break;
    case 'division':
        try {
            console.log(num1 / num2);
        }
        catch (error) {
            console.log('error');
        }
        break;
    default:
        break;
}
//
//### 12 Televisor
//
//- Hacer un programa que empiece preguntando si se desea prender el televisor. Si elige que sí, 
// debe mostrar el canal y el volumen actual, y permitir realizar operaciones (CAMBIAR CANAL, SUBIR VOLUMEN, MUTEAR, etc.).
//- **Requisitos TS:** Declarar el estado inicial como `let canalActual: number` y
//  `let volumenActual: number`. El _input_ del comando será `comando: string` (para usar en el `switch`).
let comando = 'mutear';
let encendido = false;
let canal = 12;
let volumenActual = 24;
if (encendido) {
    switch (comando) {
        case 'cambiar canal':
            canal += 1;
            console.log(canal);
            break;
        case 'subir volumen':
            volumenActual += 1;
            console.log(volumenActual);
            break;
        case 'mutear':
            volumenActual = 0;
            console.log(volumenActual);
            break;
        default:
            break;
    }
}
else {
    console.log('Televisor apagado');
}
//# sourceMappingURL=ejercicio1_bloque3.js.map