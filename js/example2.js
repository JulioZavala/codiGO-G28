// OPERADOR TERNARIO
const edad = 15

if (edad >= 18) {
  console.log("Mayor")
} else {
  console.log("Menor")
}

// OPERADOR TERNARIO condicion ? verdadero : falsa
const mensaje = edad >= 18 ? "Mayor" : "Menor"
console.log(mensaje)

// EJEMPLO
const precio = 99
// Si el precio es mayor a 100 entonces hagamos un descuento del 10% si no del 0%
const descuento = precio > 100 ? 0.1 : 0
console.log(descuento)

const nombre = "anderson"
// OPERADOR TERNARIO NO SE DEBE USAR
const mensaje2 = nombre === "linder"
  ? console.log("profesor") : nombre === "anderson"
    ? console.log("alumno") : nombre === "juan"
      ? console.log("director") : console.log("no conocido")


// BUCLE ->   
// for (inicializacion; condicion; incremento) { }

// contar del 1 al 10
// i++ contar de 1 en 1
for (let i = 1; i <= 10; i++) {
  console.log(i)
}
console.log("---------------------")
// 10 - 20 contar de 2 en 2
for (let j = 10; j <= 20; j += 2) {
  console.log(j)
}
console.log("---------------------")
// 10 - 0
for (let h = 10; h >= 0; h--) {
  console.log(h)
}
console.log("---------------------")
// tabla de mutiplicar de 5
for (let g = 0; g <= 20; g++) {
  texto = "5 * " + g + " = " + g * 5
  console.log(texto)
}


// let frase = "Hola Mundo"
// let fraseInvertida = ""
// console.log(frase)
// for (let k = frase.length-1; k >= 0; k--) {
//   fraseInvertida += frase[k]
// }
// console.log(fraseInvertida)



for (let j = 1 ; j <= 100; j++) {
  if (j % 2 === 0) {
    console.log(j)
  }
  
}



const palara = "hOla mundo"
let contador1 = 0

for (let i = 0; i < palara.length; i++) {
  const letra = palara[i].toLowerCase()
  if (
    letra === "a" ||
    letra === "e" ||
    letra === "i" ||
    letra === "o" ||
    letra === "u"
  ) {
    contador1++
  }
}
console.log(contador1)



const palabra = "Tecsup"
let contador2 = 0
const vocales = "aeiou"

for (let i = 0; i < palabra.length; i++) {
  if (vocales.includes(palabra[i].toLowerCase())) {
    contador2++
  }
}
console.log(contador2)
