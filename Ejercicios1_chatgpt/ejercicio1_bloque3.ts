// 9. Declara una variable identificador que pueda ser string o number.
//    Prueba a asignarle ambos tipos y muestra los valores.
let identificador: string | number;
identificador = 1234;
identificador = "1233";

// 10. Crea un array de string llamado frutas y añade tres frutas.
//     Luego crea otro array (string|number)[] con elementos mixtos.

const frutas: string[] = ["manzana", "pera", "banana"];
const dosvalores: (string | number)[] = ["manzana", "pera", 7];

// 11. Declara una tupla [string, number] que contenga un nombre y una edad.
//     Imprime cada elemento por separado.
let datos: [string, number];
datos = ["fran", 29];
console.log(datos[0], datos[1]);
// 12. Declara un array usando la forma Array<string|number> y añade elementos de ambos tipos.
let array: Array<string | number>;
array = ["string", 24, 23, "cena"];
