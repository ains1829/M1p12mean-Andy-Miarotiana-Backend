const mongoose = require("mongoose");

// Définition du schéma pour la voiture
const carSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence au modèle User
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand", // Référence au modèle Brand
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    modelId: {
      type: String, // Stocke l'ID du modèle sous forme de chaîne (extrait du tableau `models`)
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    chassisNumber: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    imageVoiture: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

// Création du modèle pour la voiture
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
