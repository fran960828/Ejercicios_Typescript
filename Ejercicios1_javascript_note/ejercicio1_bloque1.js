"use strict";
// ## 1. Variables y tipos de datos (Tipificación de datos y conversiones)
Object.defineProperty(exports, "__esModule", { value: true });
// > **Nota TS:** En estos ejercicios, todo _input_ obtenido de `prompt()` debe ser tipificado y, si es numérico, debe ser **convertido** explícitamente a `number` antes de cualquier operación matemática.
// ### 1 Saludo
// - Crear un programa que pida al usuario ingresar un nombre y apellido por separado, y luego muestre un mensaje que diga,
// "Hola {nombre} {apellido}, bienvenida a Ada".
// - **Requisitos TS:** Declarar `nombre` y `apellido` explícitamente como tipo `string`.
let nombre;
let apellido;
nombre = "Francisco";
apellido = "Navarro";
console.log(`Hola ${nombre} ${apellido}, Bienvenido a Ada`);
// ### 2 Heladería
// - Crear un programa que pida al usuario ingresar, por separado, tres gustos de helado, y luego muestre un mensaje que diga,
// por ejemplo, "Aquí tiene su helado de chocolate, dulce de leche y menta granizada".
// - **Requisitos TS:** Tipificar los gustos como `string` y usar _template strings_ tipados para el mensaje final.
let helados;
helados = ["fresa", "mango", "coco"];
console.log(`Me gusta el helado de ${helados[0]}, ${helados[1]} y ${helados[2]}`);
// ### 3 Datos personales
// - Crear un programa que pida al usuario ingresar, por separado, nombre, apellido, edad, nacionalidad, documento, y muestre luego un mensaje que diga: "Nuevo usuario agregado al sistema:" y liste todos los datos juntos.
// - **Requisitos TS:** Tipificar `nombre`, `apellido`, `nacionalidad`, `documento` como `string`, y `edad` como `number` (requiere conversión de `prompt`).
let usuario;
usuario = ["fran", "navarro", "España", "773747373W", 29];
for (let item of usuario) {
    console.log(item);
}
// ### 4 Lista de reproducción
// - Crear un programa que pida al usuario ingresar, por separado, el nombre de una playlist y el título de tres canciones,
//  y al finalizar se muestre un mensaje que diga, p. ej.: "Se ha creado la playlist 'Hits de los 80s' con
// las canciones 'Africa', 'Maniac', 'Final Countdown'".
// - **Requisitos TS:** Declarar el nombre de la _playlist_ y los títulos de las canciones como `string`.
let playlist = [];
playlist.push("el pianista");
playlist.push("el jardin");
playlist.push("la promesa");
console.log(playlist);
// ### 6 Meses por día
// - Crear variables que contengan arrays de strings con los nombres de meses, un array para meses de 31 días, uno para de 30, y otro para 29.
// Completar cada array con los nombres correspondientes. Mostrarlos en un mensaje indicando cuál es cuál, p.ej: "Meses con 31 días: Enero, Marzo, Mayo...".
// - **Requisitos TS:** **Usar arrays tipados**: `const meses31: string[] = [...]`, y de forma similar para los meses de 30 y 29 días.
let meses31 = [
    "Enero",
    "Marzo",
    "Mayo",
    "Julio",
    "Agosto",
    "Octubre",
    "Diciembre",
];
let meses30 = ["Abril", "Junio", "Septiembre", "Noviembre"];
let meses28 = ["Febrero"];
console.log(meses31, meses30, meses28);
// ### 7 Miembros de la familia
// - Crear una variable que contengan un array de strings con los nombres de integrantes de la familia y completarlo con todos o algunos nombres. Mostrarlos en un mensaje que los liste.
// - **Requisitos TS:** Declarar el array como `string[]`.
let familia = ["padre", "madre", "Hermano", "Hermana", "Hijo"];
for (let i of familia) {
    console.log(i);
}
// ### 9 Años perro
// - Crear un programa que pida ingresar una edad y devuelva el equivalente de esas edad en años perro.
// - **Requisitos TS:** La edad ingresada debe ser convertida y tipificada como `let edadHumana: number`.
let edadHumana;
edadHumana = 8;
let edadPerro;
edadPerro = edadHumana * 7.5;
console.log(edadPerro);
// ### 10 Minutos a segundos
// - Crear un programa que pida ingresar una cantidad en minutos mediante un _prompt_ y muestre un mensaje con el resultado de la conversión en segundos.
// - **Requisitos TS:** `let minutos: number`. El resultado debe ser explícitamente numérico (`segundos: number`).
let minutos = 28;
let segundos;
segundos = minutos * 60;
console.log(segundos);
// ### 11 Días a segundos
// - Crear un programa que pida ingresar una cantidad de días y muestre un mensaje con el resultado de la conversión en segundos.
// - **Requisitos TS:** Ambas variables (`dias`, `segundos`) deben ser tipificadas como `number`.
let dias;
let sg;
dias = 10;
sg = dias * 24 * 3600;
console.log(sg);
// ### 16 Tiempo de viaje
// - Crear un programa que pida al usuario la distancia de su recorrido y mostrar en un mensaje cuánto tiempo tardaría en completar
// el recorrido en distintos medios de transporte, definiendo de antemano distintas velocidades para distintos medios de transporte
//  (p. ej.: a pie: 5 km/hora, bici 10km/hora, etc.).
// - **Requisitos TS:** Definir las velocidades como `const velocidadPie: number`. Declarar `distancia: number` y `tiempo: number`.
let distancia;
let tiempo = [];
let velocidades;
velocidades = {
    pie: 5,
    bici: 25,
    coche: 100,
};
distancia = 75;
tiempo.push(distancia / velocidades.pie);
tiempo.push(distancia / velocidades.bici);
tiempo.push(distancia / velocidades.coche);
console.log(tiempo);
// ### 21 Segundos a horas, minutos y segundos
// - Crear un programa que pida ingresar una cantidad en segundos y muestre un mensaje con el resultado de la conversión en horas, minutos y segundos que corresponde a esa cantidad (p.ej. 3602 segundos = 1 hora 2 segundos). (Usar operador módulo).
// - **Requisitos TS:** Tipificación estricta: Declarar la entrada como `let segundosTotales: number`. Asegurar que las variables resultantes (`horas`, `minutos`, `segundos`) se manejen estrictamente como `number`.
let segundosTotales = 3620; // cantidad total de segundos a convertir
// Cálculos
const horas = Math.floor(segundosTotales / 3600); // cuántas horas completas hay
const restoDespuesDeHoras = segundosTotales % 3600; // resto tras quitar horas
const min = Math.floor(restoDespuesDeHoras / 60); // minutos restantes
const seg = restoDespuesDeHoras % 60; // segundos restantes
// Mostrar resultado
console.log(`${segundosTotales} segundos = ${horas} hora(s) ${min} minuto(s) ${seg} segundo(s)`);
// ### 25 Calculador gastos
// - Crear un programa que pida al usuario cuanto dinero disponible tiene, y vaya preguntando cuánto tiene que pagar por cada servicio,
// pidiendo el nombre del servicio y el monto a pagar, uno a la vez. Al final debe mostrar una lista con todos los servicios a pagar y
// el monto de cada uno, además del dinero disponible que le queda. Hacerlo con 3 servicios.
// - **Requisitos TS:** Declarar `let dineroDisponible: number`. Los nombres de servicios serán `string`, y los montos a pagar serán `number`.
let dinero;
dinero = 1500;
let servicio;
let gasto;
for (let i = 0; i < 3; i++) {
    servicio = "ingles";
    gasto = 300;
    dinero -= gasto;
    console.log(`${servicio} tiene un coste de ${gasto} euros, tu saldo actual es ${dinero}`);
}
//# sourceMappingURL=ejercicio1_bloque1.js.map