import express from "express";
import mongoose from "mongoose";
import {
  getVehicules,
  getVehiculeById,
} from "../controllers/vehiculeController.js";
const router = express.Router();

// import asyncHandler from "../middleware/asyncHandler.js";
// import vehicules from "../data/vehicules.js";
// import Vehicule from "../models/vehiculeModel.js";

router.route("/").get(getVehicules);
router.route("/:id").get(getVehiculeById);

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

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {})
// );

export default router;
