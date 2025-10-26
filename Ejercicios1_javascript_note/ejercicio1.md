¡Absolutamente! Me complace presentar la adaptación de los ejercicios al formato Markdown, lista para ser copiada y utilizada en un entorno de desarrollo con TypeScript.

Para cada ejercicio, he mantenido la descripción original y he añadido una sección de **Requisitos TS** que refleja la necesidad de utilizar la tipificación estricta (`string`, `number`, `boolean`, `array[]`) y manejar las conversiones explícitas de tipos que son necesarias al recibir entradas del usuario (como `prompt()`) en TypeScript.

---

# Ejercicios de Práctica en TypeScript

## 1. Variables y tipos de datos (Tipificación de datos y conversiones)

> **Nota TS:** En estos ejercicios, todo _input_ obtenido de `prompt()` debe ser tipificado y, si es numérico, debe ser **convertido** explícitamente a `number` antes de cualquier operación matemática.

### 1 Saludo

- Crear un programa que pida al usuario ingresar un nombre y apellido por separado, y luego muestre un mensaje que diga, "Hola {nombre} {apellido}, bienvenida a Ada".
- **Requisitos TS:** Declarar `nombre` y `apellido` explícitamente como tipo `string`.

### 2 Heladería

- Crear un programa que pida al usuario ingresar, por separado, tres gustos de helado, y luego muestre un mensaje que diga, por ejemplo, "Aquí tiene su helado de chocolate, dulce de leche y menta granizada".
- **Requisitos TS:** Tipificar los gustos como `string` y usar _template strings_ tipados para el mensaje final.

### 3 Datos personales

- Crear un programa que pida al usuario ingresar, por separado, nombre, apellido, edad, nacionalidad, documento, y muestre luego un mensaje que diga: "Nuevo usuario agregado al sistema:" y liste todos los datos juntos.
- **Requisitos TS:** Tipificar `nombre`, `apellido`, `nacionalidad`, `documento` como `string`, y `edad` como `number` (requiere conversión de `prompt`).

### 4 Lista de reproducción

- Crear un programa que pida al usuario ingresar, por separado, el nombre de una playlist y el título de tres canciones, y al finalizar se muestre un mensaje que diga, p. ej.: "Se ha creado la playlist 'Hits de los 80s' con las canciones 'Africa', 'Maniac', 'Final Countdown'".
- **Requisitos TS:** Declarar el nombre de la _playlist_ y los títulos de las canciones como `string`.

### 5 Dirección completa

- Crear un programa que pida al usuario ingresar, por separado, la calle, el número, el departamento, el código postal, la ciudad y el país, y muestre un mensaje con toda la dirección completa, p.ej.: "La dirección que ha ingresado es: Calle Falsa 123 3C, 1414, CABA, Argentina".
- **Requisitos TS:** Tipificar todas las entradas como `string`.

### 6 Meses por día

- Crear variables que contengan arrays de strings con los nombres de meses, un array para meses de 31 días, uno para de 30, y otro para 29. Completar cada array con los nombres correspondientes. Mostrarlos en un mensaje indicando cuál es cuál, p.ej: "Meses con 31 días: Enero, Marzo, Mayo...".
- **Requisitos TS:** **Usar arrays tipados**: `const meses31: string[] = [...]`, y de forma similar para los meses de 30 y 29 días.

### 7 Miembros de la familia

- Crear una variable que contengan un array de strings con los nombres de integrantes de la familia y completarlo con todos o algunos nombres. Mostrarlos en un mensaje que los liste.
- **Requisitos TS:** Declarar el array como `string[]`.

### 9 Años perro

- Crear un programa que pida ingresar una edad y devuelva el equivalente de esas edad en años perro.
- **Requisitos TS:** La edad ingresada debe ser convertida y tipificada como `let edadHumana: number`.

### 10 Minutos a segundos

- Crear un programa que pida ingresar una cantidad en minutos mediante un _prompt_ y muestre un mensaje con el resultado de la conversión en segundos.
- **Requisitos TS:** `let minutos: number`. El resultado debe ser explícitamente numérico (`segundos: number`).

### 11 Días a segundos

- Crear un programa que pida ingresar una cantidad de días y muestre un mensaje con el resultado de la conversión en segundos.
- **Requisitos TS:** Ambas variables (`dias`, `segundos`) deben ser tipificadas como `number`.

### 12 Kilómetros a millas

- Crear un programa que pida ingresar una cantidad de kilómetros y muestre un mensaje con el resultado de la conversión en millas.
- **Requisitos TS:** Ambas variables (`kilometros`, `millas`) deben ser tipificadas como `number`.

### 13 Área de un triangulo

