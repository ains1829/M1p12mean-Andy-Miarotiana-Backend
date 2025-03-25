const express = require("express");
const router = express.Router();
const Repair = require("../../models/repair/repair-model");

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

module.exports = router;
