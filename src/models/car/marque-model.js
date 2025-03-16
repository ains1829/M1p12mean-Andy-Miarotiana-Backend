const mongoose = require("mongoose");

// Définition du schéma pour les modèles
const modelSchema = new mongoose.Schema({
  modelName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

// Définition du schéma pour la marque
const brandSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      unique: true,
    },
    models: [modelSchema], // Array des modèles associés à cette marque
  },
  { timestamps: true }
);

// Création des modèles
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
