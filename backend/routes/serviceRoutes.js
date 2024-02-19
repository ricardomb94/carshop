import express from "express";
import {
    getServices, 
    getServiceById, 
    createService, 
    updateService,
    deleteService
} from "../controllers/serviceController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getServices).post(createService, protect, admin, );
router.route("/:id").get(getServiceById).put(protect, admin, updateService).delete(protect, admin, deleteService);

export default router;
