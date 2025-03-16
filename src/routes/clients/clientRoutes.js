const express = require("express");
const { middleware_auth_client } = require("../../middlewares/auth-middleware");
const router = express.Router();
const Car = require("../../models/car/car-model");
const ProblemReport = require("../../models/repair/problem-model");
const Appointment = require("../../models/rdv/rdv-model");
const User = require("../../models/person/users-model");

router.use(middleware_auth_client);

router.get("/request_repair", async (req, res) => {
  res.json({ message: "salut", person: req.user });
});

router.post("/add_cars", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.json({ message: "🚗 Voiture créée avec succès", car });
  } catch (error) {
    res.json({ message: "❌ Erreur lors de la création", error });
  }
});

router.post("/request_problem", async (req, res) => {
  try {
    const { carId, description, images } = req.body;
    const user_connected = req.user;
    const userId = user_connected.id;
    if (!carId || !description) {
      return res
        .status(400)
        .json({ message: "Tous les champs requis ne sont pas fournis." });
    }
    const newProblem = new ProblemReport({
      userId,
      carId,
      description,
      images,
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
      message: error,
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
