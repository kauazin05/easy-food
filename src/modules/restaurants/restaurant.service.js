const prisma = require("../../shared/prisma");
const emailService = require("../../shared/email.service");
const { AppError } = require("../../shared/errors");

async function list({ category, search } = {}) {
  const where = {};
  if (category && category !== "Todos") where.category = category;
  if (search) where.name = { contains: search };

  return prisma.restaurant.findMany({ where, orderBy: { id: "asc" } });
}

async function create({ name, category, rating, imageUrl }, owner) {
  if (!name || !String(name).trim() || !category) {
    throw new AppError(400, "name e category são obrigatórios");
  }
  const numericRating = Number(rating);
  if (Number.isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
    throw new AppError(400, "rating deve ser um número entre 0 e 5");
  }

  const restaurant = await prisma.restaurant.create({
    data: {
      name: String(name).trim(),
      category,
      rating: numericRating,
      imageUrl: imageUrl || null,
      ownerId: owner.id
    }
  });

  // Ação secundária: falha no e-mail não desfaz o cadastro do restaurante.
  try {
    await emailService.sendEmail({
      to: owner.email,
      subject: "Restaurante cadastrado na EasyFood",
      text: `O restaurante "${restaurant.name}" já está disponível no app.`
    });
  } catch (err) {
    console.warn("Falha ao enviar e-mail de confirmação:", err.message);
  }

  return restaurant;
}

module.exports = { list, create };
