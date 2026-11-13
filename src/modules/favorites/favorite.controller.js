const favoriteService = require("./favorite.service");
const { AppError } = require("../../shared/errors");

function parseId(value) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) throw new AppError(400, "ID de restaurante inválido");
  return id;
}

async function list(req, res) {
  res.json(await favoriteService.list(req.user.id));
}

async function add(req, res) {
  const restaurant = await favoriteService.add(req.user.id, parseId(req.params.restaurantId));
  res.status(201).json(restaurant);
}

async function remove(req, res) {
  await favoriteService.remove(req.user.id, parseId(req.params.restaurantId));
  res.status(204).send();
}

module.exports = { list, add, remove };
