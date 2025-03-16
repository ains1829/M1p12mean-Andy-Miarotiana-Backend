const mongoose = require("mongoose");

const quotationDetailSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
  partName: { type: String, required: true },
  quantite: {
    type: Number,
    required: true,
  },
  provider: {
    type: String,
    enum: ["Client", "Garage"],
    required: true,
  },
  price: { type: Number, required: true },
});

const repairsub_categorie = new mongoose.Schema({
  subcategoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategoryname: {
    type: String,
    required: true,
  },
  estimatedtime: {
    type: Number,
    required: true,
  },
  estimatedprice: {
    type: Number,
    required: true,
  },
  nbrepair: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  complexity: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
});

const QuoteSchema = new mongoose.Schema(
  {
    problemid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemReport",
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    type: {
      type: String,
      enum: ["Estimatif", "Physique"],
      required: true,
    },
    items: [quotationDetailSchema],
    repair: [repairsub_categorie],
    totalprice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "En Attente M",
        "Valide M",
        "En Attente Cl",
        "Valide Cl",
        "Refu Cl",
      ],
      default: "En Attente M",
      required: true,
    },
    datequote: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", QuoteSchema);
