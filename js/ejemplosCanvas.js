function leerDB (tareaFinal) {
  //leer una DB estudiantes
  //demora un tiempo
  setTimeout(function () {
    console.log("estudiante encontrado");
    tareaFinal()
  }, 4000)
}

leerDB(function () {
  console.log("yo estoy despues de leerDB");
});


const bakeCake = () => {
  return new Promise((resolve, reject) => {
    //irá nuestra operacion asíncrona
    setTimeout(() => {
      resolve("Torta horneada")
      reject("Error en el Horneado")
    },3000)
  })
}

const prepareChocolate = () => {
  return new Promise((resolve, reject) => {
    //irá nuestra operacion asíncrona
    setTimeout(() => {
      resolve("Glaseado Listo")
      reject("Error en el glaseado")
    }, 3000)
  })
}

bakeCake()
  .then((res) => {
    console.log(res)
    //podemos retornar una nueva Promesa para hacer encadenamiento de promesas
    return prepareChocolate()
  })
  .then((res2) => {
    console.log(res2)
  })
//reject
  .catch((error) => {
  console.error(error)
})




const bakeCake = async () => {
      // return = resolve
      return ("Torta horneada")
      // throw = reject
      throw("Error en el Horneado")
}

const getCake = async () => {
  try {
    const res = await bakeCake()
    console.log(res)
  } catch (err){
    console.log(`Error: ${err}`)
  }
}

getCake()



