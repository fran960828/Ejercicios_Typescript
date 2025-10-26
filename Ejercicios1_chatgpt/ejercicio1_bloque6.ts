// 🧮 Bloque 6: Enums, literal types y type aliases
// 20. Crea un enum llamado Color con valores "Rojo", "Verde", "Azul".
//     Declara una variable colorFavorito con un valor de ese enum.
enum color {
  rojo = "rojo",
  verde = "verde",
  azul = "azul",
}
let colorFavorito: color = color.rojo;
console.log(colorFavorito);
// 21. Crea un literal type Rol = "admin" | "user" | "guest".
//     Declara una variable miRol y asígnale "user".
//     Intenta asignarle otro valor que no esté permitido.
type Rol = "admin" | "user" | "guest";
let miRol: Rol = "user";
miRol = "admin";

// 22. Define un type alias Coordenada = {x:number, y:number}.
//     Crea una función mover(p: Coordenada, dx:number, dy:number) que retorne una nueva coordenada sumando los desplazamientos.
type coordenada = { x: number; y: number };
function mover(actual: coordenada, dx: number, dy: number): coordenada {
  let newx: number = actual.x + dx;
  let newy: number = actual.y + dy;
  let nueva: coordenada = { x: newx, y: newy };
  return nueva;
}
let actual = { x: 38.55, y: 1.63 };
console.log(mover(actual, 2, 3));
