/**
 * Ejercicio 1: Par o Impar
Crear una variable con un número y mostrar en consola si es par o impar.
 */

// La funcion prompt 
const numero = Number(prompt("Ingrese un numero:30"))
// los prompt siempre retornan string
// validar si el numero es par
// para poder hallar el residuo usamos el operador "%"
const residuo = numero % 2;
if (residuo === 0) {
    console.log("El numero ", numero, "es par");
} else {
    console.log("El numero", numero, "es impar");
}