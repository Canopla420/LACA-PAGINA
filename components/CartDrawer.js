import React from "react";

export default function CartDrawer({
  open,
  onClose,
  products,
  cart,
  setCart,
  waNumber,
}) {
  if (!open) return null;

  const items = Object.keys(cart)
    .map((id) => {
      const p = products.find((x) => x.id === id);
      return { ...p, qty: cart[id] };
    })
    .filter(Boolean);

  function increase(id) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function decrease(id) {
    setCart((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] || 0) - 1);
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  function remove(id) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  const total = items.reduce((s, it) => s + it.qty * it.price, 0);

  function buildOrderMessage() {
    const lines = ["Pedido desde LACA Beauty:"];
    items.forEach((it) => {
      lines.push(
        `${it.name} x ${it.qty} — ${(it.qty * it.price).toLocaleString()} Gs`
      );
    });
    lines.push("Total: " + total.toLocaleString() + " Gs");
    lines.push("\nDatos del cliente: Nombre, dirección, teléfono");
    return encodeURIComponent(lines.join("\n"));
  }

  function openWhatsApp() {
    const text = buildOrderMessage();
    const base = waNumber
      ? `https://wa.me/${waNumber}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(base, "_blank");
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <aside className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Tu carrito</h2>
          <button onClick={onClose} className="text-gray-600">
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {items.length === 0 && (
            <div className="text-sm text-gray-600">Tu carrito está vacío.</div>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-3 mb-3">
              <img
                src={it.image}
                alt={it.name}
                className="w-16 h-12 object-contain bg-gray-100 p-2 rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-600">
                  {it.price.toLocaleString()} Gs
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrease(it.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <div className="px-2">{it.qty}</div>
                  <button
                    onClick={() => increase(it.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => remove(it.id)}
                    className="ml-2 text-sm text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">Total</div>
            <div className="font-semibold">{total.toLocaleString()} Gs</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={openWhatsApp}
              className="flex-1 bg-green-500 text-white px-3 py-2 rounded"
            >
              Pedir por WhatsApp
            </button>
            <button onClick={onClose} className="bg-gray-100 px-3 py-2 rounded">
              Seguir comprando
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
