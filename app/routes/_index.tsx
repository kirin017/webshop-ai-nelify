import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";



// Types
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type Testimonial = {
  id: string;
  name: string;
  comment: string;
  rating: number;
};

// Mock data loader - In a real app, you'd fetch from a database or API
export async function loader() {
  const products: Product[] = [
    { 
      id: "1", 
      name: "Minimal Chair", 
      price: 259, 
      image: '/images/GV-REB5800_180.png', 
      category: "furniture" 
    },
    { 
      id: "2", 
      name: "Simple Table", 
      price: 399, 
      image: '/images/GV-REB5800_180.png', 
      category: "furniture" 
    },
    { 
      id: "3", 
      name: "Hanging Lamp", 
      price: 149, 
      image: '/images/GV-REB5800_180.png', 
      category: "lighting" 
    },
    { 
      id: "4", 
      name: "Wooden Shelf", 
      price: 199, 
      image: '/images/GV-REB5800_180.png', 
      category: "storage" 
    },
    { 
      id: "5", 
      name: "Ceramic Vase", 
      price: 89, 
      image: '/images/GV-REB5800_180.png', 
      category: "decor" 
    },
    { 
      id: "6", 
      name: "Cotton Throw", 
      price: 69, 
      image: '/images/GV-REB5800_180.png', 
      category: "textiles" 
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Alex M.",
      comment: "Beautiful minimal design that perfectly complements my home. The quality is outstanding.",
      rating: 5
    },
    {
      id: "2",
      name: "Sarah K.",
      comment: "Incredible attention to detail. The pieces feel timeless and well-crafted.",
      rating: 5
    },
    {
      id: "3",
      name: "Thomas J.",
      comment: "Fast shipping and the product looks even better in person than in the photos.",
      rating: 4
    }
  ];

  const categories = [
    { id: "furniture", name: "Furniture" },
    { id: "lighting", name: "Lighting" },
    { id: "textiles", name: "Textiles" },
    { id: "decor", name: "Decor" }
  ];

  return json({ products, testimonials, categories });
}

export default function Index() {
  const { products, testimonials, categories } = useLoaderData<typeof loader>();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
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
            {/* <h1 className="text-4xl font-medium text-white mb-4">
              New Arrivals – Minimal Design, Maximum Comfort
            </h1>
            <p className="text-white text-lg mb-8">
              Timeless pieces for the modern home
            </p> */}
            <a 
              href="/shop" 
              className="inline-block bg-white text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-100 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-medium text-neutral-900 mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={`/shop/${category.id}`} 
              className="group relative h-64 bg-neutral-100 overflow-hidden"
            >
              <img 
                src={'/images/GV-REB5800_180.png'} 
                alt={category.name} 
                className="w-full aspect-[4/3] object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <div className="w-full p-4 bg-white bg-opacity-90">
                  <h3 className="text-lg font-medium text-neutral-900">{category.name}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <h2 className="text-2xl font-medium text-neutral-900 mb-8">New Arrivals</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {newArrivals.map((product) => (
      <div 
        key={product.id}

        className="group"
      >
        <div className="block relative aspect-square bg-neutral-100 mb-4 overflow-hidden">
          <img 
            src={product.image} 
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
                    src={product.image} 
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

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-medium text-neutral-900 mb-8">What Our Customers Say</h2>
        <div className="bg-neutral-50 p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                <svg key={i} className="h-6 w-6 text-amber-500 inline-block" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {/* <p className="text-xl italic text-neutral-700 mb-6">"{testimonials[currentTestimonial].comment}"</p> */}
            <p className="font-medium">— {testimonials[currentTestimonial].name}</p>
            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 rounded-full ${index === currentTestimonial ? 'bg-neutral-800' : 'bg-neutral-300'}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-medium mb-4">Join Our Newsletter</h2>
          <p className="mb-6 max-w-lg mx-auto">Be the first to know about new collections and exclusive offers.</p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 text-neutral-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-white text-neutral-900 px-6 py-3 font-medium hover:bg-neutral-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}