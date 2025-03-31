const express = require("express");
const { middleware_auth_client } = require("../../middlewares/auth-middleware");
const Car = require("../../models/car/car-model");
const ProblemReport = require("../../models/repair/problem-model");
const Appointment = require("../../models/rdv/rdv-model");
const User = require("../../models/person/users-model");
const Quote = require("../../models/repair/quote-model");
const router = express.Router();
const Repair = require("../../models/repair/repair-model");
const Brand = require("../../models/car/marque-model");
router.use(middleware_auth_client);

router.get("/getbrands", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json({ succes: true, data: brands });
  } catch (error) {
    res.json({ succes: true, data: error.message });
  }
});

router.post("/accept_datereparation", async (req, res) => {
  try {
    const { idrepair, id_rdv } = req.body;
    const repair = await Repair.findById(idrepair);
    const creneaux = await Appointment.findOne({ idrepair: idrepair });
    const appointment = creneaux.appointments.id(id_rdv);
    repair.status_creneaux = "en reparation";
    repair.repairstartdate = appointment.dateBegin;
    repair.repairenddateestimated = appointment.dateFin;
    appointment.isAccepted = true;
    await creneaux.save();
    await repair.save();
    res.json({ succes: true, data: "Succes" });
  } catch (error) {
    res.json({ succes: true, data: error.message });
  }
});

router.get("/getcreneauxbyreparation", async (req, res) => {
  try {
    const { idrepair } = req.query;
    const creneaux = await Appointment.findOne({ idrepair: idrepair });
    res.json({ succes: true, data: creneaux });
  } catch (error) {
    res.json({ succes: false, message: error.message });
  }
});

router.get("/getMyRepair", async (req, res) => {
  try {
    const user = req.user;
    const repair = await Repair.find({ userid: user.id });
    return res.json({ sucess: true, data: repair });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.get("/accepte_devis", async (req, res) => {
  try {
    const { id_quote } = req.query;
    const quote = await Quote.findById(id_quote);
    const problem = await ProblemReport.findById(quote.problemid);
    problem.have_devis = true;
    quote.isAccepted = true;
    await quote.save();
    await problem.save();
    const sub_category_progress = [];
    quote.repair.forEach((element) => {
      sub_category_progress.push({
        categoryid: element.categoryid,
        subcategory: element.subcategoryid,
        subcategoryname: element.subcategoryname,
      });
    });
    const repair = new Repair({
      quoteid: quote._id,
      userid: quote.userid,
      problemid: quote.problemid,
      carid: quote.carid,
      marquecar: quote.marquecar,
      modelcar: quote.modelcar,
      nameuser: quote.nameuser,
      yearcar: quote.yearcar,
      repairCost: quote.totalprice,
      repair: sub_category_progress,
      estimationtime: quote.estimationtime,
      description_problem: problem.description,
    });
    await repair.save();
    return res.json({ success: true, data: "Succes" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/addcomment", async (req, res) => {
  try {
    const { id_quote, commentaire } = req.body;
    const quote = await Quote.findById(id_quote);
    const commentaire_client = {
      providerClient: true,
      comment: commentaire,
    };
    quote.commentaire.push(commentaire_client);
    await quote.save();
    return res.json({ success: true, data: "Succes" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.get("/get_devisbyproblem", async (req, res) => {
  try {
    const { problem_id } = req.query;
    const getDevis = await Quote.find({ problemid: problem_id }).sort({
      datequote: -1,
    });
    return res.json({ success: true, devis: getDevis });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/add_cars", async (req, res) => {
  try {
    const user_connected = req.user;
    const iduser = user_connected.id;
    const {
      brandId,
      brand,
      modelId,
      model,
      year,
      registrationNumber,
      chassisNumber,
      imagefile,
      type,
      mileage,
    } = req.body;

    const car = new Car({
      userId: iduser,
      brandId,
      brand,
      modelId,
      model,
      year,
      registrationNumber,
      chassisNumber,
      mileage,
      imageVoiture: imagefile,
      type: type.name,
    });
    await car.save();
    res.json({ succes: true, message: "🚗 Voiture créée avec succès" });
  } catch (error) {
    res.json({ message: "❌ Erreur lors de la création", error });
  }
});

router.get("/get_cars", async (req, res) => {
  try {
    const user_connected = req.user;
    const iduser = user_connected.id;
    const reponse = await Car.find({ userId: iduser });
    return res.json({ succes: true, data: reponse });
  } catch (error) {
    res.json({
      succes: false,
      error: "Une erreur s'est produite.",
    });
  }
});

router.get("/get_problem", async (req, res) => {
  try {
    const user_connected = req.user;
    const iduser = user_connected.id;
    const reponse = await ProblemReport.find({ userId: iduser });
    return res.json({ succes: true, data: reponse });
  } catch (error) {
    res.json({
      succes: false,
      error: "Une erreur s'est produite.",
    });
  }
});

router.post("/request_problem", async (req, res) => {
  try {
    const { carId, description } = req.body;
    console.log("salut", carId, description);
    const user_connected = req.user;
    const userId = user_connected.id;
    const nameuser = user_connected.fullname;
    const car = await Car.findById(carId);
    if (!car || !carId || !description) {
      throw new Error("Tous les champs requis ne sont pas fournis.");
    }
    const newProblem = new ProblemReport({
      userId,
      carId,
      nameuser,
      description,
      marquecar: car.brand,
      modelcar: car.model,
      yearcar: car.year,
    });
    await newProblem.save();
    return res.json({
      succes: true,
      message: "Problème soumis avec succès.",
      problem: newProblem,
    });
  } catch (error) {
    return res.json({
      succes: false,
      message: error.message,
    });
  }
});

router.post("/appointments", async (req, res) => {
  try {
    const user_connected = req.user;
    const { time, date } = req.body;
    const user = await User.findById(user_connected.id);
    if (!user) {
      throw new Error("User not found");
    }
    let appointmentDate = await Appointment.findOne({ date: date });
    if (appointmentDate) {
      const isTimeTaken = appointmentDate.appointments.some(
        (appointment) => appointment.time === time
      );
      if (isTimeTaken) {
        throw new Error("L'heure souhaitée est déjà prise.");
      }
    }
    const newAppointment = {
      userid: user_connected.id,
      fullname: user.fullName,
      email: user.email,
      phone: user.phone,
      time,
    };
    if (appointmentDate) {
      appointmentDate.appointments.push(newAppointment);
      await appointmentDate.save();
    } else {
      appointmentDate = new Appointment({
        date,
        appointments: [newAppointment],
      });
      await appointmentDate.save();
    }
    res.json({
      succes: true,
      message: "Rendez-vous ajouté avec succès.",
      appointmentDate,
    });
  } catch (error) {
    res.json({
      succes: false,
      error: "Une erreur s'est produite lors de l'ajout du rendez-vous.",
    });
  }
});

module.exports = router;
