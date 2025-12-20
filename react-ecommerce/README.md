# 🛒 React E-commerce

Aplicación de comercio electrónico moderna desarrollada con React, Vite y TailwindCSS. Este proyecto implementa un sistema completo de carrito de compras con autenticación, gestión de estado global y una interfaz de usuario moderna.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Documentación de Carpetas](#-documentación-de-carpetas)

## ✨ Características

- 🛍️ Catálogo de productos con búsqueda
- 🛒 Carrito de compras persistente
- 🔐 Sistema de autenticación
- 📱 Diseño responsive
- 🎨 UI moderna con componentes reutilizables
- 💾 Gestión de estado global con Zustand
- 🔔 Notificaciones toast
- 🎯 Rutas protegidas

## 🚀 Tecnologías

### Core

- **React 19.2.0** - Biblioteca de UI
- **Vite 7.2.4** - Build tool y dev server
- **React Router 7.10.1** - Enrutamiento

### Gestión de Estado

- **Zustand 5.0.9** - State management global

### Estilos

- **TailwindCSS 4.1.18** - Framework CSS utility-first
- **Radix UI** - Componentes accesibles y sin estilos
- **Lucide React** - Iconos

### Utilidades

- **clsx & tailwind-merge** - Gestión de clases CSS
- **crypto-hash** - Hashing para autenticación
- **sonner** - Sistema de notificaciones toast

## 📁 Estructura del Proyecto

```
react-ecommerce/
│
├── public/                      # Archivos estáticos
│   └── vite.svg                # Logo de Vite
│
├── src/                        # Código fuente principal
│   ├── assets/                 # Recursos estáticos (imágenes, etc.)
│   │   └── react.svg
│   │
│   ├── components/             # Componentes React
│   │   ├── ui/                # Componentes de UI reutilizables
│   │   │   ├── breadcrumb.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── checkbox.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── dropdown-menu.jsx
│   │   │   ├── field.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── separator.jsx
│   │   │   ├── sheet.jsx
│   │   │   ├── sidebar.jsx
│   │   │   ├── skeleton.jsx
│   │   │   ├── sonner.jsx
│   │   │   └── tooltip.jsx
│   │   │
│   │   ├── app-content.jsx    # Contenedor principal de la app
│   │   ├── app-sidebar.jsx    # Barra lateral de navegación
│   │   ├── login-form.jsx     # Formulario de inicio de sesión
│   │   ├── product-card.jsx   # Tarjeta de producto individual
│   │   ├── products.jsx       # Lista de productos
│   │   ├── protected-route.jsx # HOC para rutas protegidas
│   │   ├── search-form.jsx    # Formulario de búsqueda
│   │   ├── selection-quantity.jsx # Selector de cantidad
│   │   └── version-switcher.jsx   # Selector de versión
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   └── use-mobile.js      # Hook para detectar dispositivos móviles
│   │
│   ├── lib/                    # Utilidades y helpers
│   │   ├── auth.js            # Funciones de autenticación
│   │   └── utils.js           # Funciones utilitarias
│   │
│   ├── pages/                  # Páginas de la aplicación
│   │   ├── Home/
│   │   │   └── Home.jsx       # Página principal con productos
│   │   ├── Login/
│   │   │   └── Login.jsx      # Página de inicio de sesión
│   │   └── Summary/
│   │       └── Summary.jsx    # Página de resumen del carrito
│   │
│   ├── router/                 # Configuración de rutas
│   │   └── Router.jsx         # Definición de rutas de la app
│   │
│   ├── services/               # Servicios externos
│   │   └── api.js             # Llamadas a API
│   │
│   ├── stores/                 # Stores de Zustand
│   │   ├── useCartStore.js    # Store del carrito de compras
│   │   └── useStore.js        # Store general de la aplicación
│   │
│   ├── App.jsx                 # Componente raíz de la aplicación
│   ├── main.jsx               # Punto de entrada de React
│   └── index.css              # Estilos globales y configuración de Tailwind
│
├── .gitignore                  # Archivos ignorados por Git
├── components.json             # Configuración de componentes UI
├── eslint.config.js           # Configuración de ESLint
├── index.html                 # HTML principal
├── jsconfig.json              # Configuración de JavaScript
├── package.json               # Dependencias y scripts
├── package-lock.json          # Lock de dependencias
├── vite.config.js             # Configuración de Vite
└── README.md                  # Este archivo
```

## 📚 Documentación de Carpetas

### 📂 `/src/components`

Contiene todos los componentes React de la aplicación, divididos en:

#### `/src/components/ui`

Componentes de interfaz de usuario reutilizables basados en Radix UI y estilizados con TailwindCSS. Estos componentes son la base del sistema de diseño:

- **button.jsx**: Botones con diferentes variantes (primary, secondary, outline, etc.)
- **card.jsx**: Contenedores de contenido con estilos consistentes
- **dialog.jsx**: Modales y diálogos
- **input.jsx**: Campos de entrada de texto
- **sidebar.jsx**: Componente de barra lateral
- **sonner.jsx**: Sistema de notificaciones toast
- Y más componentes primitivos de UI

#### Componentes de Negocio

- **product-card.jsx**: Muestra la información de un producto (imagen, nombre, precio, stock) y permite agregarlo al carrito
- **products.jsx**: Lista de productos con funcionalidad de búsqueda
- **selection-quantity.jsx**: Control para incrementar/decrementar cantidad de productos
- **search-form.jsx**: Formulario de búsqueda de productos
- **login-form.jsx**: Formulario de autenticación de usuarios
- **protected-route.jsx**: Componente HOC que protege rutas requiriendo autenticación
- **app-sidebar.jsx**: Barra lateral con navegación y carrito
- **app-content.jsx**: Contenedor principal del contenido de la aplicación

### 📂 `/src/pages`

Páginas principales de la aplicación organizadas por funcionalidad:

- **Home/Home.jsx**: Página principal que muestra el catálogo de productos
- **Login/Login.jsx**: Página de inicio de sesión
- **Summary/Summary.jsx**: Página de resumen del carrito con detalles de compra

### 📂 `/src/stores`

Gestión de estado global usando Zustand:

- **useCartStore.js**:
  - Maneja el estado del carrito de compras
  - Funciones: `addItem`, `removeItem`, `updateQuantity`, `addQuantity`, `reduceQuantity`, `getTotal`, `getTotalItem`, `getItem`
  - Persistencia en localStorage mediante middleware `persist`
- **useStore.js**: Store general para otros estados de la aplicación

### 📂 `/src/services`

Capa de servicios para comunicación con APIs:

- **api.js**: Funciones para realizar peticiones HTTP a servicios externos (obtener productos, autenticación, etc.)

### 📂 `/src/router`

Configuración del enrutamiento:

- **Router.jsx**: Define las rutas de la aplicación usando React Router
  - `/` - Home (protegida)
  - `/summary` - Resumen del carrito (protegida)
  - `/login` - Inicio de sesión (pública)

### 📂 `/src/lib`

Funciones utilitarias y helpers:

- **auth.js**: Funciones de autenticación (login, logout, verificación de sesión)
- **utils.js**: Funciones utilitarias generales (ej: `cn()` para combinar clases CSS)

### 📂 `/src/hooks`

Custom React Hooks:

- **use-mobile.js**: Hook para detectar si el usuario está en un dispositivo móvil

### 📂 `/src/assets`

Recursos estáticos como imágenes, iconos y otros archivos multimedia

## 🔧 Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd react-ecommerce
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

4. **Abrir en el navegador**

```
http://localhost:5173
```

## 📜 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la build de producción
npm run lint     # Ejecuta ESLint para verificar el código
```

## 🔐 Autenticación

El sistema de autenticación utiliza:

- Hash de contraseñas con `crypto-hash`
- Almacenamiento de sesión en localStorage
- Rutas protegidas mediante el componente `ProtectedRoute`

## 🛒 Funcionalidades del Carrito

- ✅ Agregar productos al carrito
- ✅ Incrementar/decrementar cantidad
- ✅ Eliminar productos
- ✅ Cálculo automático de totales
- ✅ Validación de stock
- ✅ Persistencia en localStorage
- ✅ Notificaciones de acciones

## 📱 Responsive Design

La aplicación está completamente optimizada para:

- 📱 Dispositivos móviles
- 💻 Tablets
- 🖥️ Desktop

## 📐 Guía de Estilo y Convenciones

Esta sección describe las reglas y convenciones que seguimos en el proyecto para mantener un código consistente y fácil de mantener.

### 🎨 Componentes React (`.jsx`)

#### Convenciones de Nomenclatura

- **Archivos**: Usar `kebab-case` (minúsculas con guiones)

  - ✅ `product-card.jsx`
  - ✅ `selection-quantity.jsx`
  - ❌ `ProductCard.jsx`
  - ❌ `selectionQuantity.jsx`

- **Funciones/Componentes**: Usar `PascalCase`
  - ✅ `function ProductCard() { ... }`
  - ✅ `function SelectionQuantity() { ... }`

#### Estructura de un Componente

```jsx
// 1. Imports de librerías externas
import { useState, useEffect } from "react";

// 2. Imports de stores/hooks personalizados
import useCartStore from "@/stores/useCartStore";

// 3. Imports de componentes
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";

// 4. Definición del componente
function ProductCard({ product }) {
  // 5. Hooks de estado y stores
  const { addItem, getItem } = useCartStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  // 6. Funciones auxiliares
  const handleAddToCart = () => {
    addItem(product);
  };

  // 7. useEffect (si es necesario)
  useEffect(() => {
    // lógica de efecto
  }, []);

  // 8. Return con JSX
  return (
    <Card>
      <CardHeader>
        <img src={product.image} alt={product.name} />
      </CardHeader>
      <CardContent>
        <h4>{product.name}</h4>
        <p>S/ {product.price}</p>
        <Button onClick={handleAddToCart}>Agregar al carrito</Button>
      </CardContent>
    </Card>
  );
}

// 9. Export default al final
export default ProductCard;
```

#### Reglas Importantes

- ✅ Siempre usar `export default` al final del archivo
- ✅ Usar alias `@/` para imports absolutos
- ✅ Destructurar props en los parámetros de la función
- ✅ Comentar secciones complejas del código
- ✅ Mantener componentes pequeños y enfocados en una sola responsabilidad

### 🪝 Custom Hooks (`.js`)

#### Convenciones de Nomenclatura

- **Archivos**: Usar `kebab-case` con prefijo `use-`

  - ✅ `use-mobile.js`
  - ✅ `use-products.js`
  - ❌ `useMobile.js`
  - ❌ `mobile-hook.js`

- **Funciones**: Usar `camelCase` con prefijo `use`
  - ✅ `export function useIsMobile() { ... }`
  - ✅ `export function useProducts() { ... }`

#### Estructura de un Hook

```javascript
// 1. Imports
import * as React from "react";
import { useState, useEffect } from "react";

// 2. Constantes (si es necesario)
const MOBILE_BREAKPOINT = 768;

// 3. Definición del hook
export function useIsMobile() {
  // 4. Estados
  const [isMobile, setIsMobile] = useState(undefined);

  // 5. Efectos
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // 6. Cleanup
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // 7. Return del valor
  return !!isMobile;
}
```

#### Reglas Importantes

- ✅ Siempre usar `export` en la declaración de la función
- ✅ Los hooks deben empezar con `use`
- ✅ Retornar valores útiles (estados, funciones, objetos)
- ✅ Incluir cleanup en useEffect cuando sea necesario
- ✅ Documentar con comentarios el propósito del hook

### 📄 Pages (`.jsx`)

#### Convenciones de Nomenclatura

- **Carpetas**: Usar `PascalCase`

  - ✅ `Home/`
  - ✅ `Login/`
  - ✅ `Summary/`

- **Archivos**: Mismo nombre que la carpeta
  - ✅ `Home/Home.jsx`
  - ✅ `Login/Login.jsx`

#### Estructura de una Page

```jsx
// 1. Imports de React
import { useEffect, useState } from "react";

// 2. Imports de servicios
import { getProducts } from "@/services/api";

// 3. Imports de componentes
import Products from "@/components/products";
import AppContent from "@/components/app-content";

// 4. Definición de la página
function Home() {
  // 5. Estados
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 6. Funciones de manejo de datos
  const handleGetProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 7. useEffect para carga inicial
  useEffect(() => {
    handleGetProducts();
  }, []);

  // 8. Return con estructura de la página
  return (
    <div>
      <AppContent>
        <h1 className="text-2xl">Productos</h1>
        {isLoading ? <p>Cargando...</p> : <Products products={products} />}
      </AppContent>
    </div>
  );
}

// 9. Export default
export default Home;
```

#### Reglas Importantes

- ✅ Las páginas deben estar en su propia carpeta
- ✅ Manejar estados de carga y error
- ✅ Usar try-catch para operaciones asíncronas
- ✅ Mantener la lógica de negocio en servicios/stores
- ✅ Las páginas solo deben orquestar componentes

### 🔌 Services (`.js`)

#### Convenciones de Nomenclatura

- **Archivos**: Usar `kebab-case` o nombre descriptivo

  - ✅ `api.js`
  - ✅ `product-service.js`

- **Funciones**: Usar `camelCase` con verbos descriptivos
  - ✅ `getProducts()`
  - ✅ `createUser()`
  - ✅ `updateProduct()`

#### Estructura de un Service

```javascript
// 1. Documentación del servicio
/**
 * Servicio de API para el e-commerce
 * Recursos disponibles:
 * - products
 * - users
 */

// 2. Constantes de configuración
const BASE_URL = "https://693b88c49b80ba7262cd8e30.mockapi.io";

// 3. Funciones de servicio (una por recurso/acción)

/**
 * Obtiene todos los productos
 * @returns {Promise<Array>} Lista de productos
 */
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  const data = await response.json();
  return data;
}

