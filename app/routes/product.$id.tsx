import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { prisma } from "~/db.server";
import { Decimal } from "@prisma/client/runtime/library";
import { ProductImage, Review } from "@prisma/client";

// Type definitions
type ProductDetail = {
  id: number;
  name?: string;
  description?: string | null;
  price: Decimal | number;
  stock: number;
  categoryId?: number | null;
  images?: ProductImage[];
  createdAt: Date;
  category?: {
    id: number;
    name: string;
  } | null;
  reviews?: (Review & {
    user?: {
      id: number;
      name: string;
    } | null;
  })[];
};

type LoaderData = {
  product: ProductDetail;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const productId = parseInt(params.id as string, 10);
  
  if (isNaN(productId)) {
    throw new Response("ID sản phẩm không hợp lệ", { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
      images: true,
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) {
    throw new Response("Không tìm thấy sản phẩm", { status: 404 });
  }

  return json<LoaderData>({ product });
};

// Component for displaying star ratings
const StarRating = ({ rating, size = "h-5 w-5" }: { rating: number, size?: string }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i}
          className={`${size} ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Product Images Gallery Component
const ProductGallery = ({ images, productName }: { images: ProductImage[], productName?: string }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gray-200 rounded-lg">
        <p className="text-gray-500">Không có hình ảnh</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-hidden rounded-lg bg-gray-100">
      <img 
        src={images[activeImageIndex]?.imageUrl} 
        alt={productName} 
        className="w-full h-64 md:h-96 object-contain p-4"
      />
      
      {images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto p-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`w-16 h-16 overflow-hidden rounded cursor-pointer focus:outline-none ${
                activeImageIndex === index ? 'border-2 border-blue-500' : 'border border-gray-200'
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img 
                src={image.imageUrl} 
                alt={`${productName} - ảnh ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Product Info Component
const ProductInfo = ({ 
  product, 
  averageRating,
  onAddToCart 
}: { 
  product: ProductDetail,
  averageRating: number,
  onAddToCart: (quantity: number) => void
}) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };
  
  const formatPrice = (price: Decimal | number) => {
    return typeof price === 'number' 
      ? price.toLocaleString() 
      : parseFloat(price.toString()).toLocaleString();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      
      {product.category && (
        <div className="mt-2">
          <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
            {product.category.name}
          </span>
        </div>
      )}
      
      <div className="mt-4 flex items-center">
        <StarRating rating={averageRating} />
        <span className="ml-2 text-gray-600 text-sm">
          {product.reviews?.length || 0} đánh giá
        </span>
      </div>
      
      <div className="mt-4">
        <span className="text-2xl font-bold text-blue-600">
          {formatPrice(product.price)} VND
        </span>
      </div>
      
      <div className="mt-6 space-y-6">
        <p className="text-gray-700">
          {product.description || 'Không có mô tả cho sản phẩm này.'}
        </p>
        
        <div className="border-t border-b py-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Trạng thái:</span>
            {product.stock > 0 ? (
              <span className="text-green-600">Còn hàng ({product.stock} sản phẩm)</span>
            ) : (
              <span className="text-red-600">Hết hàng</span>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-700 font-medium">Danh mục:</span>
            <span className="text-gray-600">{product.category?.name || 'Chưa phân loại'}</span>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-700 font-medium">Ngày thêm:</span>
            <span className="text-gray-600">{new Date(product.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
        
        {product.stock > 0 && (
          <div className="flex items-center">
            <div className="flex items-center border rounded overflow-hidden">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                disabled={quantity <= 1}
                aria-label="Giảm số lượng"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                disabled={quantity >= product.stock}
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>
            
            <button 
              onClick={() => onAddToCart(quantity)}
              className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition duration-200"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Customer Reviews Component
const CustomerReviews = ({ reviews }: { reviews: ProductDetail['reviews'] }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">Chưa có đánh giá nào.</p>;
  }
  
  return (
    <div className="space-y-8">
      {reviews.map(review => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-center mb-2">
            <StarRating rating={review.rating || 0} size="h-4 w-4" />
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            Bởi {review.user?.name || 'Khách hàng ẩn danh'} - 
            {new Date(review.createdAt).toLocaleDateString('vi-VN')}
          </p>
          
          {review.comment && (
            <p className="text-gray-700">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default function ProductDetail() {
  const { product } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  // Calculate average rating
  const averageRating = product.reviews?.length 
    ? product.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / product.reviews.length 
    : 0;

  // Handle add to cart
  const addToCart = async (quantity: number) => {
    try {
      // Here we would add actual cart logic with API calls
      console.log(`Đang thêm ${quantity} sản phẩm ${product.id} vào giỏ hàng`);
      
      // Success notification - in a real app, use a toast notification
      alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation breadcrumbs could be added here */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Gallery */}
        {product.images && (
          <ProductGallery images={product.images} productName={product.name} />
        )}
        
        {/* Product Information */}
        <ProductInfo 
          product={product} 
          averageRating={averageRating}
          onAddToCart={addToCart}
        />
      </div>
      
      {/* Customer Reviews */}
      <div className="mt-16 flexjustify-end">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ khách hàng</h2>
        <CustomerReviews reviews={product.reviews} />
      </div>
      
      {/* Back Button */}
      <div className="mt-10 flex justify-end">
  <button
    onClick={() => navigate("/products")}
    className="flex items-center text-blue-600 hover:underline transition duration-200 justify-end"
  >
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
    </svg>
    Quay lại danh sách sản phẩm
  </button>
</div>
      </div>

  );
}