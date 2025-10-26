/*
1. Declara una variable nombre de tipo string sin asignarle valor y luego asígnale "María".
   Imprime su valor por consola.
2. Declara una variable edad de tipo number y asígnale un valor.
   Después, reasígnale otro valor y muestra ambos resultados por consola.
3. Declara una constante activo de tipo boolean y asígnale true.
   Intenta reasignarla y observa el error que TypeScript marca.
4. Declara una variable con tipo explícito y otra con inferencia de tipo.
   Explica con un comentario la diferencia entre ambas formas.
*/
// Ejercicio 1
let nombre: string;
nombre = "Maria";
console.log(nombre);
// Ejercicio 2
let edad: number = 28;
console.log(edad);
edad = 29;
console.log(edad);
// Ejercicio 2
const activo: boolean = true;
// activo=2 Error al ser un const

// Ejercicio 4
let variable1: number; //declaramos el tipo de variable de forma explicita
let variable2 = 10; // asignamos un valor a la variable y adquiere el tipo segun el valor, tanto esta como la anterior son correctas
