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
  const newService = new Service(req.body);
  const createdService = await newService.save();
  res.status(201).json(createdService);
});

// Update a service
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    service.name = req.body.name || service.name;
    service.description = req.body.description || service.description;
    service.price = req.body.price || service.price;
    service.imageUrl = req.body.imageUrl || service.imageUrl;

    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error("Service not found");
  }
});

export { getServices, getServiceById, createService, updateService };

