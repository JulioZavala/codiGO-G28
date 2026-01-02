import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function calculatePrice(price, discountStr) {
  if (!discountStr) return { final: price, hasDiscount: false };

  // Convertimos "15%" a 0.15
  const discountDecimal = parseFloat(discountStr) / 100;
  const finalPrice = price - price * discountDecimal;

  return { final: finalPrice, hasDiscount: true };
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(amount);
}
