const express = require("express");
const router = express.Router();
const Part = require("../../models/part/parts-model");
const ProblemReport = require("../../models/repair/problem-model");
const Quote = require("../../models/repair/quote-model");
const Car = require("../../models/car/car-model");
const SubCategory = require("../../models/car/subcategory-model");
const {
  getPriceParts,
  getPriceRepair,
} = require("../../services/repair/quote-service");
const Repair = require("../../models/repair/repair-model");

async function findDocumentById(model, id, errorMessage) {
  const document = await model.findById(id);
  if (!document) throw new Error(errorMessage);
  return document;
}

async function findDocumentsByIds(model, ids, errorMessage) {
  const documents = await model.find({ _id: { $in: ids } });
  if (documents.length !== ids.length) throw new Error(errorMessage);
  return documents;
}

function extractIds(items, key) {
  return items.map((item) => item[key].toString());
}

function calculateTotalPrice(repairSubcategories, parts) {
  return getPriceRepair(repairSubcategories) + getPriceParts(parts);
}
router.post("/begin_subcategory", async (req, res) => {
  const { id_repair, id_subcategory } = req.body;
  // mbola mila miampy oe izay category any ihany no ataony
  try {
    const repair = await Repair.findById(id_repair);
    if (!repair) {
      throw new Error("Réparation introuvable !");
    }
    await repair.updateOne(
      { "repair.subcategory": id_subcategory },
      { $set: { "repair.subacategorystartdate": new Date(Date.now()) } }
    );
    return res.json({ success: true, message: "Reparation terminer" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});
router.post("/end_subcategory", async (req, res) => {
  const { id_repair, id_subcategory } = req.body;
  // mbola mila miampy oe izay category any ihany no ataony
  try {
    const repair = await Repair.findById(id_repair);
    if (!repair) {
      throw new Error("Réparation introuvable !");
    }
    await repair.updateOne(
      { "repair.subcategory": id_subcategory },
      { $set: { "repair.subacategoryenddate": new Date(Date.now()) } }
    );
    const checkReparationsIsalereadyFinish = await Repair.findOne({
      $expr: { $not: { $in: [null, "$repair.subacategoryenddate"] } },
    });
    if (checkReparationsIsalereadyFinish) {
      repair.final_status = "completed";
      await repair.save();
    }
    return res.json({ success: true, message: "Reparation terminer" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/final_devis", async (req, res) => {
  const { id_devis, items, repair_subacategory } = req.body;
  try {
    const Devis = await Quote.findById(id_devis);
    const partIds = extractIds(items, "partId");
    const parts = await findDocumentsByIds(
      Part,
      partIds,
      "Some parts do not exist"
    );
    const subcategoryIds = extractIds(repair_subacategory, "subcategoryid");
    await findDocumentsByIds(
      SubCategory,
      subcategoryIds,
      "Some reparation do not exist"
    );
    const totalprice = calculateTotalPrice(repair_subacategory, parts);
    Devis.items = parts;
    Devis.repair = repair_subacategory;
    Devis.totalprice = totalprice;
    Devis.type = "Physique";
    Devis.status = "En Attente M";
    await Devis.save();
    res.json({ succes: true, message: "devis final succes" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
});

router.post("/give_devis", async (req, res) => {
  try {
    const { problemId, userId, carId, type, items, repair_subacategory } =
      req.body;
    await findDocumentById(ProblemReport, problemId, "Problem not found");
    await findDocumentById(Car, carId, "Car not found");
    const partIds = extractIds(items, "partId");
    const parts = await findDocumentsByIds(
      Part,
      partIds,
      "Some parts do not exist"
    );
    const subcategoryIds = extractIds(repair_subacategory, "subcategoryid");
    await findDocumentsByIds(
      SubCategory,
      subcategoryIds,
      "Some reparation do not exist"
    );
    const totalprice = calculateTotalPrice(repair_subacategory, parts);
    const quote = new Quote({
      problemid: problemId,
      userid: userId,
      carid: carId,
      type,
      items: parts,
      repair: repair_subacategory,
      totalprice,
    });
    await quote.save();
    return res.json({ success: true, devis: quote });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
});

module.exports = router;
