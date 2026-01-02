import { useState, useEffect } from "react";

export function useScrollThreshold(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Si el scroll vertical es mayor al umbral (10px), cambia el estado
      const isPastThreshold = window.scrollY > threshold;
      if (isPastThreshold !== scrolled) {
        setScrolled(isPastThreshold);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check inicial por si se recarga la página ya scrolleada
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, threshold]);

  return scrolled;
}