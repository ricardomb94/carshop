import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
// import vehicules from "../data/vehicules.js";
import Vehicule from "../models/vehiculeModel.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const vehicules = await Vehicule.find({});
    res.json(vehicules);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const vehicule = await Vehicule.findById(req.params.id);
    if (vehicule) {
      return res.json(vehicule);
    }
    res.status(404).json({ message: "Vehicule introuvable" });
  })
);

export default router;
