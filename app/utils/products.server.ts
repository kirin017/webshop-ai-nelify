import data from "../../data/products.json";
import { distance } from "@energetic-ai/embeddings";

export type ProductShort = {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
};

export function getAllProducts(): ProductShort[] {
  const products = [];
  for (const key of Object.keys(data)) {
    const { id, title, category, price, image } = (data as any)[key];
    products.push({ id, title, category, price, image });
  }
  return products;
}

