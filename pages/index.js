import Head from "next/head";
import { useEffect, useState, useRef } from "react";
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

  // Toast para avisos rápidos (producto agregado)
  const [toast, setToast] = useState({ visible: false, message: "su producto se agrego al carrito correctamente" });
  const toastTimer = useRef(null);

  function showToast(message) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, message });
    toastTimer.current = setTimeout(() => {
      setToast({ visible: false, message: "" });
      toastTimer.current = null;
    }, 2500);
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Componente interno para toast con animación de entrada (estilo "llega un mensaje")
  function ToastBox({ message }) {
    const [enter, setEnter] = useState(false);
    useEffect(() => {
      // pequeña delay para forzar el frame inicial y activar la transición
      const t = setTimeout(() => setEnter(true), 10);
      return () => clearTimeout(t);
    }, []);

    return (
      <div className="fixed right-4 bottom-6 z-50 pointer-events-none">
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-auto max-w-xs w-full bg-white text-black px-4 py-2 rounded shadow-lg border border-gray-200 transform transition-all duration-300 ease-out ${
            enter
              ? "opacity-100 translate-y-0 translate-x-0 scale-100"
              : "opacity-0 translate-y-4 translate-x-6 scale-95"
          }`}
        >
          {message}
        </div>
      </div>
    );
  }

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
    // Mostrar aviso cuando se agrega un producto
    showToast(`"${product.name}" agregado al carrito`);
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

      {/* Toast simple bottom-right (animado) */}
      {toast.visible && <ToastBox message={toast.message} />}

      
    </>
  );
}
