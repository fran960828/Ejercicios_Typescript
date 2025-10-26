// 16. Declara una función doblar(x: number): number que devuelva el doble.
//     Declara otra triplicar usando arrow function.
function doblar(x: number): number {
  return x * 2;
}
const triplicar = (x: number): number => {
  return x * 3;
};
console.log(doblar(4), triplicar(7));
// 17. Crea una función aplicar(fn: (n:number)=>number, valor:number) que reciba una función y un número, y devuelva el resultado de aplicar la función.
// 18. Llama a aplicar pasando doblar y triplicar como parámetros, y muestra los resultados.
type callback = (numero: number) => number;

function aplicar(valor: number, fc: callback): number {
  let resultado: number = fc(valor);
  return resultado;
}
console.log(aplicar(5, doblar));
console.log(aplicar(5, triplicar));

// 19. Declara una función repetir(veces:number, accion:()=>void) que ejecute la función accion el número de veces indicado.
//     Prueba a pasar una arrow function que imprima "Hola".
type callback_void = () => void;
function repetir(veces: number, accion: callback_void): void {
  for (let i = 0; i < veces; i++) {
    accion();
  }
}

const saludar = () => {
  console.log(`hola`);
};
repetir(5, saludar);
