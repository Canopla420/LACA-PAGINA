import Head from "next/head";
import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";
import Hero from "../components/Hero";

const WA_NUMBER = ""; // Poner número en formato internacional sin +, p.ej. 595XXXXXXXX

export default function Home() {
  const [products] = useState(productsData);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("laca_cart");
    if (raw) setCart(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("laca_cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const next = { ...prev };
      next[product.id] = (next[product.id] || 0) + 1;
      return next;
    });
  }

  function cartCount() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }

  function buildOrderMessage() {
    const lines = ["Pedido desde LACA Beauty:"];
    let total = 0;
    for (const id of Object.keys(cart)) {
      const qty = cart[id];
      const p = products.find((x) => x.id === id);
      if (!p) continue;
      const subtotal = p.price * qty;
      total += subtotal;
      lines.push(`${p.name} x ${qty} — ${subtotal.toLocaleString()} Gs`);
    }
    lines.push("Total: " + total.toLocaleString() + " Gs");
    lines.push("\nDatos del cliente: Nombre, dirección, teléfono");
    return encodeURIComponent(lines.join("\n"));
  }

  function openWhatsApp() {
    const text = buildOrderMessage();
    const base = WA_NUMBER
      ? `https://wa.me/${WA_NUMBER}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(base, "_blank");
  }

  return (
    <div>
      <Head>
        <title>LACA Beauty</title>
      </Head>
      <Header cartCount={cartCount()} onOpenCart={() => setCartOpen(true)} />

      <Hero />

      <main className="container py-8">
        <section className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Catálogo</h1>
          <div>
            <button
              onClick={openWhatsApp}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Pedir por WhatsApp
            </button>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        products={products}
        cart={cart}
        setCart={setCart}
        waNumber={WA_NUMBER}
      />
    </div>
  );
}
