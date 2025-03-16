const mongoose = require("mongoose");

// Définition du schéma pour la catégorie
const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Création du modèle pour la catégorie
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
