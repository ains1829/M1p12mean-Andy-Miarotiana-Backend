const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./src/config/mongo-config");
const dotenv = require("dotenv");
const personRoutes = require("./src/routes/auth/personRoute");
const clientRoutes = require("./src/routes/clients/clientRoutes");
const managerRoutes = require("./src/routes/manager/managerRoutes");
const mecanoRoutes = require("./src/routes/mecano/mecanoRoutes");
dotenv.config();
const corsOptions = {
  origin: ["http://localhost:4200"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
mongoose();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/auth", personRoutes);
app.use("/client", clientRoutes);
app.use("/manager", managerRoutes);
app.use("/mecano", mecanoRoutes);
app.get("/test", (req, res) => {
  res.json({ message: "Nouvelle version déployée automatiquement 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
);
