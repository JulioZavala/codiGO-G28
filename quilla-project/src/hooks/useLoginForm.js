import { validateLogin } from "@/lib/auth";
import useUserStore from "@/stores/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router";

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

  return {
    values,
    handleInputChange,
    handleSubmit,
  };
}
