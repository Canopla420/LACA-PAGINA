import { useState } from "react";

export default function Hero({ images = ["/hero1.svg", "/hero2.svg"] }) {
  const [idx, setIdx] = useState(0);

  function prev() {
    setIdx((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIdx((i) => (i + 1) % images.length);
  }

  return (
    <section className="relative w-full bg-white">
      <div className="relative w-full">
        <img
          src={images[idx]}
          alt={`Hero ${idx + 1}`}
          className="w-full h-64 md:h-96 object-cover bg-gray-100 block"
        />

        <button
          aria-label="previous"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow"
        >
          ‹
        </button>
        <button
          aria-label="next"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow"
        >
          ›
        </button>
      </div>
    </section>
  );
}
