const prisma = require("../../shared/prisma");
const { AppError } = require("../../shared/errors");

async function list(userId) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { restaurant: true },
    orderBy: { createdAt: "desc" }
  });
  return favorites.map((f) => f.restaurant);
}

async function add(userId, restaurantId) {
  const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
  if (!restaurant) throw new AppError(404, "Restaurante não encontrado");

  // upsert: favoritar duas vezes não gera duplicata nem erro.
  await prisma.favorite.upsert({
    where: { userId_restaurantId: { userId, restaurantId } },
    update: {},
    create: { userId, restaurantId }
  });
  return restaurant;
}

async function remove(userId, restaurantId) {
  await prisma.favorite.deleteMany({ where: { userId, restaurantId } });
}

module.exports = { list, add, remove };
