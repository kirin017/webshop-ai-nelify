import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";

// Loader to fetch data from the database
export async function loader() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      price: true,
      category: {
        select: {
          name: true,
        },
      },
      images: {
        select: {
          imageUrl: true,
        },
        take: 1,
      },
    },
  });

  return json({ products });
}

export default function Index() {
  const { products } = useLoaderData<typeof loader>();
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-neutral-100">
        <div className="absolute inset-0">
          <img 
            src='/images/hero.png'
            alt="Featured collection" 
            className="max-w-full max-h-screen w-auto h-auto mx-auto object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-30"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-md">
            <a 
              href="/shop" 
              className="inline-block bg-white text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-100 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-medium text-neutral-900 mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <div key={product.id} className="group">
              <div className="block relative aspect-square bg-neutral-100 mb-4 overflow-hidden">
                <img 
                  src={product.images[0]?.imageUrl || '/images/placeholder.png'} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-medium text-neutral-900">{product.name}</h3>
              <p className="text-neutral-600">${product.price}</p>
              <button className="mt-2 px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-medium text-neutral-900 mb-8">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white">
                <a href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                  <img 
                    src={product.images[0]?.imageUrl || '/images/placeholder.png'} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </a>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-neutral-900">{product.name}</h3>
                  <p className="text-neutral-600">${product.price}</p>
                  <button className="mt-2 px-4 py-2 border border-neutral-900 text-neutral-900 text-sm hover:bg-neutral-900 hover:text-white transition-colors">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}