import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from "./styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" }
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-inter bg-neutral-50 text-neutral-900">
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="font-semibold text-xl text-neutral-800">MINIMAL</Link>
              <div className="hidden md:flex ml-10 space-x-8">
                <Link to="/" className="text-neutral-600 hover:text-neutral-900">Home</Link>
                <Link to="/shop" className="text-neutral-600 hover:text-neutral-900">Shop</Link>
                <Link to="/about" className="text-neutral-600 hover:text-neutral-900">About</Link>
                <Link to="/contact" className="text-neutral-600 hover:text-neutral-900">Contact</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-neutral-600 hover:text-neutral-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
              <Link to="/login" className="text-neutral-600 hover:text-neutral-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
        <footer className="bg-white mt-16 border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-medium text-neutral-900 mb-4">About</h3>
                <p className="text-neutral-600 text-sm">Minimal is a modern e-commerce store focused on high-quality, sustainable products with timeless design.</p>
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-4">Shop</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/shop/new-arrivals" className="text-neutral-600 hover:text-neutral-900">New Arrivals</Link></li>
                  <li><Link to="/shop/bestsellers" className="text-neutral-600 hover:text-neutral-900">Bestsellers</Link></li>
                  <li><Link to="/shop/sale" className="text-neutral-600 hover:text-neutral-900">Sale</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-4">Help</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/faq" className="text-neutral-600 hover:text-neutral-900">FAQ</Link></li>
                  <li><Link to="/shipping" className="text-neutral-600 hover:text-neutral-900">Shipping & Returns</Link></li>
                  <li><Link to="/contact" className="text-neutral-600 hover:text-neutral-900">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-4">Connect</h3>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-neutral-200 text-sm text-neutral-500">
              <p>© 2025 Minimal. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}