"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//### 2 Playlist
//
//- Crear un programa que pida el nombre de una playlist y cuántas canciones desea agregar. 
// Luego pida agregar la cantidad de canciones elegidas, mostrando las canciones que quedan por agregar 
// y la playlist actual. Mostrar al finalizar un mensaje con el nombre de la playlist y la lista de canciones.
//- **Requisitos TS:** `let cantidadCanciones: number`. El array de canciones: `let canciones: string[] = []`.
const playlist = [];
let numCanciones = 5;
let cancion;
for (let i = 0; i < numCanciones; i++) {
    cancion = 'te conoci';
    playlist.push(cancion);
    console.log(`canciones por agregar: ${numCanciones - (i + 1)}
                playlist actual: ${playlist}`);
}
//### 3 Número mayor o menor
//
//- Crear un programa que pregunte si se desea buscar el mayor o el menor número de un conjunto. 
// Luego, preguntar entre cuántos se desea buscar. Ir pidiendo ingresar la cantidad de números y 
// al finalizar mostrar el mayor o menor de todos.
//- **Requisitos TS:** `let cantidadNumeros: number`. La variable que almacena el resultado final 
// (`resultado`) debe ser `number`.
const readline = __importStar(require("readline"));
// Crear la interfaz
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Función auxiliar que convierte rl.question en una promesa
function preguntar(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}
async function main() {
    const busqueda = "mayor";
    const cantidadNumeros = 4;
    let resultado;
    let num;
    if (busqueda === "mayor") {
        resultado = -Infinity;
        for (let i = 0; i < cantidadNumeros; i++) {
            const resp = await preguntar(`Número ${i + 1}: `);
            num = parseFloat(resp);
            if (resultado < num) {
                resultado = num;
            }
        }
        console.log(`El número mayor es: ${resultado}`);
    }
    else {
        resultado = Infinity;
        for (let i = 0; i < cantidadNumeros; i++) {
            const resp = await preguntar(`Número ${i + 1}: `);
            num = parseFloat(resp);
            if (resultado > num) {
                resultado = num;
            }
        }
        console.log(`El número menor es: ${resultado}`);
    }
    rl.close();
}
//main();
//### 5 Carrera
//
//- Crear un programa para controlar las vueltas de una deportista. Debe pedir la cantidad de vueltas que va a realizar 
// e ir preguntando el tiempo en segundos de cada vuelta. Al final, se debe mostrar un mensaje listando los tiempos de 
// cada vuelta y el promedio del tiempo.
//- **Requisitos TS:** El array para los tiempos: `let tiempos: number[] = []`. 
// La variable para el promedio (`promedio`) y los tiempos individuales deben ser `number`.
function numeroVueltas(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}
function tiempoVuelta(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}
async function CalcularPromedio() {
    let numVueltas;
    const tiempos = [];
    let tiempo;
    let promedio;
    numVueltas = parseFloat(await numeroVueltas('Cuantas vueltas vas a dar: '));
    for (let i = 0; i < numVueltas; i++) {
        tiempo = parseFloat(await tiempoVuelta(`tiempo vuelta ${i + 1}: `));
        tiempos.push(tiempo);
        console.log(`vuelta ${i + 1}: ${tiempo}s`);
    }
    promedio = tiempos.reduce((ac, valor) => {
        return ac + valor;
    }, 0);
    promedio = promedio / numVueltas;
    console.log(`El promedio de vueltas es ${promedio}`);
    rl.close();
}
//CalcularPromedio()
//### 8 Múltiples intentos
//
//- Crear un programa que pida ingresar usuario y contraseña. El programa debe permitir hasta 3 intentos incorrectos.
//  Si se ingresa correctamente antes, muestra bienvenida. Si falla 3 veces, muestra error y termina.
//- **Requisitos TS:** `let intentos: number = 0;`. Las entradas de usuario y contraseña son `string`.
async function acceso() {
    let intentos = 0;
    const usuarioRegistrado = 'usuario123';
    const passwordRegistrada = 'password123';
    let usuario;
    let password;
    while (intentos < 3) {
        usuario = await preguntar('Introduce el usuario: ');
        password = await preguntar('Introduce la contraseña: ');
        intentos++;
        if (usuario === usuarioRegistrado && password === passwordRegistrada) {
            console.log('Inicio de sesión correcto');
        }
        else if (intentos < 3) {
            console.log('Vuelve a intentarlo');
            console.log('_______________________________');
        }
    }
    rl.close();
}
//acceso()
//### 9 Cara o cruz
//
//- Crear un programa que permita escoger entre cara o cruz. El programa genera un resultado aleatorio y muestra si se acertó 
// o no. Debe mostrar las rondas seguidas acertadas, reiniciar el contador si se erra, y llevar cuenta de la máxima racha.
//  Cuando se ingresa SALIR, termina mostrando la racha máxima.
//- **Requisitos TS:** Contadores tipificados: `let aciertosSeguidos: number = 0;` y `let maximoAciertos: number = 0;`.
//  La elección del usuario y el resultado aleatorio son `string`.
async function caraCruz() {
    const conjuntoAleatorio = ['cara', 'cruz'];
    let eleccionAleatoria;
    let eleccionJugador = await preguntar('Elegir entre cara|cruz|salir: ');
    let contador = 0;
    let rachaMaxima = 0;
    while (eleccionJugador !== 'salir') {
        eleccionAleatoria = conjuntoAleatorio[Math.floor(Math.random() * 2)];
        if (eleccionAleatoria === eleccionJugador) {
            contador++;
            rachaMaxima = contador > rachaMaxima ? contador : rachaMaxima;
        }
        else {
            contador = 0;
        }
        eleccionJugador = await preguntar('Elegir entre cara|cruz|salir: ');
    }
    console.log('Cantidad de aciertos consecutivos: ', rachaMaxima);
    rl.close();
}
//caraCruz()
//### 10 Mayor o menor
//
//- Crear un programa que elija un número al azar entre 1 y 10. El programa pide al usuario adivinar. Por cada intento, avisa si el número a adivinar es mayor o menor que el número ingresado. Termina cuando se adivina.
//- **Requisitos TS:** `const numeroSecreto: number`. La entrada del usuario: `let intentoUsuario: number`.
async function numeroFavorito() {
    let favorito = Math.floor(Math.random() * 11);
    let favoritoUsuario = 12;
    while (favorito !== favoritoUsuario) {
        favoritoUsuario = parseInt(await preguntar('Cual es tu numero favorito: '));
        if (favorito < favoritoUsuario) {
            console.log('El numero es menor');
        }
        else if (favorito > favoritoUsuario) {
            console.log('El numero es mayor');
        }
        else {
            console.log('Has acertado');
        }
    }
    rl.close();
}
numeroFavorito();
//# sourceMappingURL=ejercicio1_bloque4.js.map