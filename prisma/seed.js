const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const restaurants = [
  { name: "Pizzaria Napoli", category: "Pizza", rating: 4.8 },
  { name: "Burger House", category: "Burger", rating: 4.7 },
  { name: "Sushi House", category: "Sushi", rating: 4.9 },
  { name: "Green Bowl", category: "Saudável", rating: 4.5 },
  { name: "Forno a Lenha", category: "Pizza", rating: 4.4 },
  { name: "Smash Burger", category: "Burger", rating: 4.6 },
  { name: "Tokyo Roll", category: "Sushi", rating: 4.3 },
  { name: "Fit Kitchen", category: "Saudável", rating: 4.2 }
];

async function main() {
  if ((await prisma.restaurant.count()) > 0) {
    console.log("Banco já possui restaurantes. Seed ignorado.");
    return;
  }
  await prisma.restaurant.createMany({ data: restaurants });
  console.log(`${restaurants.length} restaurantes cadastrados.`);
}

main().finally(() => prisma.$disconnect());
