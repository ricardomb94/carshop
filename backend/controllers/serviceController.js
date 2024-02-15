import asyncHandler from "../middleware/asyncHandler.js";
import Service from "../models/serviceModel.js";

// Fetch all services
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});

// Fetch a service by ID
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({ message: "No service found" });
  }

  res.json(service);
});

// Create a new service
const createService = asyncHandler(async (req, res) => {
  // try {
  // Create a new service instance based on the request body
  const newService = new Service(req.body);

  // Save the new service to the database
  const createdService = await newService.save();

  // Respond with a success message and the created vehicle data
  const response = {
    success: true,
    data: createdService,
  };
  res.status(201).json(response);
  // } catch (error) {
  console.error("Error creating Service:", error);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: error.message });
  // }
});
// Update a service
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    // service.price = req.body.price || service.price;
    service.image = req.body.image || service.image;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

export { getServices, getServiceById, createService, updateService };

