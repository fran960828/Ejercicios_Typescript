"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//### 1 Número mayor a 100
//- Crear un programa que permita ingresar tres números y muestre si alguno de ellos es mayor a 100.
//- **Requisitos TS:** Las tres entradas deben ser tipificadas como `number` (`n1: number`, `n2: number`, `n3: number`). El resultado lógico de la comparación debe ser un `boolean'
let num1 = 45;
let num2 = 108;
let num3 = 93;
const comprobacion = (num) => {
    if (num > 100) {
        return num;
    }
};
console.log(comprobacion(num1));
console.log(comprobacion(num2));
console.log(comprobacion(num3));
//### 3 Donación de sangre
//
//- Crear un programa que realice al usuario 3 preguntas: si se ha hecho tatuajes recientemente, si ha tenido o tiene hepatitis,
//  si tiene anemia. Si responde a alguna de ellas afirmativamente, debe mostrar un mensaje que indique si puede
//  o no donar sangre.
//- **Requisitos TS:** Las respuestas de `confirm()` (`tatuajes`, `hepatitis`, `anemia`) deben ser tratadas como `boolean`.
let anemia = 'no';
let hepatitis = 'no';
let tatuajes = 'no';
const donar = (anemia, hepatitis, tatuajes) => {
    if (anemia === 'no' && hepatitis === 'no' && tatuajes === 'no') {
        console.log('puedes donar');
    }
    else {
        console.log('no puedes donar');
    }
};
donar(anemia, hepatitis, tatuajes);
//### 4 Autenticación
//
//- Crear un programa que pida ingresar el usuario y la contraseña y los compare con el usuario y contraseña guardados en 
// variables, y muestre en un mensaje si tiene el acceso autorizado.
//- **Requisitos TS:** Definir las credenciales (`USUARIO_VALIDO`, `PASSWORD_VALIDA`) como 
// `const string`. El _input_ del usuario también es `string`.
const usuarioRegistrado = 'usuario123';
const passwordRegistrada = 'password123';
let usuario = 'usuario123';
let password = 'password123';
if (usuario === usuarioRegistrado && password === passwordRegistrada) {
    console.log('Bienvenido');
}
else {
    console.log('usuario y/o contraseña incorrecta');
}
//### 8 Número más grande (2 números)
//
//- Hacer un programa que pida ingresar 2 números, y muestre como resultado el más grande de ellos. 
// Agregar la funcionalidad de que si alguno de los números es igual a otro, debe mostrar un mensaje diciéndolo.
//- **Requisitos TS:** Asegurar `n1: number` y `n2: number`.
let n1 = 14;
let n2 = 14;
if (n1 > n2) {
    console.log(`${n1} es el mayor`);
}
else if (n2 > n1) {
    console.log(`${n2} es el mayor`);
}
else {
    console.log('Ambos números son iguales');
}
//### 13 Juez de gusto
//
//- Crear un programa que pida al usuario evaluar del 1 al 10 cuánto le gusta X cosa (a elección). Dependiendo de la respuesta,
//  debe mostrar un mensaje en consonancia. Si se ingresa algo que no sea un número del 1 al 10,
//  mostrar un mensaje de advertencia y volver a pedir dicho número.
//- **Requisitos TS:** La entrada debe ser convertida a `number` (`gusto: number`) y 
// la validación de rango debe devolver un `boolean`.
let evaluacion = '12';
let resultado = (eval) => {
    return eval > 1 && eval < 11;
};
console.log(resultado(parseInt(evaluacion)));
//### 14 Calificación
//
//- Crear un programa que permita ingresar el resultado de una evaluación con un puntaje del 1 al 10, y 
// muestre un mensaje según el rango (Ej: ¡Excelente! si la nota es 10; Reprobado, si la nota es menor a 6).
//- **Requisitos TS:** `let nota: number`.
let Calificacion = 4;
switch (Calificacion) {
    case 10:
        console.log('Sobresaliente');
        break;
    case 5:
        console.log('Suficiente');
        break;
    default:
        console.log('Insuficiente');
        break;
}
//# sourceMappingURL=ejercicio1_bloque2.js.map