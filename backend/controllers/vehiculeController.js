import asyncHandler from "../middleware/asyncHandler.js";
import Vehicule from "../models/vehiculeModel.js";
import User from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv";
dotenv.config();

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
  const vehicule = await Vehicule.findById(req.params.id);

  if (!vehicule) {
    return res.status(404).json({ message: "No vehicule found" });
  }

  // Map through the images to include only the secure URLs
  const imagesWithSecureUrls = vehicule.images.map((image) => ({
    original: image.original,
    thumbnail: image.thumbnail,
  }));

  // Create a new object with the vehicule data and updated images
  const vehiculeData = {
    ...vehicule._doc,
    images: imagesWithSecureUrls,
  };

  res.setHeader("Cache-Control", "no-store");
  res.json(vehiculeData);
});


// @desc Create new vehicules
// @routes POST /api/vehicules
// @access Private, Admin
const createVehicule = asyncHandler(async (req, res) => {
  const { images, ...vehiculeData } = req.body;

  try {
    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.original);
        return {
          original: result.secure_url,
          thumbnail: result.secure_url,
        };
      })
    );

    // Create a new vehicle instance with the uploaded images
    const newVehicule = new Vehicule({
      ...vehiculeData,
      images: uploadedImages,
    });

    // Save the new vehicle to the database
    const createdVehicule = await newVehicule.save();

    // Respond with a success message and the created vehicle data
    const response = {
      success: true,
      data: createdVehicule,
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating vehicule:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

// @desc Update a vehicule
// @routes PUT /api/vehicules/:id
// @access Private/admin
const updateVehicule = asyncHandler(async (req, res) => {
  const {
    images,
    name,
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

  const vehicule = await Vehicule.findById(req.params.id);

  if (vehicule) {
    // Update non-image fields
    vehicule.name = name || vehicule.name;
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

    // Update images
    if (images) {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.v2.uploader.upload(image.original);
          return {
            original: result.secure_url,
            thumbnail: result.secure_url,
          };
        })
      );

      vehicule.images = uploadedImages;
    }

    const updatedVehicule = await vehicule.save();
    res.json(updatedVehicule);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
console.log("UPDATED-VEHICULE", updateVehicule);


// @desc Delete a vehicule
// @routes POST /api/vehicules/:id
// @access Private/admin
const deleteVehicule = asyncHandler(async (req, res) => {

  //Here we are going to find the vehicule product
  const vehicule = await Vehicule.findById(req.params.id);
  console.log("VEHICULE-CONTROLLER", JSON.stringify(vehicule));

  if (vehicule) {
    await vehicule.deleteOne({_id: vehicule._id});
    res.status(200).json({message: 'Le véhicule a été supprimé'})
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getVehicules, getVehiculeById, createVehicule, updateVehicule, deleteVehicule };
