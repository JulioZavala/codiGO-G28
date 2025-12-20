// Separar las variables de las funciones

// Los formulario tiene el evento submit
// buscar al formulario
const formularioComentario = document.querySelector("form");
const commentBox = document.querySelector("textarea")
const errorText = document.querySelector("#error-text")


// palabra reservada para hacer referencia a un elemento
function incrementar(element) {
  // paso 1: retrocemos a buscar al elemento padre usando closest
  // element.closest("div"): retorna el div contenido del button+span+button
  // una vez que ya tenemos usamos el querySelector, en este caso como estamos
  // usando querySelector sobre el div, esta funcion solo buscara en los elementos
  /**
   * element.closest("div")
   * <div>
   *  <button>+</button>
   *  <span>1</span>
   *  <button>-</button>
   * </div>
   * NOTA: la siguiente linea solo busca en el div encontrado
   * element.closest("div").querySelector
   * buscamos en el div encontrado la etiqueta span
   * element.closest("div").querySelector("span")
   */

  // la etiqueta span
  const contador = element.closest("div").querySelector("span");
  // vamos a modificar su valor
  // contador.textContext = ""
  // el valor actual: contador.textContent
  // pero al colocarle es "=" (operador de asignacion)
  contador.textContent = Number(contador.textContent) + 1;
}

function decrementar(element){
    const contador = element.closest("div").querySelector("span");
    const valorActual = Number(contador.textContent)

    if (valorActual > 0) {
        contador.textContent = Number(contador.textContent) - 1
    }
}

// Funcion que se encargue de generar el HTML para el card
function createCommentCard(comentario) {
  // buscamos el main por nombre de etiqueta
  const main = document.querySelector("main");
  main.innerHTML += `<div class="bg-white p-4 rounded-lg space-y-5">
      <!-- CABECERA -->
      <div class="flex items-center gap-7">
        <img width="40" src="./images/avatars/image-juliusomo.png" alt="" />
        <p class="font-semibold text-sm">Julio Z.</p>
        <p class="text-sm text-gray-500">${new Date().toDateString()}</p>
      </div>
      <!-- COMENTARIO -->
      <p class="text-gray-500">
        ${comentario}
      </p>
      <div class="flex justify-between">
        <div class="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg">
          <button onclick="incrementar(this)" class="text-purple-400 font-semibold cursor-pointer">
            +
          </button>
          <span class="text-purple-500 font-semibold">0</span>
          <button onclick="decrementar(this)" class="text-purple-400 font-semibold cursor-pointer">
            -
          </button>
        </div>
        <button class="flex items-center gap-2 text-purple-500 font-semibold">
          <img src="./images/icon-reply.svg" alt="" />
          Reply
        </button>
      </div>
    </div>`

}


// vamos a escuchar el evento del teclado
// input: es un evento que se dispara cada vez que el usuario escribe
commentBox.addEventListener("input", function (event) {
  // event.target.value: es el texto que estamos escribiendo dentro
  // del textarea
  if (event.target.value.trim() !== "") {
    errorText.classList.add("hidden")
    commentBox.classList.remove("border-red-500")
  } else {
    // cuando eliminamos el texto del textarea
    commentBox.classList.add("border-red-500")
    errorText.classList.remove("hidden")
  }
})


// Los formulario tiene el evento submit
// vamos a escuchar el evento submit (exclusivo de los formularios)
formularioComentario.addEventListener("submit", function (event) {
  // los formulario tienen un comportamiento
  // el comportamiento por defecto debe evitarse
  // el event que es un parametro (evento) preventDefault()
  event.preventDefault();
  // La forma en la que vamos a obtener la data del Formulario es usando la clase FormData
  // FormData(): Es una clase de JS que nos permite poder obtener la data de un formulario
  // cuando queremos invocar a una clase usamos la palabra reservada `new`
  // new en programacion se lo conoce como instanciar una clase
  const formData = new FormData(formularioComentario)
  // podemos buscar los valores de los inputs usando el name
  // queremos buscar la data del textarea que tiene el name "comment"
  const comentario = formData.get("comment")
  // Antes de ejecutar la funcion que crea el card haremos algunas validaciones
  if (comentario.trim() === "") {
    commentBox.classList.add("border-red-500")
    errorText.classList.remove("hidden")
    // Este return es para que no se ejecute la siguiente linea
    return
  }
  // Luego de obtener el comentario del formulario vamos a llamar a la funcion
  // que se encarga de generar el HTML para el card
  createCommentCard(comentario)
  // Limpiar el formulario
  formularioComentario.reset()
});