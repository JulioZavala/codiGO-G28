import { validateLogin } from "@/lib/auth";
import useUserStore from "@/stores/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getUsers } from "@/services/api";

export function useLoginForm() {
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await validateLogin(values.email, values.password);
    if (!response.ok) {
      return;
    }
    setUser(response.user);

    // redirect /
    navigate("/");
  };

  const login = async (email, password) => {
    // 1: Traer a todos los usuarios
    const { data: users } = await getUsers();
    
    // 2: Buscar el usuario por email
    const user = users.find((u) => u.email === email); // si no encuentra un email find retorna undefined

    // 3: si el usuario no existe
    if (!user)
      return {
        success: false,
        message: "Usuario y/o password incorrectos",
      };

    // 4: si el usuario existe, entonce verificar el password
    if (password !== user.password)
      return {
        success: false,
        message: "Usuario y/o password incorrectos",
      };

    // 5: si el usuario existe y el password es correcto

    return {
      success: true,
      user,
    };
  };

  return {
    values,
    handleInputChange,
    handleSubmit,
    login,
  };
}
