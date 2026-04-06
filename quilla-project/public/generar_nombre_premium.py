import os
from pathlib import Path

def generar_nombre_premium(ruta_local):
    path = Path(ruta_local)
    # Extraemos partes de la carpeta: 'morral', 'modelo01-beige'
    categoria = path.parts[-3] # morral
    variante = path.parts[-2]  # modelo01-beige
    
    # Extraemos el número final del archivo (el "_1")
    index = path.stem.split('_')[-1] 
    
    # Construimos el nombre final: morral-modelo01-beige-1
    nuevo_nombre = f"{categoria}-{variante}-{index}".lower()
    return nuevo_nombre

# Prueba con tu ruta
ruta = r"producto\mujer\accesorios\morral\modelo01-beige\P010406BWAI4000_1.jpg"
print(f"Subiendo como: {generar_nombre_premium(ruta)}")
# Resultado: morral-modelo01-beige-1