const mongoose = require("mongoose");

const mechanicSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: String, default: "" },
  skills: [
    {
      categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
      namecategory: String,
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
    ref: "SubCategory",
    required: true,
  },
  subcategoryname: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "in-progress", "en attente"],
    default: "en attente",
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
    quoteid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
      required: true,
    },
    nameuser: { type: String, required: true },
    problemid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemReport",
      required: true,
    },
    description_problem: {
      type: String,
      required: true,
    },
    carid: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
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
    estimationtime: {
      type: Number,
      required: true,
    },
    repairstartdate: { type: Date, default: null },
    repairenddate: { type: Date, default: null },
    repairenddateestimated: { type: Date, default: null },
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
