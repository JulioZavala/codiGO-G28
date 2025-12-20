/**
 * Que nos permita calcular una y otra vez hasta que el
 * usuario decida salir
 */
while (true) {
  // Mostrar al usuario un menu de opciones
  const opcion = prompt(
    "Ingresa la opción que deseas escoger:\n1) Calculadora\n2) Salir"
  );

  if (opcion === "1") {
    // Solicitamos al usuairo que ingrese 2 numeros
    const numero1 = Number(prompt("Ingrese el número 1:"));
    const numero2 = Number(prompt("Ingrese el número 2:"));
    const operacion = prompt(
      "Escoja que operación desea realizar\n1) +\n2) -\n3) *\n4) /"
    );

    if (opcion === "+") {
      alert(numero1 + numero2);
    } else if (operacion === "-") {
      alert(numero1 - numero2);
    } else if (operacion === "*") {
      alert(numero1 * numero2);
    } else if (operacion === "/") {
      alert(numero1 / numero2);
    } else {
      alert("Opción inválida");
    }
  } else if (opcion === "2") {
    break;
  } else {
    alert("Opción inválida");
  }
}