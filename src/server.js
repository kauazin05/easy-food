require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EasyFood rodando na porta ${PORT} -> http://localhost:${PORT}`);
});
