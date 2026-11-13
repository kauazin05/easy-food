const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./modules/auth/auth.routes");
const restaurantRoutes = require("./modules/restaurants/restaurant.routes");
const favoriteRoutes = require("./modules/favorites/favorite.routes");
const { errorHandler } = require("./shared/errors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/favorites", favoriteRoutes);

app.use((req, res) => res.status(404).json({ error: "Rota não encontrada" }));
app.use(errorHandler);

module.exports = app;
