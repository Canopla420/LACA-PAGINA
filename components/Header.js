import Link from "next/link";

export default function Header({ cartCount }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold text-pink-600">LACA Beauty</a>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-700">
            Carrito: <span className="font-semibold">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
