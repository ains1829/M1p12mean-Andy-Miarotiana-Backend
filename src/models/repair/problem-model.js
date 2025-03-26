const mongoose = require("mongoose");

const ProblemReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence à l'utilisateur qui soumet le problème
      required: true,
    },
    nameuser: {
      type: String,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car", // Référence au véhicule concerné
      required: true,
    },
    marquecar: {
      type: String,
      required: true,
    },
    modelcar: {
      type: String,
      required: true,
    },
    yearcar: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    datereportProblem: {
      type: Date,
      default: Date.now,
    },
    have_devis: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProblemReport", ProblemReportSchema);
