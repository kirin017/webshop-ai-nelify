import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

// Types
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  images: string[];
  category: string;
  related: string[];
};

// Mock data loader - In a real app, you'd fetch from a database or API
export async function loader({ params }: LoaderFunctionArgs) {
  // In a real application, fetch the product from a database based on params.id
  const product: Product = {
    id: params.id || "1",
    name: "Minimal Chair",
    price: 259,
    description: "A beautifully crafted chair with clean lines and a comfortable design. Perfect for any modern living space.",
    details: [
      "Solid oak frame",
      "Natural linen upholstery",
      "Dimensions: 75cm x 65cm x 80cm",
      "Handcrafted in Europe",
      "Assembly required"
    ],
    images: [
      "/api/placeholder/800/1000",
      "/api/placeholder/800/1000",
      "/api/placeholder/800/1000"
    ],
    category: "furniture",
    related: ["2", "4", "6"]
  };

  const relatedProducts = [
    { 
      id: "2", 
      name: "Simple Table", 
      price: 399, 
      image: "/api/placeholder/500/600", 
      category: "furniture" 
    },
    { 
      id: "4", 
      name: "Wooden Shelf", 
      price: 199, 
      image: "/api/placeholder/500/600", 
      category: "storage" 
    },
    { 
      id: "6", 
      name: "Cotton Throw", 
      price: 69, 
      image: "/api/placeholder/500/600", 
      category: "textiles" 
    }
  ];

  return json({ product, relatedProducts });
}

export default function ProductDetail() {
  const { product, relatedProducts } = useLoaderData<typeof loader>();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="aspect-square bg-neutral-100 mb-4">
            <img 
              src={product.images[currentImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-20 h-20 ${index === currentImage ? 'ring-2 ring-neutral-900' : ''}`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-medium text-neutral-900 mb-2">{product.name}</h1>
          <p className="text-2xl text-neutral-900 mb-6">${product.price}</p>
          
          <p className="text-neutral-600 mb-8">{product.description}</p>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium text-neutral-900 mb-4">Details</h2>
            <ul className="space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-neutral-900 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8">
            <label htmlFor="quantity" className="block text-neutral-900 mb-2">Quantity</label>
            <div className="flex">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 bg-neutral-100 text-neutral-900"
              >
                -
              </button>
              <input 
                id="quantity"
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                className="w-16 p-2 text-center text-neutral-900 border border-neutral-200"
              />
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 bg-neutral-100 text-neutral-900"
              >
                +
              </button>
            </div>
          </div>
          
          <button className="w-full bg-neutral-900 text-white py-3 px-6 mb-4 hover:bg-neutral-800 transition-colors">
            Add to Cart
          </button>
          
          <button className="w-full border border-neutral-900 text-neutral-900 py-3 px-6 hover:bg-neutral-50 transition-colors">
            Save to Wishlist
          </button>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-24">
        <h2 className="text-2xl font-medium text-neutral-900 mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group">
              <a href={`/product/${product.id}`} className="block relative aspect-square bg-neutral-100 mb-4 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </a>
              <h3 className="text-lg font-medium text-neutral-900">{product.name}</h3>
              <p className="text-neutral-600">${product.price}</p>
              <button className="mt-2 px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}