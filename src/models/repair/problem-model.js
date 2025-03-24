const mongoose = require("mongoose");

const ProblemReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence à l'utilisateur qui soumet le problème
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car", // Référence au véhicule concerné
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProblemReport", ProblemReportSchema);
