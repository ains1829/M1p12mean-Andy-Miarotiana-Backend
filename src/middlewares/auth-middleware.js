const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "ma_clé_secrète";

function middleware_global(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token requis" });
  }
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
    req.user = decoded;
    next();
  });
}

function middleware_auth_client(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token requis" });
  }
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
    if (decoded.role === "client") {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ message: "NOT AUTHORIZED" });
    }
  });
}

function middleware_auth_manager(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token requis" });
  }
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
    if (decoded.role === "manager") {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ message: "NOT AUTHORIZED" });
    }
  });
}

function middleware_auth_mecanicien(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token requis" });
  }
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
    if (decoded.role === "mecanicien") {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ message: "NOT AUTHORIZED" });
    }
  });
}

module.exports = {
  middleware_auth_client,
  middleware_global,
  middleware_auth_manager,
  middleware_auth_mecanicien,
};
