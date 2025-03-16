const mongoose = require("mongoose");

// Schéma pour le virement de salaire
const salaryPaymentSchema = new mongoose.Schema(
  {
    mechanicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mechanic",
      required: true,
    },
    salaryAmount: { type: Number, required: true }, // Montant du salaire payé
    paymentDate: { type: Date, required: true }, // Date du virement
    paymentMethod: {
      type: String,
      enum: ["Bank", "Cash", "Cheque"],
      required: true,
    },
  },
  { timestamps: true }
);

// Création du modèle pour le virement de salaire
const SalaryPayment = mongoose.model("SalaryPayment", salaryPaymentSchema);

module.exports = SalaryPayment;
