const mongoose = require("mongoose");

// Schéma pour une transaction
const transactionSchema = new mongoose.Schema(
  {
    transactionType: {
      type: String,
      required: true,
      enum: ["Achat", "Vente"], // Spécifiez les types possibles (Achat ou Vente)
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Création du modèle pour la transaction
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
