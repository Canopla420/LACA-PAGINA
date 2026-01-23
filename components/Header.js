import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import categories from "../data/categories";

export default function Header({
  cartCount,
  onOpenCart,
  searchValue,
  onSearchChange,
}) {
  // categories imported from data/categories.js
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapperRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setMenuOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onEsc);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="LACA Beauty"
              width={160}
              height={64}
              className="h-20 md:h-16 w-auto"
              style={{ imageRendering: "auto" }}
            />
          </Link>
              {/* mobile menu button */}
              <button
                className="md:hidden p-2 rounded focus:outline-none"
                aria-label="Abrir menú"
                onClick={() => setMobileOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {/* Mobile drawer */}
          <div className={`md:hidden ${mobileOpen ? "block" : "hidden"}`}> 
            <div className="fixed inset-0 z-40">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileOpen(false)}
              />

              <aside className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-4 overflow-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold">Menú</div>
                  <button
                    aria-label="Cerrar menú"
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-4">
                  <label className="sr-only" htmlFor="mobile-search">Buscar productos</label>
                  <input
                    id="mobile-search"
                    type="search"
                    value={searchValue || ""}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full border rounded px-3 py-2 focus:outline-none"
                  />
                </div>

                <nav className="flex flex-col gap-3">
                  <Link href="/" onClick={() => setMobileOpen(false)}>Inicio</Link>

                  <div className="pt-2">
                    <div className="font-medium mb-2">Productos</div>
                    <div className="flex flex-col gap-1">
                      {categories.map((c) => (
                        <Link key={c.key} href={`/products/${c.key}`} className="text-sm" onClick={() => setMobileOpen(false)}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link href="#" onClick={() => setMobileOpen(false)}>Dónde comprar</Link>

                  <a href="/#contacto" onClick={() => setMobileOpen(false)}>Contacto</a>

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenCart && onOpenCart();
                    }}
                    className="mt-4 flex items-center gap-2"
                  >
                    <span>Carrito:</span>
                    <span className="font-semibold">{cartCount}</span>
                  </button>
                </nav>
              </aside>
            </div>
          </div>
          <Link href="/">Inicio</Link>
          <div
            className="relative"
            ref={wrapperRef}
            onMouseEnter={() => {
              if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
              }
              setMenuOpen(true);
            }}
            onMouseLeave={() => {
              // small delay to avoid accidental closure when moving between button and menu
              if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
              closeTimerRef.current = setTimeout(() => {
                setMenuOpen(false);
                closeTimerRef.current = null;
              }, 180);
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen((v) => !v);
              }}
              aria-expanded={menuOpen}
              className="flex items-center gap-2 focus:outline-none"
            >
              Productos
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Megamenú: aparece al pasar el mouse y muestra categorías en columnas; también abre por click/tap */}
            <div
              className={`absolute left-0 mt-2 w-screen max-w-4xl bg-white border-t border-b shadow-lg transform -translate-y-1 transition-all duration-150 z-50 ${
                menuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-4 gap-4">
                  {categories.map((c) => (
                    <div key={c.key} className="py-2">
                      <Link href={`/products/${c.key}`} className="text-sm hover:text-pink-600" onClick={() => setMenuOpen(false)}>
                        {c.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link href="#">Dónde comprar</Link>

          <a
            href="/#contacto"
            className="hover:text-pink-600"
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <label className="sr-only" htmlFor="site-search">
            Buscar productos
          </label>
          <input
            id="site-search"
            type="search"
            value={searchValue || ""}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Buscar productos..."
            className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="text-sm text-gray-700 flex items-center gap-2"
          >
            <span>Carrito:</span>
            <span className="font-semibold">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
