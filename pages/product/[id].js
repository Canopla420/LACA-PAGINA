import { useRouter } from "next/router";
import products from "../../data/products.json";
import Header from "../../components/Header";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div>
        <Header cartCount={0} />
        <main className="container py-8">Cargando...</main>
      </div>
    );
  }

  return (
    <div>
      <Header cartCount={0} />
      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain bg-white p-6 rounded"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              {product.price.toLocaleString()} Gs
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <div className="text-sm text-gray-600">Stock: {product.stock}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
