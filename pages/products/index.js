import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import productsData from "../../data/products.json";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import CartDrawer from "../../components/CartDrawer";

export default function ProductsPage() {
  const router = useRouter();
  const { category: categoryQuery } = router.query;

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("laca_cart");
    if (raw) setCart(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("laca_cart", JSON.stringify(cart));
  }, [cart]);

  function normalizeString(str) {
    return str
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
      .trim();
  }

  useEffect(() => {
    const q = normalizeString(searchInput || "");
    if (!q || q.length < 2) {
      const t = setTimeout(() => setSearch(""), 250);
      return () => clearTimeout(t);
    }
    const handler = setTimeout(() => setSearch(q), 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const products = productsData;

  const filtered = useMemo(() => {
    let list = products;
    if (categoryQuery) {
      list = list.filter((p) => p.categoryKey === categoryQuery);
    }
    if (search) {
      const q = search;
      list = list.filter((p) => {
        const name = normalizeString(p.name || "");
        const desc = normalizeString(p.description || "");
        return name.includes(q) || desc.includes(q);
      });
    }
    return list;
  }, [products, categoryQuery, search]);

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

  return (
    <div>
      <Head>
        <title>Catálogo - LACA Beauty</title>
      </Head>

      <Header cartCount={cartCount()} onOpenCart={() => setCartOpen(true)} searchValue={searchInput} onSearchChange={setSearchInput} />

      <main className="container py-8">
        <section className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Catálogo completo</h1>
          <div className="text-sm text-gray-600">{categoryQuery ? `Filtrando: ${categoryQuery}` : "Todos los productos"}</div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} products={products} cart={cart} setCart={setCart} waNumber={""} />
    </div>
  );
}
