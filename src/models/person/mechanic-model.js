const mongoose = require("mongoose");

// Définition du schéma pour les mécaniciens
const mechanicSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
    skills: [
      {
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category", // Référence à un modèle de catégorie (assumons qu'il y ait un modèle Category)
          required: true,
        },
        namecategory: { type: String, required: true },
      },
    ],
    salary: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence au modèle User pour associer un utilisateur
      required: true,
    },
  },
  { timestamps: true }
);

// Création du modèle pour les mécaniciens
const Mechanic = mongoose.model("Mechanic", mechanicSchema);

module.exports = Mechanic;
