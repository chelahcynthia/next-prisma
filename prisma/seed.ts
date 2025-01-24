import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      full_name: "Test User",
      password_hash: "$2y$12$GBfcgD6XwaMferSOdYGiduw3Awuo95QAPhxFE0oNJ.Ds8qj3pzEZy",
      phone_number: "1234567890",
    },
  });

  console.log("Created user:", user);

  // Create a product
  const product = await prisma.product.create({
    data: {
      user_id: user.id,
      title: "Sample Product",
      description: "This is a sample product.",
      price: 1000,
      type: "pdf",
      status: "active",
      currency: "USD",
    },
  });

  console.log("Created product:", product);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });