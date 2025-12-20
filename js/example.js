// Comentario de 1 linea

/*
comentarios
mas largos
*/

/**
 * var: prefijo
 * direccion: nombre de la variable
 * = : operador de asignacion 
 * "av mi casa true 123" : valor de la variable (string)
 */

var direccion = "av mi casa 123"
var direccion = "av siempre viva"
// imprimir algo en consola
console.log("hola mundo")
console.log(direccion)

// let
let edad = 50 // number
edad = 51
console.log(edad)

// inmutables
const ipFija = "192.145.323.32"
const dni = "9999999"

// ipFija = "192.168.1.1"
let direccionDeCasa = ""
let direccion_de_casa = ""

// Operadore aritmeticos
// + - * /
let suma = 0
let resta = 0
let division = 0
let producto = 0

const numero1 = 10
const numero2 = 0

suma = numero1 + numero2
resta = numero1 - numero2
division = numero1 / numero2
producto = numero1 * numero2
console.log("La suma es:", suma)
console.log("La resta es:", resta)
console.log("La divison es:", division)
console.log("El producto es:", producto)

// Operadores de comparacion
// siempre los operadores de comparacion retornan un boolean (true - false)
const mayor = 10 > 5
console.log("mayor", mayor)
const menor = 5 < 10
console.log("menor", menor)
console.log("mayor igual", 10 >= 10)
console.log("menor igual", 3 <= 3)

// IGUALDAD
console.log("2" == 2)
console.log("2" === 2)
console.log("hola" === "HOLA")
console.log(true + true)


// condicion
// !== diferente
if (numero2 !== 0) {
  division = numero1 / numero2
  console.log("La divison es:", division)
} else {
  console.log("El numero2 debe ser diferente a 0")
}