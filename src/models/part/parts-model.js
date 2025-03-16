const mongoose = require("mongoose");

const partSchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
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
    partName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Création du modèle pour la pièce
const Part = mongoose.model("Part", partSchema);

module.exports = Part;
