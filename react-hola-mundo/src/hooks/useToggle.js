import { useState } from "react";

function useToogle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  //  true - false
  // false - true
  const handleIsOpen = () => setIsOpen(!isOpen);

  return {
    isOpen,
    handleIsOpen,
  };
}

export default useToogle;