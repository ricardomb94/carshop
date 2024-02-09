import asyncHandler from "../middleware/asyncHandler.js";
import Vehicule from "../models/vehiculeModel.js";
import User from "../models/userModel.js";

// @desc Fetch all vehicules
// @routes GET /api/vehicules
// @access Public
const getVehicules = asyncHandler(async (req, res) => {
  const vehicules = await Vehicule.find({});
  res.json(vehicules);
  console.log("ALL-VEHICULES", vehicules);
});

// @desc Fetch a vehicule by Id
// @routes GET /api/vehicules/:id
// @access Public
const getVehiculeById = asyncHandler(async (req, res) => {
  //const vehiculeId = req.params.id;

//   try {
//     // Fetch vehicule details from the database
//     const vehicule = await Vehicule.findById(vehiculeId);

//     // Fetch user details associated with the vehicule
//     const user = await User.findById(vehicule.user);

//     // Combine vehicule and user details in the response
//     res.json({
//       vehicule,
//       user,
//     });
//     console.log("RES-IN VEHICULE-CTLER", vehicule);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
  const vehicule = await Vehicule.findById(req.params.id);

  if (!vehicule) {
    return res.status(404).json({ message: "No vehicule found" });
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
    images,
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
  console.log("VEHICULE-CONTROLLER", JSON.stringify(vehicule));

  if (vehicule) {
    vehicule.name = name || vehicule.name;
    // vehicule.images = images || vehicule.images;
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

    // Check if the images array is provided in the request body
  if (images && Array.isArray(images)) {
    // Update each image in the vehicule's images array
    vehicule.images = images.map((newImage) => {
      // Find the existing image in the vehicule's images array by _id
      const existingImage = vehicule.images.find(
        (img) => img._id && newImage._id && img._id.toString() === newImage._id.toString()
      );

      // If the existing image is found, update its properties
      if (existingImage) {
        return {
          original: newImage.original || existingImage.original,
          thumbnail: newImage.thumbnail || existingImage.thumbnail,
          _id: existingImage._id,
        };
      }

      // If the existing image is not found, add the new image to the array
      return {
        original: newImage.original || "",
        thumbnail: newImage.thumbnail || "",
        _id: newImage._id,
      };
    });
  }
    const updatedVehicule = await vehicule.save();
    res.json(updatedVehicule);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
console.log("UPDATED-VEHICULE", updateVehicule);
console;

export { getVehicules, getVehiculeById, createVehicule, updateVehicule };
