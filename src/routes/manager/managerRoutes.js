const express = require("express");
const Brand = require("../../models/car/marque-model");
const Category = require("../../models/car/category-model");
const Part = require("../../models/part/parts-model");
const SubCategory = require("../../models/car/subcategory-model");
const Quote = require("../../models/repair/quote-model");
const data_brands = require("../../models/part/data/brandsmodels-data");
const data_part = require("../../models/part/data/parts-data");
const data_subcategory = require("../../models/car/data/subCategory-data");
const Repair = require("../../models/repair/repair-model");
const User = require("../../models/person/users-model");
const ProblemReport = require("../../models/repair/problem-model");
const Mechanic = require("../../models/person/mechanic-model");
const Appointment = require("../../models/rdv/rdv-model");
const {
  middleware_auth_manager,
} = require("../../middlewares/auth-middleware");
const {
  checkMechanicsSkillsForMission,
  findDocumentById,
  calculateTotalPrice,
  getTotalEstimatedHour,
} = require("../../services/repair/quote-service");
const router = express.Router();
const moment = require("moment");

router.use(middleware_auth_manager);

router.get("/getcreneauxbyreparation", async (req, res) => {
  try {
    const { idrepair } = req.query;
    const creneaux = await Appointment.findOne({ idrepair: idrepair });
    res.json({ succes: true, data: creneaux });
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
});

router.post("/createCreneaux", async (req, res) => {
  try {
    const { repair_choix_id, horaire_rdv } = req.body;
    const existingRepair = await Repair.findById(repair_choix_id);
    existingRepair.status_creneaux = "creneaux dispo";
    await existingRepair.save();
    const rdv = new Appointment({
      idrepair: repair_choix_id,
      appointments: horaire_rdv,
    });
    await rdv.save();
    res.json({ succes: true, data: rdv });
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
});

router.post("/assign_mecanicien_work", async (req, res) => {
  try {
    const { id_repair, mecano } = req.body;
    const existingRepair = await Repair.findById(id_repair);
    mecano.forEach((element) => {
      existingRepair.mechanics.push(element);
    });
    const categoryIds = existingRepair.repair.map(
      (element) => element.categoryid
    );
    if (checkMechanicsSkillsForMission(mecano, categoryIds) === false) {
      throw new Error(
        "Les mécaniciens assignés ne peuvent pas couvrir toutes les catégories de la mission."
      );
    }
    await existingRepair.save();
    res.json({ succes: true, data: existingRepair });
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
});

router.get("/get_mecanicien", async (req, res) => {
  try {
    const mecaniciens = await Mechanic.find();
    res.json({ succes: true, data: mecaniciens });
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
});

router.post("/assign_mecanicien", async (req, res) => {
  try {
    const { userId, skills, salary } = req.body;
    const existingUser = await User.findById(userId);
    const newMechanic = new Mechanic({
      fullName: existingUser.fullName,
      email: existingUser.email,
      userId: existingUser._id,
      phonenumber: existingUser.phoneNumber,
      skills,
      salary,
    });
    await newMechanic.save();
    res.json({
      succes: true,
      message: "Mécanicien ajouté avec succès",
      mechanic: newMechanic,
    });
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
});

router.get("/getallrepair", async (req, res) => {
  try {
    const repair = await Repair.find();
    return res.json({ sucess: true, data: repair });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/addcomment", async (req, res) => {
  try {
    const { id_quote, commentaire } = req.body;
    const commentaire_client = {
      providerClient: false,
      comment: commentaire,
    };
    const updatedQuote = await Quote.findByIdAndUpdate(
      id_quote,
      { $push: { commentaire: commentaire_client } },
      { new: true }
    )
    return res.json({ success: true, data: "Vous avez commenter le devis du client" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.get("/get_devisbyproblem", async (req, res) => {
  try {
    const { problem_id } = req.query;
    console.log(problem_id);
    const getDevis = await Quote.find({ problemid: problem_id }).sort({
      datequote: -1,
    });
    return res.json({ success: true, devis: getDevis });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/give_devis", async (req, res) => {
  try {
    const { problem, part_devis, services_devis } = req.body;
    await findDocumentById(ProblemReport, problem._id, "Problem not found");
    const totalprice = calculateTotalPrice(services_devis, part_devis);
    const time_estimated = getTotalEstimatedHour(services_devis);
    const repair_subcategory = [];
    const partQuotes = [];
    services_devis.forEach((element) => {
      repair_subcategory.push({
        subcategoryid: element._id,
        categoryid: element.categoryid,
        subcategoryname: element.name,
        estimatedtime: element.estimatedtime,
        estimatedprice: element.estimatedprice,
        nbrepair: element.quantite_service,
        description: element.description_service,
      });
    });
    part_devis.forEach((element) => {
      partQuotes.push({
        partid: element._id,
        partname: element.partName,
        quantite: element.quantite_devis,
        price: element.price,
      });
    });
    const quote = new Quote({
      problemid: problem._id,
      userid: problem.userId,
      carid: problem.carId,
      items: partQuotes,
      repair: repair_subcategory,
      totalprice: totalprice,
      estimationtime: time_estimated,
      nameuser: problem.nameuser,
      marquecar: problem.marquecar,
      modelcar: problem.modelcar,
      yearcar: problem.yearcar,
    });
    await quote.save();
    return res.json({ success: true, devis: quote });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
});

router.get("/search_parts", async (req, res) => {
  try {
    const { search } = req.query;
    console.log(search);
    const data = await Part.find({
      $or: [
        { description: { $regex: search, $options: "i" } },
        { partName: { $regex: search, $options: "i" } },
      ],
    });
    return res.json({ succes: true, data: data });
  } catch (error) {
    res.json({
      succes: false,
      error: "Une erreur s'est produite.",
    });
  }
});

router.get("/search_service", async (req, res) => {
  try {
    const { search } = req.query;
    const data = await SubCategory.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { categoryname: { $regex: search, $options: "i" } },
      ],
    });
    return res.json({ succes: true, data: data });
  } catch (error) {
    res.json({
      succes: false,
      error: "Une erreur s'est produite.",
    });
  }
});

router.get("/get_all_problem", async (req, res) => {
  try {
    const reponse = await ProblemReport.find();
    return res.json({ succes: true, data: reponse });
  } catch (error) {
    res.json({
      succes: false,
      error: "Une erreur s'est produite.",
    });
  }
});

router.post("/generate-brands", async (req, res) => {
  try {
    const datagenerer = await Brand.insertMany(data_brands);
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
      { category: "Batterie et gestion de l'énergie" },
      { category: "Système de recharge" },
      { category: "Moteur électrique" },
      { category: "Freinage régénératif" },
      { category: "Climatisation et gestion thermique" },
      { category: "Suspension et direction" },
      { category: "Électronique embarquée et logiciel" },
      { category: "Pneus et roues" },
      { category: "Carrosserie et peinture" },
      { category: "Système de surveillance des performances" },    
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

router.get("/problems", async (req, res) => {
  try {
    const problems = await ProblemReport.find();
    res.json({ success: true, problems });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.get("/all-parts", async (req, res) => {
  try {
    const parts = await Part.find();
    res.json({ success: true, parts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.get("/all-services", async (req, res) => {
  try {
    const subservices = await SubCategory.find();
    res.json({ success: true, subservices });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Nombres cles pour le dashboard manager
router.get("/dashboard/repairs-summary", async (req, res) => {
  try {
    const [ongoingRepairs, completedRepairs, requestQuotes, acceptedQuotes] = await Promise.all([
      Repair.countDocuments({ repair: { $elemMatch: { status: { $in: ["en attente", "in-progress"] } } } }),
      Repair.countDocuments({ repair: { $not: { $elemMatch: { status: { $ne: "completed" } } } } }),
      Quote.countDocuments({ isAccepted: false }),
      Quote.countDocuments({ isAccepted: true }),
    ]);

    res.json({
      success: true,
      ongoingRepairs,
      completedRepairs,
      requestQuotes,
      acceptedQuotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des données.",
      error: error.message,
    });
  }
});

// Revenues des 7 dernieres jours
router.get("/dashboard/revenues-summary", async (req, res) => {
  try {
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");
    const revenues = await Quote.aggregate([
      { 
        $match: { 
          isAccepted: true,
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Grouper par date
          totalRevenue: { $sum: "$totalprice" }
        }
      },
      { $sort: { _id: 1 } } // Trie croissant
    ]);
    const allDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startDate.clone().add(i, "days").format("YYYY-MM-DD");
      allDates.push({ _id: date, totalRevenue: 0 });
    }
    const finalRevenues = allDates.map(day => {
      const match = revenues.find(r => r._id === day._id);
      return match ? match : day;
    });

    res.json({ success: true, revenues: finalRevenues });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Les meilleures pieces vendues
router.get("/dashboard/top-parts", async (req, res) => {
  try {
    const topParts = await Quote.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: { partId: "$items.partId", partname: "$items.partname" },
          totalUsed: { $sum: "$items.quantite" },
          totalCost: { $sum: { $multiply: ["$items.quantite", "$items.price"] } }
        }
      },
      { $sort: { totalUsed: -1 } },
      { $limit: 5 }
    ]);
    res.json({ success: true, topParts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});


module.exports = router;
