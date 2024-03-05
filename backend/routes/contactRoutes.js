import express from "express";
import {getContactMessages, submitContactForm} from "../controllers/contactController.js"
import { admin, protect } from "../middleware/authMiddleware.js";


const router = express.Router();


router.route("/").get(protect, admin, getContactMessages).post(submitContactForm);

export default router