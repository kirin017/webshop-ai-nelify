import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/db.server";
import { Decimal } from "@prisma/client/runtime/library";
import { ProductImage } from "@prisma/client";
// Định nghĩa kiểu dữ liệu cho sản phẩm (phù hợp với PostgreSQL)
type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: Decimal |number;
  stock: number;
  categoryId?: number | null;
  images?: ProductImage[] | undefined;
  createdAt: Date;
  category?: {
    id: number;
    name: string;
  } | null;
};

// Định nghĩa kiểu dữ liệu cho loaderData
type LoaderData = {
  products: Product[];
};

export const loader = async () => {
  // Lấy danh sách sản phẩm mới nhất từ database
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return json<LoaderData>({ products });
};

export default function Products() {
  const { products } = useLoaderData<LoaderData>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Danh sách sản phẩm</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">Chưa có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg">
              <Link to={`/products/${product.id}`}>


  <img
    src={"/images/GV-PTZ5810-IR_180.png"}
    alt={product.name}
    className="w-full h-40 object-cover mb-2 rounded-md"
  />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold">{product.price.toLocaleString()} VND</span>
                    {product.stock > 0 ? (
                      <span className="text-green-600 text-sm">Còn hàng</span>
                    ) : (
                      <span className="text-red-600 text-sm">Hết hàng</span>
                    )}
                  </div>
                  {product.category && (
                    <p className="text-gray-500 text-sm mt-1">Danh mục: {product.category.name}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
