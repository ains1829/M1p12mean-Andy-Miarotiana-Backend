const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/person/users-model");
const { getEmail } = require("../../services/person/user-service");
const {
  middleware_auth_client,
  middleware_global,
} = require("../../middlewares/auth-middleware");

const SECRET_KEY = process.env.SECRET_KEY || "ma_clé_secrète";

router.get("/user_connected", middleware_global, async (req, res) => {
  try {
    const user_connected = req.user;
    res.json({ succes: true, user: user_connected });
  } catch (error) {
    res.status(403).json({ message: "NOT AUTHORIZED" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    const user = await getEmail(email);
    if (user !== null) {
      throw new Error("Email déjà utilisé");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      fullName: fullname,
      email: email,
      hashedPassword: hashedPassword,
      phoneNumber: phoneNumber,
      ...(role && { role: role }),
    };
    const new_user = new User(newUser);
    await new_user.save();

    res.json({ message: "Utilisateur enregistré avec succès", data: new_user });
  } catch (error) {
    res.json({ succes: false, message: error.message || "Erreur inconnue" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await getEmail(email);
  try {
    if (user === null) {
      throw new Error(
        "Votre mot de passe est incorrect. Veuillez le vérifier."
      );
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      throw new Error(
        "Votre mot de passe est incorrect. Veuillez le vérifier."
      );
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        fullname: user.fullName,
      },
      SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );
    res.json({ succes: true, user_connected: user, token: token });
  } catch (error) {
    res.json({ succes: false, message: error.message || "Erreur inconnue" });
  }
});

module.exports = router;