- Crear un programa que pida al usuario ingresar el valor de la base y el valor de la altura de un triangulo, calcular su área y mostrarlo en un mensaje.
- **Requisitos TS:** `let base: number`, `let altura: number`. El cálculo del área (`area: number`) debe ser explícitamente numérico.

### 16 Tiempo de viaje

- Crear un programa que pida al usuario la distancia de su recorrido y mostrar en un mensaje cuánto tiempo tardaría en completar el recorrido en distintos medios de transporte, definiendo de antemano distintas velocidades para distintos medios de transporte (p. ej.: a pie: 5 km/hora, bici 10km/hora, etc.).
- **Requisitos TS:** Definir las velocidades como `const velocidadPie: number`. Declarar `distancia: number` y `tiempo: number`.

### 21 Segundos a horas, minutos y segundos

- Crear un programa que pida ingresar una cantidad en segundos y muestre un mensaje con el resultado de la conversión en horas, minutos y segundos que corresponde a esa cantidad (p.ej. 3602 segundos = 1 hora 2 segundos). (Usar operador módulo).
- **Requisitos TS:** Tipificación estricta: Declarar la entrada como `let segundosTotales: number`. Asegurar que las variables resultantes (`horas`, `minutos`, `segundos`) se manejen estrictamente como `number`.

### 25 Calculador gastos

- Crear un programa que pida al usuario cuanto dinero disponible tiene, y vaya preguntando cuánto tiene que pagar por cada servicio, pidiendo el nombre del servicio y el monto a pagar, uno a la vez. Al final debe mostrar una lista con todos los servicios a pagar y el monto de cada uno, además del dinero disponible que le queda. Hacerlo con 3 servicios.
- **Requisitos TS:** Declarar `let dineroDisponible: number`. Los nombres de servicios serán `string`, y los montos a pagar serán `number`.

---

## 2. Operadores lógicos y de comparación (Tipificación booleana)

> **Nota TS:** Utilice `boolean` para manejar respuestas de `confirm()` y los resultados de las operaciones lógicas y de comparación.

### 1 Número mayor a 100

- Crear un programa que permita ingresar tres números y muestre si alguno de ellos es mayor a 100.
- **Requisitos TS:** Las tres entradas deben ser tipificadas como `number` (`n1: number`, `n2: number`, `n3: number`). El resultado lógico de la comparación debe ser un `boolean`.

### 3 Donación de sangre

- Crear un programa que realice al usuario 3 preguntas: si se ha hecho tatuajes recientemente, si ha tenido o tiene hepatitis, si tiene anemia. Si responde a alguna de ellas afirmativamente, debe mostrar un mensaje que indique si puede o no donar sangre.
- **Requisitos TS:** Las respuestas de `confirm()` (`tatuajes`, `hepatitis`, `anemia`) deben ser tratadas como `boolean`.

### 4 Autenticación

- Crear un programa que pida ingresar el usuario y la contraseña y los compare con el usuario y contraseña guardados en variables, y muestre en un mensaje si tiene el acceso autorizado.
- **Requisitos TS:** Definir las credenciales (`USUARIO_VALIDO`, `PASSWORD_VALIDA`) como `const string`. El _input_ del usuario también es `string`.

### 8 Número más grande (2 números)

- Hacer un programa que pida ingresar 2 números, y muestre como resultado el más grande de ellos. Agregar la funcionalidad de que si alguno de los números es igual a otro, debe mostrar un mensaje diciéndolo.
- **Requisitos TS:** Asegurar `n1: number` y `n2: number`.

### 13 Juez de gusto

- Crear un programa que pida al usuario evaluar del 1 al 10 cuánto le gusta X cosa (a elección). Dependiendo de la respuesta, debe mostrar un mensaje en consonancia. Si se ingresa algo que no sea un número del 1 al 10, mostrar un mensaje de advertencia y volver a pedir dicho número.
- **Requisitos TS:** La entrada debe ser convertida a `number` (`gusto: number`) y la validación de rango debe devolver un `boolean`.

### 14 Calificación

- Crear un programa que permita ingresar el resultado de una evaluación con un puntaje del 1 al 10, y muestre un mensaje según el rango (Ej: ¡Excelente! si la nota es 10; Reprobado, si la nota es menor a 6).
- **Requisitos TS:** `let nota: number`.

---

## 3. Estructuras de control: condicionales (If/Else y Switch tipificados)

> **Nota TS:** La tipificación de las variables de control es crucial aquí, ya sea `string` para nombres de meses/comandos o `number` para calificaciones y operaciones.

### 1 Número par o impar

- Crear un programa que pida al usuario ingresar un número y mostrar en un mensaje si el valor ingresado es par o impar.
- **Requisitos TS:** `let numero: number`.