/**
 * Obtiene un producto por ID
 * @param {string} id - ID del producto
 * @returns {Promise<Object>} Producto encontrado
 */
export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  const data = await response.json();
  return data;
}

/**
 * Obtiene todos los usuarios
 * @returns {Promise<Array>} Lista de usuarios
 */
export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
}
```

#### Reglas Importantes

- ✅ Usar `export async function` para cada función
- ✅ Documentar cada función con JSDoc
- ✅ Mantener constantes de configuración al inicio
- ✅ Usar nombres descriptivos que indiquen la acción (get, create, update, delete)
- ✅ Retornar siempre los datos procesados
- ✅ Agrupar funciones relacionadas en el mismo archivo

### 🗄️ Stores (Zustand) (`.js`)

#### Convenciones de Nomenclatura

- **Archivos**: Usar `camelCase` con prefijo `use` y sufijo `Store`

  - ✅ `useCartStore.js`
  - ✅ `useUserStore.js`
  - ❌ `cart-store.js`

- **Store**: Mismo nombre que el archivo
  - ✅ `const useCartStore = create(...)`

#### Estructura de un Store

```javascript
// 1. Imports
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

// 2. Definición del store
const useCartStore = create(
  // 3. Middleware (si es necesario)
  persist(
    // 4. Función del store
    (set, get) => ({
      // 5. Estado inicial
      items: [],
      total: 0,

      // 6. Acciones/Métodos (con comentarios descriptivos)

      // Agregar un producto al carrito
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          toast.success(`${product.name} agregado al carrito`);
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      // Eliminar un producto del carrito
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      // Obtener el total del carrito
      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Obtener un item específico
      getItem: (productId) => {
        const { items } = get();
        return items.find((item) => item.id === productId);
      },
    }),
    // 7. Configuración del middleware
    {
      name: "cart-storage", // nombre en localStorage
    }
  )
);

