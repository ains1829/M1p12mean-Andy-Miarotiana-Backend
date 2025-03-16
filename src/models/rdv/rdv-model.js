const mongoose = require("mongoose");

// Schéma pour un rendez-vous
const appointmentSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Référence au modèle User
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      enum: [
        "8h00",
        "9h00",
        "10h00",
        "11h00",
        "13h00",
        "14h00",
        "15h00",
        "16h00",
        "17h00",
        "18h00",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentDateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      set: (value) => {
        return new Date(value.setHours(0, 0, 0, 0));
      },
    },
    appointments: [appointmentSchema], // Tableau des rendez-vous pour cette date
  },
  { timestamps: true }
);

// Création du modèle pour la gestion des rendez-vous
const Appointment = mongoose.model("Appointment", appointmentDateSchema);

module.exports = Appointment;
