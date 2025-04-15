const mongoose = require("mongoose");

const RemorqueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence à l'utilisateur qui soumet le problème
    required: true,
  },
  nameuser: {
    type: String,
  },
  point_current: {
    type: String,
  },
  point_final: {
    type: String,
  },
  date_demande: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["en attente", "accepter", "completed"],
    default: "en attente",
  },
});

module.exports = mongoose.model("remorque", RemorqueSchema);
