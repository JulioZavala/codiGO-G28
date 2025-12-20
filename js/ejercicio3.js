/**
 * Ejercicio 4: Sistema de Calificaciones CompletoDada
 *  una nota numérica (0-100), mostrar la calificación correspondiente:

90-100: "Excelente"
80-89: "Muy Bueno"
70-79: "Bueno"
60-69: "Aprobado"
0-59: "Reprobado"
 */

const nota = Number(prompt("Ingresa tu nota 0 - 100:")); // 80

// and = &&
// or = ||
if (nota >= 90 && nota <= 100) {
  console.log("Excelente");
} else if (nota >= 80 && nota < 90) {
  console.log("Muy Bueno");
} else if (nota >= 70 && nota < 80) {
  console.log("Bueno");
} else if (nota >= 60 && nota < 70) {
  console.log("Aprobado");
} else if (nota >= 0 && nota < 60) {
  console.log("Reprobado");
} else {
  console.log("Nota inválida");
}