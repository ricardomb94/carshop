import express from "express";
import {
  getVehicules,
  getVehiculeById,
  createVehicule,
  updateVehicule,
} from "../controllers/vehiculeController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createVehicule, protect, admin).get(getVehicules);
router.route("/:id").put(protect, admin, updateVehicule).get(getVehiculeById);

export default router;
