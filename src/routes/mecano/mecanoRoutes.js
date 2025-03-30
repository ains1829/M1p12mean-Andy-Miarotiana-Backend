const express = require("express");
const router = express.Router();
const Repair = require("../../models/repair/repair-model");
const Mechanic = require("../../models/person/mechanic-model");
const {
  middleware_auth_mecanicien,
} = require("../../middlewares/auth-middleware");

router.use(middleware_auth_mecanicien);

router.get("/reparation_assgined", async (req, res) => {
  try {
    const user_connected = req.user;
    const mecaobyiduser = await Mechanic.findOne({ userId: user_connected.id });
    const repairAssigned = await Repair.find({
      "mechanics.email": user_connected.email,
    }).lean();
    const allSkills = mecaobyiduser.skills.map((s) => s.categoryId.toString());
    repairAssigned.forEach((repairtodo) => {
      const worktodo = repairtodo.repair;
      worktodo.forEach((element) => {
        if (allSkills.includes(element.categoryid.toString())) {
          element.canRepair = true;
        }
      });
    });
    return res.json({ sucess: true, data: repairAssigned });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

router.post("/dowork", async (req, res) => {
  const { id_repair, id_worktodo, isbegin } = req.body;
  try {
    const repair = await Repair.findById(id_repair);
    if (!repair) {
      throw new Error("Réparation introuvable !");
    }
    if (isbegin) {
      await Repair.updateOne(
        { _id: id_repair, "repair.subcategory": id_worktodo },
        {
          $set: {
            "repair.$.subacategorystartdate": new Date(Date.now()),
            "repair.$.status": "in-progress",
          },
        }
      );
    } else {
      await Repair.updateOne(
        { _id: id_repair, "repair.subcategory": id_worktodo },
        {
          $set: {
            "repair.$.subacategoryenddate": new Date(Date.now()),
            "repair.$.status": "completed",
          },
        }
      );
      const checkAllRepairsFinished = await Repair.findOne({
        _id: id_repair,
        "repair.status": { $ne: "completed" },
      });
      if (!checkAllRepairsFinished) {
        await Repair.updateOne(
          { _id: id_repair },
          {
            $set: {
              final_status: "completed",
              repairenddate: new Date(Date.now()),
            },
          }
        );
      }
    }
    return res.json({ success: true, message: "Reparation terminer" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
});

module.exports = router;
