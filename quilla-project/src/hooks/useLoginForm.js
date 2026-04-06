import { useState } from "react";


export function useLoginForm() {
  
  

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };







  return {
    values,
    handleInputChange,


  };
}
