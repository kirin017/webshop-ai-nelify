export interface OutletContextType {
    featuredProducts: Product[]; // Kiểu dữ liệu tùy vào cấu trúc của bạn
    addToCart: (product: Product) => void;
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
  }
  

export interface LoaderDataType {
    featuredProducts: Product[];
    promotions: Promotion[];
  }
  
  interface Promotion {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
}