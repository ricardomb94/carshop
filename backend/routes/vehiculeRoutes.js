import express from "express";
import mongoose from "mongoose";
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

// router.get(
//   "/:id",
//   validateObjectId,
//   asyncHandler(async (req, res) => {
//     const vehicule = await Vehicule.findById(req.params.id);
//     if (vehicule) {
//       res.setHeader("Cache-Control", "no-store");
//       return res.json(vehicule);
//     } else {
//       res.status(404).json({ message: "Aucun véhicule ne correspond" });
//     }
//   })
// );
// function validateObjectId(req, res, next) {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id))
//     return res.status(400).send("Invalid ID.");
//   next();
// }

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    console.log("Received vehiculeId:", id);

    // Check if id is a valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format");
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const singleVehicule = await Vehicule.findById(id);

    if (singleVehicule) {
      console.log("Found vehicule:", singleVehicule);
      return res.json(singleVehicule);
    }

    console.log("Vehicule not found");
    res.status(404).json({ message: "Vehicule introuvable" });
  })
);

export default router;
