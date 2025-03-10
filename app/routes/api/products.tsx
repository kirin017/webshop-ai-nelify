import { prisma } from "~/db.server";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));

  if (!name || !price) {
    return { error: "Thiếu thông tin sản phẩm" };
  }

  const product = await prisma.product.create({
    data: { name, price, stock: 0 },
  });

  return { success: true, product };
};
