import Link from "next/link";

export default function Header({ cartCount, onOpenCart }) {
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
          <Link href="#">Productos</Link>
          <Link href="#">Dónde comprar</Link>
          <Link href="#">Contacto</Link>
        </nav>

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
