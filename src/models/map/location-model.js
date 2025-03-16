const mongoose = require("mongoose");

// Schéma pour la localisation
const locationSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { timestamps: true }
);

// Création du modèle pour la localisation
const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
