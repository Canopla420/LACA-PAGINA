import Head from "next/head";
import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";
import Hero from "../components/Hero";

const WA_NUMBER = ""; // Poner número en formato internacional sin +, p.ej. 595XXXXXXXX

export default function HomePage() {
  const [products] = useState(productsData);
  // Entrada controlada (instantánea) y búsqueda normalizada con debounce para filtrar
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Normaliza: pasar a minúsculas, quitar acentos y recortar espacios
  function normalizeString(str) {
    return str
      .normalize("NFD") // separar acentos
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .trim();
  }

  // Debounce en la entrada de búsqueda para que sea menos sensible
  useEffect(() => {
    const q = normalizeString(searchInput || "");
    // si la consulta es corta, limpiar la búsqueda (requerir al menos 2 caracteres)
    if (!q || q.length < 2) {
      const t = setTimeout(() => setSearch(""), 250);
      return () => clearTimeout(t);
    }
    const handler = setTimeout(() => setSearch(q), 400);
    return () => clearTimeout(handler);
  }, [searchInput]);
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
    <>
      <Head>
        <title>LACA Beauty</title>
      </Head>
      <Header
        cartCount={cartCount()}
        onOpenCart={() => setCartOpen(true)}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
      />

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
          <div className="mb-4">
            {search && (
              <p className="text-sm text-gray-600">
                Resultados para: "{search}"
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((p) => {
                if (!search) return true;
                const q = search; // ya está normalizada
                const name = normalizeString(p.name || "");
                const desc = normalizeString(p.description || "");
                return name.includes(q) || desc.includes(q);
              })
              .map((p) => (
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

      {/* Sección Contacto (al final) */}
      <section id="contacto" className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold">Contacto</h2>
        <p className="mt-2 text-gray-600">Elegí una red para escribirnos.</p>

        <div className="mt-8 flex items-center gap-6">
          <a
            href="https://www.instagram.com/laca.esperanza/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="group inline-flex items-center justify-center w-14 h-14 rounded-full text-gray-700 transition-transform transition-shadow duration-200 ease-out hover:scale-110 hover:shadow-lg hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
              <path
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M17.5 6.5h.01"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </a>

          <a
            href="https://www.facebook.com/lacaesperanza/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            title="Facebook"
            className="group inline-flex items-center justify-center w-14 h-14 rounded-full text-gray-700 transition-transform transition-shadow duration-200 ease-out hover:scale-110 hover:shadow-lg hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path d="M13.5 22v-8h2.8l.4-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6h1.6V4.9c-.3 0-1.4-.1-2.6-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.4v3H10v8h3.5z" />
            </svg>
          </a>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            title="WhatsApp"
            className="group inline-flex items-center justify-center w-14 h-14 rounded-full text-gray-700 transition-transform transition-shadow duration-200 ease-out hover:scale-110 hover:shadow-lg hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
              <path
                d="M20 11.5a8.5 8.5 0 0 1-12.9 7.3L4 20l1.3-3A8.5 8.5 0 1 1 20 11.5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M9.4 8.8c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.5 2.4 3.7 3.3 1.8.8 2.2.6 2.6.6.4-.1 1.3-.5 1.5-1 .2-.5.2-1 0-1.1-.2-.1-1.3-.6-1.6-.7-.3-.1-.5-.1-.7.1-.2.2-.8 1-.9 1.1-.2.1-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.8-1.3-1.8-1.4-2.1-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5l-.6-1.5z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
