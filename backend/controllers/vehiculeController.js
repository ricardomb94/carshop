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

  if (!vehicule) {
    return res.status(404).json({ message: "No vehicle found" });
  }

  res.setHeader("Cache-Control", "no-store");
  res.json(vehicule);
});

// @desc Create new vehicules
// @routes POST /api/vehicules
// @access Private, Admin
const createVehicule = asyncHandler(async (req, res) => {
  // try {
  // Create a new vehicle instance based on the request body
  const newVehicule = new Vehicule(req.body);

  // Save the new vehicle to the database
  const createdVehicule = await newVehicule.save();

  // Respond with a success message and the created vehicle data
  const response = {
    success: true,
    data: createdVehicule,
  };
  res.status(201).json(response);
  // } catch (error) {
  console.error("Error creating vehicule:", error);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: error.message });
  // }
});
//----------------------------------------------------------------------------------
// const createVehicule = asyncHandler(async (req, res) => {
//   const vehicule = new Vehicule({
//     name: "Sample-Vehicules",
//     images: [
//       { original: "images/yarris-3.jpg", thumbnail: "images/yarris-3.jpg" },
//     ],
//     brand: "Rcd",
//     year: 2007,
//     color: "red",
//     description: "Sample",
//     price: 100,
//     countInStock: 0,
//     numReviews: 0,
//     rating: 0,
//     provenance: "sample",
//     registration: "sample",
//     vehiculeInspection: "sample",
//     originalOwner: "sample",
//     odometerReading: "sample",
//     energy: "sample",
//     transmission: "sample",
//     upholstery: "sample",
//     doors: 3,
//     seats: 5,
//     comment: "sample comment",
//     user: "654722623f69c2fc934a77d7",
//   }).unrwap();
//   const createdVehicule = await vehicule.save();
//   res.status(201).json(createdVehicule);
//   console.log("CREATED-Vehicule", createdVehicule);
// });
//---------------------
export { getVehicules, getVehiculeById, createVehicule };
