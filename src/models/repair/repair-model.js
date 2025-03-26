const mongoose = require("mongoose");

const mechanicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  skills: [
    {
      categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    },
  ],
});

const repair_progression = new mongoose.Schema({
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sub",
    required: true,
  },
  subcategoryname: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "in-progress"],
    default: "in-progress",
    required: true,
  },
  subacategorystartdate: { type: Date, default: null },
  subacategoryenddate: { type: Date, default: null },
});

const repairSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemReport",
      required: true,
    },
    carid: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    nameuser: { type: String, required: true },
    repairstartdate: { type: Date, default: null },
    repairenddate: { type: Date, default: null },
    final_status: {
      type: String,
      enum: ["completed", "in-progress"],
      default: "in-progress",
      required: true,
    },
    status_creneaux: {
      type: String,
      enum: ["creneaux att", "creneaux dispo", "en reparation"],
      default: "creneaux att",
    },
    repairCost: { type: Number, required: true },
    repair: [repair_progression],
    mechanics: [mechanicSchema],
  },
  { timestamps: true }
);

const Repair = mongoose.model("Repair", repairSchema);

module.exports = Repair;
