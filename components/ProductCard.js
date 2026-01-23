import React from "react";
import Image from "next/image";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded shadow-sm p-4 flex flex-col">
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={240}
        className="w-full h-40 object-contain mb-3"
        sizes="(max-width: 640px) 100vw, 400px"
      />
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-sm text-gray-600 flex-1">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-semibold">
          {product.price.toLocaleString()} Gs
        </div>
        <button
          onClick={() => onAdd(product)}
          className="bg-pink-500 text-white px-3 py-1 rounded"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
