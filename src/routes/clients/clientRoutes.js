const express = require("express");
const { middleware_auth_client } = require("../../middlewares/auth-middleware");
const Car = require("../../models/car/car-model");
const ProblemReport = require("../../models/repair/problem-model");
const Appointment = require("../../models/rdv/rdv-model");
const User = require("../../models/person/users-model");
const Quote = require("../../models/repair/quote-model");
const router = express.Router();

router.use(middleware_auth_client);

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

router.post("/add_cars", async (req, res) => {
  try {
    console.log(req.body);
    // const car = new Car(req.body);
    // await car.save();
    res.json({ message: "🚗 Voiture créée avec succès" });
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
    const car = await Car.findById(carId);
    if (!car || !carId || !description) {
      throw new Error("Tous les champs requis ne sont pas fournis.");
    }
    const newProblem = new ProblemReport({
      userId,
      carId,
      description,
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
