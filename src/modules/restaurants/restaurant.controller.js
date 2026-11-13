const restaurantService = require("./restaurant.service");

async function list(req, res) {
  const restaurants = await restaurantService.list(req.query);
  res.json(restaurants);
}

async function create(req, res) {
  const restaurant = await restaurantService.create(req.body || {}, req.user);
  res.status(201).json(restaurant);
}

module.exports = { list, create };
