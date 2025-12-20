// 4 formas de crear funciones

// 1 clasica
function procesarPago(monto, dni, tieneDescuento) {
  // bloque de codigo que tendremos para esta funcion
  // al monto vamos a sumarle IGV
  // retornar un string que diga el monto final + dni
  let montoFinal = monto + (monto * 0.18)
  if (tieneDescuento) {
    // restar al monto funal un 10%
    montoFinal = montoFinal - (montoFinal * 0.1)
  }
  return "El monto final es: " + montoFinal + ", DNI: " + dni
}

// por defecto NO se ejecuta
// para que la funcion se ejecute tiene que ser llamada
// y como se llama?
console.log(procesarPago(450, "72812323", true))
console.log(procesarPago(500, "10021345", false))
console.log(procesarPago())





function factorial(numero) {
  let suma = 0
  for (let i = numero; i >= 1; i--){
    suma += i
  }
  return suma
}

console.log(factorial(5))
console.log(factorial(100))
console.log(factorial(20))





function invertir(numero) {
let numero2 = numero.toString()
  let numeroInv = ""
  for (let i = numero2.length-1; i >= 0; i--){
    numeroInv += numero2[i]
  }
  return numeroInv
}

console.log(invertir(597))


function invertirNumero(numero) {
  // vamos usar funciones de JS para poder invertir este
  // el proceso sera el siguiente
  // convertir de number a string
  const numeroAString = String(numero)
  // convertir de string a una lista
  const stringALista = numeroAString.split("")
  // invertir la lista
  const listaInvertida = stringALista.reverse()
  // convertir la lista a un numero?
  // unir los elemenotos de una lista
  const listaUnida = listaInvertida.join("")
  return Number(listaUnida)
}
console.log(invertirNumero(123))
console.log(invertirNumero(5041))


function invertirNumero(numero) {
  return Number(String(numero).split("").reverse().join(""))
}
console.log(invertirNumero(123))
console.log(invertirNumero(5041))




/**
Contar Números Pares en un Rango
Crear una función que reciba dos números (inicio y fin) y cuente cuántos números pares hay entre ellos (incluyendo los extremos).
1,10 -> 2,4,6,8,10 -> 5
 */


function contarNumerosPares(inicio, fin) {
  let contador = 0
//  for (let i = inicio; i <= fin; i++){
//    if (i % 2 === 0) contador++
//  }
  for (let i = inicio; i <= fin; i += 2) contador++;
  return contador
}


console.log(contarNumerosPares(10, 20))
console.log(contarNumerosPares(1, 10))
console.log(contarNumerosPares(1, 100))
console.log(contarNumerosPares(20, 100))



// Lista (Arrays) Arreglos
const alumnos = ["Juan", "Pepe", "Luis", "Anderson"]
const listaAny = ["Hola", true, 10, undefined, false]
// arreglo vacio
const lista = []

// indices (index)
// -> En programación cuando hablamos de index, siempre
// debemos empezar a contar desde el número 0
console.log(alumnos[0]) // Juan
console.log(alumnos[1]) // Pepe
console.log(alumnos[2]) // Luis
console.log(alumnos[3]) // Anderson
console.log(alumnos[4]) // undefined
// at: permite obtener un valor en base index
console.log(alumnos.at(0))
// truco: si queremos acceder al ultimo elemento de la lista
console.log(alumnos.at(-1))
console.log(alumnos.at(-2))


const autos = []
// push
autos.push("Mercedes")
autos.push("Toyota")
console.log(autos)
// NO SE PUEDE
// autos = "cambio"




const animales = ["perro", "gato", "loro", "leon"]
// ANTIGUA, YA NO SE USA
for (let i = 0; i < animales.length; i++) {
  console.log(animales[i])
}
// MODERNA: FOR OF
for (let animal of animales) {
  console.log(animal)
}
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for (let numero of numeros) {
  if (numero % 2 === 0) console.log(numero)
}


// {} = llaves
// [] = corchetes

// OBJETOS
const persona = {
  nombre: "Juan",
  apellido: "Perez",
  dni: 7123123
}



console.log(persona)
console.log(persona.apellido)
console.log(persona.nombre)
console.log(persona.dni)


/**
Calificaciones de Estudiantes
Descripción: Crear una función que reciba un array de calificaciones y:

Calcule el promedio
Cuente cuántos aprobaron (nota >= 60)
Cuente cuántos reprobaron
Encuentre la nota más alta
Imprima en consola cada valor
 */

function analizarCalifaciones(notas) {
  let suma = 0
  let aprobados = 0
  let reprobados = 0
  let notaMaxima = notas[0]

  for (let nota of notas) {
    suma += nota

    if (nota >= 60) {
      aprobados++
    } else {
      reprobados++
    }

    if (nota > notaMaxima) {
      notaMaxima = nota
    }
  }

  const promedio = suma / notas.length

  console.log("Promedio:", promedio)
  console.log("Cantidad de aprobados:", aprobados)
  console.log("Cantidad de reprobados:", reprobados)
  console.log("Nota mas alta:", notaMaxima)
}
analizarCalifaciones([100, 50, 60, 75, 25])
analizarCalifaciones([20, 13, 45, 56, 65, 12])





let suma = 0
let aprob = 0
let reprob = 0
let max = 0
function analizarCalifaciones(notas) {
  for (let nota of notas) {
    suma += nota
    cantidad = notas.length
    if (nota >= 60) aprob++
    else reprob++
    if (max < nota ) max = nota
  }
 
  console.log("Promedio: ", suma / cantidad)
  console.log("Cantidad de aprobados: ", aprob)
  console.log("Cantidad de reprobados: ", reprob)
  console.log("Nota mas alta: ", max)
}
analizarCalifaciones([20, 50, 85, 75, 125])



/**
Filtrar y Contar
Descripción: Crear una función que reciba un array de números y un número mínimo. La función debe:

Crear un nuevo array solo con números mayores al mínimo
Contar cuántos números fueron filtrados
imprimir ambos datos
 */

function filtrarMayores(numeros, minimo) {
  const numeros2 = []
  for (let numero of numeros) {
    if (numero >= minimo) numeros2.push(numero)
  }
  console.log(numeros2)
  console.log(numeros2.length)
}

filtrarMayores([10, 20, 30, 35, 40], 25)
// [30, 35, 40]
// 3 numeros filtrados




const nombres = ["juan", "luis", "pepe", "mario"]
const nombresFiltrados = nombres.filter(function (nombre) {
  return nombre !== "luis"
})
console.log(nombresFiltrados)

const personas = [
  {
    id: 1,
    name: "juan"
  },
  {
    id: 2,
    name: "luis"
  },
  {
    id: 3,
    name: "pepe"
  }
]

const personasFiltradas = personas.filter(function (persona) {
  return persona.id !== 3
})
console.log(personasFiltradas)