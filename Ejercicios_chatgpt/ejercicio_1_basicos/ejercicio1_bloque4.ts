// 13. Define un tipo Persona con name: string, age: number, hobbies: string[].
//     Crea una variable con ese tipo y muestra sus propiedades.
// 14. Añade una propiedad opcional email?: string a Persona.
//     Crea dos objetos: uno con email y otro sin él.

type persona = {
  name: string;
  age: number;
  hobbies: string[];
  email?: string;
};
const alumno1: persona = {
  name: "Francisco",
  age: 29,
  hobbies: ["deporte", "programación"],
};
const alumno2: persona = {
  name: "daniel",
  age: 22,
  hobbies: ["ninguno"],
  email: "daniel@gmail.com",
};

// 15. Declara una función presentar(persona: Persona) que imprima su nombre y edad, usando persona.email ?? "Sin email" para mostrar un valor por defecto.
function presentar(alumno: persona): void {
  alumno.email = alumno.email ?? "sin email";
  console.log(alumno.name, alumno.age, alumno.hobbies, alumno.email);
}
presentar(alumno1);
presentar(alumno2);
