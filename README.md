# LACA Beauty — Sitio MVP

Proyecto inicial (MVP) para la tienda de LACA Beauty.

Características incluidas:

- Next.js + Tailwind CSS scaffold
- Página Home con listado de productos (datos de ejemplo en `data/products.json`)
- Página de producto simple
- Carrito cliente en localStorage
- Botón "Pedir por WhatsApp" que genera un mensaje con el resumen del carrito

Cómo usar (PowerShell / Windows):

1. Instalar dependencias

```powershell
cd "c:\Users\Win11-x64\Desktop\Laca-Pagina"
npm install
```

2. Ejecutar en modo desarrollo

```powershell
npm run dev
# Abrir http://localhost:3000
```

3. Personalizar

- Reemplaza los productos en `data/products.json`.
- Añade imágenes en `public/` y actualiza las rutas.
- En el código, busca la constante `WA_NUMBER` y pon el número de WhatsApp en formato internacional (sin +): p. ej. `595XXXXXXXX`.

Notas:

- Este es un scaffold inicial pensado para un MVP (pedidos por WhatsApp). Si quieres integrar pagos con tarjeta o un carrito avanzado, lo dejamos para la siguiente fase.
