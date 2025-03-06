import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/db.server";
import { Decimal } from "@prisma/client/runtime/library";
import { ProductImage } from "@prisma/client";

// Định nghĩa kiểu dữ liệu
type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: Decimal | number;
  stock: number;
  categoryId?: number | null;
  images?: ProductImage[] | undefined;
  createdAt: Date;
  category?: {
    id: number;
    name: string;
  } | null;
};

type LoaderData = {
  products: Product[];
};

export const loader = async () => {
  const products = await prisma.product.findMany({
    include: { category: true,
      images: {
        select: {
           id: true, imageUrl: true, productId: true }
      },
     },
    orderBy: { createdAt: "desc" },
  });

  return json<LoaderData>({ products });
};

export default function Products() {
  const { products } = useLoaderData<LoaderData>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Danh sách sản phẩm</h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">Chưa có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <Link to={`/products/${product.id}`} className="block">
                {/* Hình ảnh */}
                <div className="w-full h-36 sm:h-40 bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.images?.[0]?.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Nội dung */}
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-gray-500 text-sm truncate">{product.description || "Không có mô tả"}</p>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold text-lg">{product.price.toLocaleString()} VND</span>
                    {product.stock > 0 ? (
                      <span className="text-green-500 text-xs font-medium bg-green-100 px-2 py-1 rounded-full">Còn hàng</span>
                    ) : (
                      <span className="text-red-500 text-xs font-medium bg-red-100 px-2 py-1 rounded-full">Hết hàng</span>
                    )}
                  </div>

                  {product.category && (
                    <p className="text-gray-500 text-xs mt-1">Danh mục: <span className="font-medium text-gray-700">{product.category.name}</span></p>
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
