//Importar el Hook useState
import { useState } from "react";

// Vamos a importar el componente Header
import Header from "./components/Header"; 
import Title from "./components/Title";
import Button from "./components/Button";

/**
 * Como crar un componente desde 0
 */

/**
 * 
 * El nombre de la funcion solo va en mayuscula cuando es un componente,
 * se que es un componente porque tiene la extension jsx y es una interfase
 */
function App() {
  // count: variable
  // setCount: funcion que actualiza la variable  
  const [count, setCount] = useState(0);
  // const direccion = useState("av siempre viva 123");
  // console.log(direccion);
  function handleAddCount() {
    setCount(count + 1);
  }
  // retorna un bloque de Html
  return (
    <section className="m-5">
      <Header />
      <div>
        <h2 className="text-2xl">Contador: {count}</h2>
        <button onClick={handleAddCount}>Agregar +1</button>
      </div>
      <div>
        <Title text="Hola mundo" size="h1" />
        <Title text="Me llamo Julio" size="h6"/>
        <Title text="Me llamo Julio" size="h5"/>
        <Title text="Me llamo Julio" size="h4"/>
        <Title text="Me llamo Julio" size="h3"/>
        <Title text="Me llamo Julio" size="h2"/>
        <br />
        <div className="flex gap-10 flex-col">
          <Button type="button" variant="primary" text="Boton primario" />
          <Button type="submit" variant="danger" text="Boton de peligro" />
          <Button type="reset" variant="warning" text="Boton de advertencia" />
          <Button variant="info" text="Boton informativo" />
          <Button text="Prueba" variant="danger" type="submit" />
        </div>
      </div>
    </section>
  );
}

export default App