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

// @desc Update a vehicule
// @routes PUT /api/vehicules/:id
// @access Private/admin
const updateVehicule = asyncHandler(async (req, res) => {
  //Let's get the data coming from the body by destructuring them from the req.body
  const {
    name,
    image,
    description,
    brand,
    year,
    category,
    color,
    countInStock,
    price,
    rating,
    provenance,
    registration,
    vehiculeInspection,
    originalOwner,
    odometerReading,
    energy,
    transmission,
    upholstery,
    doors,
    seats,
    numReviews,
  } = req.body;

  //Here we are going to find the vehicule product
  const vehicule = await Vehicule.findById(req.params.id);
  console.log("VEHICULE-CONTROLLER", vehicule);

  if (vehicule) {
    vehicule.name = name || vehicule.name;
    vehicule.images = image || vehicule.images;
    vehicule.description = description || vehicule.description;
    vehicule.brand = brand || vehicule.brand;
    vehicule.year = year || vehicule.year;
    vehicule.category = category || vehicule.category;
    vehicule.color = color || vehicule.color;
    vehicule.countInStock = countInStock || vehicule.countInStock;
    vehicule.price = price || vehicule.price;
    vehicule.rating = rating || vehicule.rating;
    vehicule.provenance = provenance || vehicule.provenance;
    vehicule.registration = registration || vehicule.registration;
    vehicule.vehiculeInspection =
      vehiculeInspection || vehicule.vehiculeInspection;
    vehicule.originalOwner = originalOwner || vehicule.originalOwner;
    vehicule.odometerReading = odometerReading || vehicule.odometerReading;
    vehicule.energy = energy || vehicule.energy;
    vehicule.transmission = transmission || vehicule.transmission;
    vehicule.upholstery = upholstery || vehicule.upholstery;
    vehicule.doors = doors || vehicule.doors;
    vehicule.seats = seats || vehicule.seats;
    vehicule.numReviews = numReviews || vehicule.numReviews;

    const updatedVehicule = await vehicule.save();
    res.json(updatedVehicule);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getVehicules, getVehiculeById, createVehicule, updateVehicule };
