import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">LACA Beauty</h3>
          <p className="text-sm text-gray-300">Cosmética natural y profesional para el día a día.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Enlaces</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/">Inicio</Link>
            <Link href="/products">Productos</Link>
            <Link href="/products">Categorías</Link>
            <Link href="#contacto">Contacto</Link>
          </nav>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Soporte</h4>
          <p className="text-sm text-gray-300">Preguntas frecuentes · Envíos · Devoluciones</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contacto</h4>
          <address className="not-italic text-sm text-gray-300 space-y-2">
            <div>Tel: <a href="tel:+595981234567" className="text-pink-300">********</a></div>
            <div>Email: <a href="mailto:info@laca.com.py" className="text-pink-300">********</a></div>
            <div id="contacto">Dirección: ********</div>
            <div className="pt-2">
              <a href="https://wa.me/595981234567" target="_blank" rel="noreferrer" className="inline-block bg-green-500 text-white px-3 py-1 rounded">WhatsApp</a>
            </div>
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-center gap-6">
        <a href="https://www.instagram.com/laca.esperanza/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-200 hover:text-pink-400">
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="2" />
            <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" stroke="currentColor" strokeWidth="2" />
            <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </a>

        <a href="https://www.facebook.com/lacaesperanza/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-gray-200 hover:text-blue-400">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M13.5 22v-8h2.8l.4-3h-3.2V9.1c0-.9.3-1.6 1.7-1.6h1.6V4.9c-.3 0-1.4-.1-2.6-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.4v3H10v8h3.5z" />
          </svg>
        </a>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-between">
          <div>© {new Date().getFullYear()} LACA Beauty. Todos los derechos reservados.</div>
          <div className="mt-2 sm:mt-0">Diseño profesional · Política de privacidad</div>
        </div>
      </div>
    </footer>
  );
}
