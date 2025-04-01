const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    dateBegin: {
      type: Date,
    },
    dateFin: {
      type: Date,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const appointmentDateSchema = new mongoose.Schema(
  {
    idrepair: {
      type: String,
      required: true,
    },
    daterdv: {
      type: Date,
      default: Date.now,
    },
    appointments: [appointmentSchema],
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentDateSchema);

module.exports = Appointment;
