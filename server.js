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
  origin: function (origin, callback) {
    callback(null, true); // Accepte toutes les origines
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ajout de OPTIONS
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: true, // Permet l'utilisation des cookies et des tokens
};
mongoose();
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use("/auth", personRoutes);
app.use("/client", clientRoutes);
app.use("/manager", managerRoutes);
app.use("/mecano", mecanoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
);
