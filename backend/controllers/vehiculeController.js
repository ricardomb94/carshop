import asyncHandler from "../middleware/asyncHandler.js";
import Vehicule from "../models/vehiculeModel.js";

// @desc Fetch all vehicules
// @routes GET /api/vehicules
// @access Public
const getVehicules = asyncHandler(async (req, res) => {
  const vehicules = await Vehicule.find({});
  console.log("ALL-VEHICULES", vehicules);
  res.json(vehicules);
});

// @desc Fetch a vehicule by Id
// @routes GET /api/vehicules/:id
// @access Public
const getVehiculeById = asyncHandler(async (req, res) => {
  const vehicule = await Vehicule.findById(req.params.id);
  if (vehicule) {
    res.setHeader("Cache-Control", "no-store");
    return res.json(vehicule);
  } else {
    res.status(404).json({ message: "Aucun véhicule ne correspond" });
  }
});

export { getVehicules, getVehiculeById };
