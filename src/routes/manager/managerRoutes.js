const express = require("express");
const Brand = require("../../models/car/marque-model");
const Category = require("../../models/car/category-model");
const Part = require("../../models/part/parts-model");
const SubCategory = require("../../models/car/subcategory-model");
const Quote = require("../../models/repair/quote-model");
const data_part = require("../../models/part/data/parts-data");
const data_subcategory = require("../../models/car/data/subCategory-data");
const Repair = require("../../models/repair/repair-model");
const User = require("../../models/person/users-model");
const ProblemReport = require("../../models/repair/problem-model");
const {
  checkMechanicsSkillsForMission,
} = require("../../services/repair/quote-service");
const router = express.Router();
router.post("/generate-brands", async (req, res) => {
  try {
    const electricBrands = [
      {
        brand: "Tesla",
        models: [
          { modelName: "Model S", year: 2024 },
          { modelName: "Model 3", year: 2024 },
        ],
      },
      {
        brand: "Lucid Motors",
        models: [
          { modelName: "Lucid Air", year: 2024 },
          { modelName: "Lucid Gravity", year: 2024 },
        ],
      },
      {
        brand: "Rivian",
        models: [
          { modelName: "R1T", year: 2024 },
          { modelName: "R1S", year: 2024 },
        ],
      },
    ];
    const datagenerer = await Brand.insertMany(electricBrands);
    res.json({
      succes: true,
      message: "Marques et modèles insérés avec succès",
      data: datagenerer,
    });
  } catch (error) {
    res.json({
      succes: false,
      error: "Erreur lors de l'insertion des marques",
    });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const repairCategories = [
      { category: "Vidange et entretien" },
      { category: "Freinage" },
      { category: "Pneumatiques" },
      { category: "Moteur et injection" },
      { category: "Électricité et batterie" },
      { category: "Climatisation et chauffage" },
      { category: "Transmission et embrayage" },
      { category: "Carrosserie et peinture" },
      { category: "Échappement et pollution" },
      { category: "Direction et suspension" },
    ];
    await Category.insertMany(repairCategories);
    res.json({ message: "Catégories insérées avec succès !" });
  } catch (error) {
    res.json({
      error: "Erreur lors de l'insertion des catégories",
      details: error,
    });
  }
});

router.post("/add-parts", async (req, res) => {
  try {
    const result = await Part.insertMany(data_part);
    res.json({
      message: "Pièces insérées avec succès !",
      data: result,
    });
  } catch (error) {
    res.json({
      message: "Erreur serveur, impossible d'ajouter les pièces.",
      error: error.message,
    });
  }
});

router.post("/add-subcategory", async (req, res) => {
  try {
    await SubCategory.insertMany(data_subcategory);
    res.json({ message: "Services insérés avec succès" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/request_quote", async (req, res) => {
  try {
    const { id_quote } = req.params;
    const getDevis = await Quote.findById(id_quote);
    if (!getDevis) {
      throw new Error("Quote not found");
    }
    getDevis.status = "Valide M";
    await getDevis.save();
    res.json({ succes: true, message: "Quote validate" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post("/start_reparation", async (req, res) => {
  try {
    const { id_quote, dateBeginRepair, dateEndDate, mecano } = req.body;
    const getDevis = await Quote.findById(id_quote);
    const user = await User.findById(getDevis.userid);
    if (!getDevis) {
      throw new Error("devis non trouver ");
    }
    const repair_schema = getDevis.repair.map(
      ({ categoryid, subcategoryid, subcategoryname }) => ({
        categoryid,
        subcategory: subcategoryid,
        subcategoryname,
      })
    );
    const categoryIds = getDevis.repair.map((element) => element.categoryid);
    if (checkMechanicsSkillsForMission(mecano, categoryIds) === false) {
      throw new Error(
        "Les mécaniciens assignés ne peuvent pas couvrir toutes les catégories de la mission."
      );
    }
    const repair = new Repair({
      userid: getDevis.userid,
      carid: getDevis.carid,
      customerName: user.fullName,
      repairstartdate: dateBeginRepair,
      repairenddate: dateEndDate,
      repairCost: getDevis.totalprice,
      repair: repair_schema,
      mechanics: mecano,
    });
    console.log(repair);
    res.json({ success: true, message: "Data ok" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.get("/problems", async(req,res) => {
  try {
    const problems = await ProblemReport.find();
    res.json({ success: true, problems });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.get("/all-parts", async(req, res) => {
  try {
    const parts = await Part.find();
    res.json({ success: true, parts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
})

router.get("/all-services", async(req, res) => {
  try {
    const subservices = await SubCategory.find();
    res.json({ success: true, subservices });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
})

module.exports = router;
