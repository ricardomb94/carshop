import express from "express";
import {deleteContact, getContactMessages, submitContactForm} from "../controllers/contactController.js"
import { admin, protect } from "../middleware/authMiddleware.js";


const router = express.Router();


router.route("/").get(protect, admin, getContactMessages).post(submitContactForm);
router.route("/:id").delete(protect, admin, deleteContact);

export default router