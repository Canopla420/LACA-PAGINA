import Link from "next/link";

export default function Header({
  cartCount,
  onOpenCart,
  searchValue,
  onSearchChange,
}) {
  const categories = [
    { key: "destacados-temporada", label: "Destacados de la temporada" },
    { key: "lanzamientos-temporada", label: "Lanzamientos de la temporada" },
    { key: "nuevo-envase", label: "Nuevo envase" },
    { key: "coleccion-temporada", label: "Colección de la temporada" },
    { key: "fragancias", label: "Fragancias" },
    { key: "linea-sensorial", label: "Línea sensorial" },
    { key: "corporales", label: "Corporales" },
    { key: "antiage", label: "Antiage" },
    { key: "cuidados-basicos", label: "Cuidados básicos" },
    { key: "pieles-delicadas", label: "Pieles delicadas" },
    { key: "pieles-grasas", label: "Pieles grasas" },
    { key: "linea-teens", label: "Línea teens" },
    { key: "renovacion-celular", label: "Renovación celular" },
    { key: "color", label: "Color / Maquillaje" },
    { key: "cuidados-capilares", label: "Cuidados capilares" },
    { key: "manos-pies", label: "Manos y pies" },
    { key: "humectacion", label: "Humectación / Hidratación" },
    { key: "cuidados-masculinos", label: "Cuidados masculinos" },
    { key: "cejas-pestanas", label: "Cejas y pestañas" },
    { key: "proteccion-solar", label: "Protección solar" },
    { key: "mascarillas", label: "Mascarillas" },
    { key: "exfoliantes", label: "Exfoliantes" },
  ];
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <img
              src="/logo.svg"
              alt="LACA Beauty"
              className="h-20 md:h-16 w-auto"
              style={{ imageRendering: "auto" }}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#">Inicio</Link>
          <div className="relative group">
            <Link href="/products" className="flex items-center gap-2 focus:outline-none">
              Productos
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            {/* Megamenú: aparece al pasar el mouse y muestra categorías en columnas */}
            <div className="absolute left-0 mt-2 w-screen max-w-4xl bg-white border-t border-b shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transform -translate-y-1 group-hover:translate-y-0 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto z-50">
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-4 gap-4">
                  {categories.map((c) => (
                    <div key={c.key} className="py-2">
                      <Link href={`/products?category=${c.key}`} className="text-sm hover:text-pink-600">
                        {c.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link href="#">Dónde comprar</Link>
          <Link href="#">Contacto</Link>
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
