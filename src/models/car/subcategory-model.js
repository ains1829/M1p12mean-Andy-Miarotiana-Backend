const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    categoryname: {
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
  },
  { timestamps: true }
);
const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
