const mongoose = require("mongoose");

// Définition du schéma pour les mouvements de stock
const stockMovementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Achat", "Vente", "Reperation"], // Exemples de types de mouvements (achat ou vente)
      required: true,
    },
    isOut: {
      type: Boolean,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    movementDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Définition du schéma pour le stock
const stockSchema = new mongoose.Schema(
  {
    partId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Part", // Référence au modèle Part
      required: true,
    },
    quantityIn: {
      type: Number,
      required: true,
    },
    quantityOut: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockMovements: [stockMovementSchema], // Tableau de mouvements de stock
  },
  { timestamps: true }
);

// Création du modèle pour le stock
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
