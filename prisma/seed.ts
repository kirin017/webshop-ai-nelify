import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Tạo admin user
  const admin = await prisma.user.create({
    data: {
      fullName: "Admin User",
      email: "admin@example.com",
      password: "hashed_password",
      role: "ADMIN",
    },
  });

  // Tạo category
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      description: "Electronic products",
    },
  });

  // Tạo product
  const product = await prisma.product.create({
    data: {
      name: "Laptop",
      description: "A high-performance laptop",
      price: 1200.99,
      stock: 50,
      categoryId: electronics.id,
    },
  });

  console.log({ admin, electronics, product });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