// 8. Export default
export default useCartStore;
```

#### Reglas Importantes

- ✅ Usar `create` de Zustand
- ✅ Usar `persist` middleware para datos que deben guardarse
- ✅ Comentar cada acción/método
- ✅ Usar `set` para modificar el estado
- ✅ Usar `get` para leer el estado actual dentro de métodos
- ✅ Mantener el estado inmutable (usar spread operator)
- ✅ Nombrar el storage de forma descriptiva
- ✅ Agrupar métodos relacionados

### 🎯 Reglas Generales del Proyecto

#### Imports

```javascript
// ✅ Usar alias @ para rutas absolutas
import useCartStore from "@/stores/useCartStore";
import { Button } from "@/components/ui/button";

// ❌ Evitar rutas relativas largas
import useCartStore from "../../stores/useCartStore";
```

#### Estilos con TailwindCSS

```jsx
// ✅ Usar clases de Tailwind directamente
<div className="flex items-center justify-between p-4">

// ✅ Usar el helper cn() para clases condicionales
<Button className={cn("w-full", isActive && "bg-blue-500")}>

// ❌ Evitar estilos inline
<div style={{ display: "flex", padding: "16px" }}>
```

#### Manejo de Errores

```javascript
// ✅ Siempre usar try-catch en operaciones asíncronas
try {
  const data = await getProducts();
  setProducts(data);
} catch (error) {
  console.error("Error:", error);
  toast.error("Error al cargar productos");
}
```

#### Comentarios

```javascript
// ✅ Comentar la intención, no lo obvio
// Buscar si el producto ya existe en el carrito
const existingItem = items.find((item) => item.id === productId);

// ❌ Evitar comentarios redundantes
// Crear una variable llamada existingItem
const existingItem = items.find((item) => item.id === productId);
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del curso Código G28.

---

Desarrollado con ❤️ usando React + Vite