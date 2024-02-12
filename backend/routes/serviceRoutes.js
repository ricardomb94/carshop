import express from "express";
import {
    getServices, 
    getServiceById, 
    createService, 
    updateService
} from "../controllers/serviceController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getServices).post(protect, admin, createService);
router.route("/:id").get(getServiceById).put(protect, admin, updateService);

export default router;