### 2 Días del mes

- Crear un programa que pida por un mes y devuelva la cantidad de días que ese mes tiene.
- **Requisitos TS:** Si el usuario ingresa el nombre del mes, la variable de control (`mes`) debe ser `string`.

### 4 Examen aprobado

- Crear un programa que pida al usuario ingresar la nota un examen y mostrar en un mensaje si el examen está aprobado, si debe recuperar o es un aplazo (mayor a 7 aprueba, mayor a 4 recupera, menor a 4 aplazo).
- **Requisitos TS:** `let nota: number`.

### 6 Sandwich

- Crear un programa que pregunte al usuario paso por paso qué opciones desea elegir para armar su pedido (Tipo de pan, Ingrediente 1, Ingrediente 2, Aderezos, Gaseosa). Si no elige una opción válida debe mostrar un mensaje de alerta. Mostrar al final un mensaje con el pedido resultante.
- **Requisitos TS:** Todas las opciones elegidas serán `string`. La lógica condicional valida si el _string_ ingresado es válido.

### 11 Calculadora

- Crear un programa que permita elegir entre las operaciones: SUMA, RESTA, DIVISION y MULTIPLICACION, y luego de elegida, ingresar dos números y hacer dicha operación con ella.
- **Requisitos TS:** Utilizar `switch`. La variable para la operación puede ser `operacion: string`. Las entradas para los cálculos deben ser `num1: number` y `num2: number`.

### 12 Televisor

- Hacer un programa que empiece preguntando si se desea prender el televisor. Si elige que sí, debe mostrar el canal y el volumen actual, y permitir realizar operaciones (CAMBIAR CANAL, SUBIR VOLUMEN, MUTEAR, etc.).
- **Requisitos TS:** Declarar el estado inicial como `let canalActual: number` y `let volumenActual: number`. El _input_ del comando será `comando: string` (para usar en el `switch`).

---

## 4. Estructuras de control: bucles (Contadores e Iterables Tipificados)

> **Nota TS:** Tipificar contadores de bucle (`i: number`), variables de acumulación (`total: number`), y arrays que se llenan durante la ejecución.

### 2 Playlist

- Crear un programa que pida el nombre de una playlist y cuántas canciones desea agregar. Luego pida agregar la cantidad de canciones elegidas, mostrando las canciones que quedan por agregar y la playlist actual. Mostrar al finalizar un mensaje con el nombre de la playlist y la lista de canciones.
- **Requisitos TS:** `let cantidadCanciones: number`. El array de canciones: `let canciones: string[] = []`.

### 3 Número mayor o menor

- Crear un programa que pregunte si se desea buscar el mayor o el menor número de un conjunto. Luego, preguntar entre cuántos se desea buscar. Ir pidiendo ingresar la cantidad de números y al finalizar mostrar el mayor o menor de todos.
- **Requisitos TS:** `let cantidadNumeros: number`. La variable que almacena el resultado final (`resultado`) debe ser `number`.

### 5 Carrera

- Crear un programa para controlar las vueltas de una deportista. Debe pedir la cantidad de vueltas que va a realizar e ir preguntando el tiempo en segundos de cada vuelta. Al final, se debe mostrar un mensaje listando los tiempos de cada vuelta y el promedio del tiempo.
- **Requisitos TS:** El array para los tiempos: `let tiempos: number[] = []`. La variable para el promedio (`promedio`) y los tiempos individuales deben ser `number`.

### 8 Múltiples intentos

- Crear un programa que pida ingresar usuario y contraseña. El programa debe permitir hasta 3 intentos incorrectos. Si se ingresa correctamente antes, muestra bienvenida. Si falla 3 veces, muestra error y termina.
- **Requisitos TS:** `let intentos: number = 0;`. Las entradas de usuario y contraseña son `string`.

### 9 Cara o cruz

- Crear un programa que permita escoger entre cara o cruz. El programa genera un resultado aleatorio y muestra si se acertó o no. Debe mostrar las rondas seguidas acertadas, reiniciar el contador si se erra, y llevar cuenta de la máxima racha. Cuando se ingresa SALIR, termina mostrando la racha máxima.
- **Requisitos TS:** Contadores tipificados: `let aciertosSeguidos: number = 0;` y `let maximoAciertos: number = 0;`. La elección del usuario y el resultado aleatorio son `string`.

### 10 Mayor o menor

- Crear un programa que elija un número al azar entre 1 y 10. El programa pide al usuario adivinar. Por cada intento, avisa si el número a adivinar es mayor o menor que el número ingresado. Termina cuando se adivina.
- **Requisitos TS:** `const numeroSecreto: number`. La entrada del usuario: `let intentoUsuario: number`.
