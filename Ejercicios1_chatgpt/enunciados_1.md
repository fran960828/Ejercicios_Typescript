🧩 Bloque 1: Tipos básicos y declaración/asignación

1. Declara una variable nombre de tipo string sin asignarle valor y luego asígnale "María".
   Imprime su valor por consola.
2. Declara una variable edad de tipo number y asígnale un valor.
   Después, reasígnale otro valor y muestra ambos resultados por consola.
3. Declara una constante activo de tipo boolean y asígnale true.
   Intenta reasignarla y observa el error que TypeScript marca.
4. Declara una variable con tipo explícito y otra con inferencia de tipo.
   Explica con un comentario la diferencia entre ambas formas.
   🔣 Bloque 2: Tipos especiales (any, unknown, null, undefined)
5. Declara una variable dato: any y asígnale distintos valores (string, número, objeto).
   Accede a una propiedad inexistente y comenta qué problema tiene any.
6. Declara una variable misterio: unknown y prueba a acceder a .length directamente.
   Luego usa un type guard (typeof) para poder hacerlo correctamente.
7. Declara una variable usuario: string | null e intenta asignarle undefined.
   Observa el error y comenta por qué ocurre.
8. Crea una función saluda(nombre?: string) que salude con "Hola, invitado" si no se pasa el parámetro.
   Usa un condicional if (nombre === undefined).
   ⚙️ Bloque 3: Uniones, arrays y tuplas
9. Declara una variable identificador que pueda ser string o number.
   Prueba a asignarle ambos tipos y muestra los valores.
10. Crea un array de string llamado frutas y añade tres frutas.
    Luego crea otro array (string|number)[] con elementos mixtos.
11. Declara una tupla [string, number] que contenga un nombre y una edad.
    Imprime cada elemento por separado.
12. Declara un array usando la forma Array<string|number> y añade elementos de ambos tipos.
    🧱 Bloque 4: Objetos y propiedades opcionales
13. Define un tipo Persona con name: string, age: number, hobbies: string[].
    Crea una variable con ese tipo y muestra sus propiedades.
14. Añade una propiedad opcional email?: string a Persona.
    Crea dos objetos: uno con email y otro sin él.
15. Declara una función presentar(persona: Persona) que imprima su nombre y edad, usando persona.email ?? "Sin email" para mostrar un valor por defecto.
    📦 Bloque 5: Funciones, arrow functions y callbacks
16. Declara una función doblar(x: number): number que devuelva el doble.
    Declara otra triplicar usando arrow function.
17. Crea una función aplicar(fn: (n:number)=>number, valor:number) que reciba una función y un número, y devuelva el resultado de aplicar la función.
18. Llama a aplicar pasando doblar y triplicar como parámetros, y muestra los resultados.
19. Declara una función repetir(veces:number, accion:()=>void) que ejecute la función accion el número de veces indicado.
    Prueba a pasar una arrow function que imprima "Hola".
    🧮 Bloque 6: Enums, literal types y type aliases
20. Crea un enum llamado Color con valores "Rojo", "Verde", "Azul".
    Declara una variable colorFavorito con un valor de ese enum.
21. Crea un literal type Rol = "admin" | "user" | "guest".
    Declara una variable miRol y asígnale "user".
    Intenta asignarle otro valor que no esté permitido.
22. Define un type alias Coordenada = {x:number, y:number}.
    Crea una función mover(p: Coordenada, dx:number, dy:number) que retorne una nueva coordenada sumando los desplazamientos.
    🔄 Bloque 7: Uso de Record y as
23. Crea un Record<string, number> llamado puntuaciones con tres jugadores y sus puntos.
    Imprime el valor de un jugador específico.
24. Crea una variable elemento = document.getElementById("mi-input") y usa as HTMLInputElement para poder acceder a su .value.
    (Añade un condicional para evitar errores si document no existe).
25. Declara un objeto producto de tipo Record<string, string|number> y añade propiedades "nombre", "precio", "stock".
    Imprime sus claves y valores.
    🧭 Bloque 8: Null assertions y operadores !, ??, ?.
26. Crea una variable texto: string | null e intenta imprimir su longitud directamente.
    Luego usa texto! para evitar el error (comenta por qué puede ser peligroso).
27. Crea una función mostrarLongitud(s?: string) que use el operador ?. para imprimir s?.length sin errores.
28. Crea una variable valor = null y usa const resultado = valor ?? "Valor por defecto"; imprime el resultado.
29. Declara una función obtenerConfiguracion(cfg?: {modo?: string}) que imprima cfg?.modo ?? "estándar".
    💡 Bloque 9: Funciones con tipos de retorno void y never
30. a) Crea una función mostrarMensaje(msg: string): void que imprima el mensaje.
    b) Crea otra función lanzarError(mensaje: string): never que lance una excepción.
    c) Llama a ambas y comenta la diferencia entre void y never.
