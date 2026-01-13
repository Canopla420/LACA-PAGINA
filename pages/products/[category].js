import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import productsData from "../../data/products.json";
import categories from "../../data/categories";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import CartDrawer from "../../components/CartDrawer";

export default function CategoryPage({
  filteredProducts = [],
  allProducts = [],
  categoryKey = "",
  categoryLabel = "",
}) {
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

  const filtered = useMemo(() => {
    let list = filteredProducts || [];
    if (search) {
      const q = search;
      list = list.filter((p) => {
        const name = normalizeString(p.name || "");
        const desc = normalizeString(p.description || "");
        return name.includes(q) || desc.includes(q);
      });
    }
    return list;
  }, [filteredProducts, search]);

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
        <title>
          {categoryLabel
            ? `${categoryLabel} – LACA Beauty`
            : "Catálogo – LACA Beauty"}
        </title>
      </Head>

      <Header
        cartCount={cartCount()}
        onOpenCart={() => setCartOpen(true)}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
      />

      <main className="container py-8">
        <section className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{categoryLabel || "Categoría"}</h1>
          <div className="text-sm text-gray-600">
            {filtered.length} productos
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </main>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        products={allProducts}
        cart={cart}
        setCart={setCart}
        waNumber={""}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const cats = (await import("../../data/categories")).default || [];
  const paths = cats.map((c) => ({ params: { category: c.key } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const products = (await import("../../data/products.json")).default || [];
  const cats = (await import("../../data/categories")).default || [];
  const filtered = products.filter((p) => p.categoryKey === params.category);
  const label =
    cats.find((c) => c.key === params.category)?.label || params.category;
  return {
    props: {
      filteredProducts: filtered,
      allProducts: products,
      categoryKey: params.category,
      categoryLabel: label,
    },
  };
}
