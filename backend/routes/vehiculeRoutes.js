import express from "express";
import {
  getVehicules,
  getVehiculeById,
  createVehicule,
} from "../controllers/vehiculeController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createVehicule).get(getVehicules);
router.route("/:id").get(getVehiculeById);

export default router;
