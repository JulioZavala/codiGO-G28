/**
 * Ejercicio 2: Mayor de Edad
Crear una variable edad y mostrar si la persona es
 mayor de edad (18 años o más) o menor de edad.
 */
const numero = Number(prompt("Ingrese su edad"))

const edad = numero;
if (edad >= 18) {
    console.log("Tiene", edad, "años. Usted es mayor de edad");
} else {
    console.log("Tiene", edad, "años. Usted es menor de edad");
}