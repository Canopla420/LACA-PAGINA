import { useState } from "react";
import Image from "next/image";

export default function Hero({ images = ["/hero1.png", "/hero2.png"] }) {
  const [idx, setIdx] = useState(0);

  function prev() {
    setIdx((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIdx((i) => (i + 1) % images.length);
  }

  const src = images[idx];

  return (
    <section className="relative w-full max-w-full bg-white overflow-hidden overflow-x-hidden">
      <div className="relative w-full max-w-full h-64 md:h-96 max-h-[60vh] md:max-h-[80vh]">
        <Image
          src={src}
          alt={`Hero ${idx + 1}`}
          fill
          priority={idx === 0}
          className="object-contain object-center w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1600px"
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
