import asyncHandler from '../middleware/asyncHandler.js';
import Service from '../models/serviceModel.js';

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
// Fetch all services
const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  res.json(services);
});


// @desc    Fetch single product
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
  const product = await Service.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Resource not found');
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
  // try {
  // Create a new service instance based on the request body
  const newService = new Service(req.body);

  // Save the new service to the database
  const createdService = await newService.save();

  // Respond with a success message and the created service data
  const response = {
    success: true,
    data: createdService,
  };
  res.status(201).json(response);
  // } catch (error) {
  console.error("Error creating vehicule:", error);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: error.message });
  // }
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
  const { title, description, image } =
    req.body;

  const service = await Service.findById(req.params.id);

  if (service) {
    service.title = title;
    service.description = description;
    service.image = image;
    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
  const product = await Service.findById(req.params.id);

  if (product) {
    await Service.deleteOne({ _id: product._id });
    res.json({ message: 'Service removed' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});

// @desc    Create new review
// @route   POST /api/services/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Service.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Service already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
});


export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
















// import asyncHandler from "../middleware/asyncHandler.js";
// import Service from "../models/serviceModel.js";


// // Fetch all services
// const getServices = asyncHandler(async (req, res) => {
//   const services = await Service.find({});
//   res.json(services);
// });

// // Fetch a service by ID
// const getServiceById = asyncHandler(async (req, res) => {
//   const service = await Service.findById(req.params.id);

//   if (!service) {
//     return res.status(404).json({ message: "No service found" });
//   }

//   res.json(service);
// });

// // Create a new service
// // @desc Create new vehicules
// // @routes POST /api/vehicules
// // @access Private, Admin
// const createService = asyncHandler(async (req, res) => {
//   try {
//     // Get the title, description from req.body
//     const { title, description } = req.body;

//     // Get the image path from req.file.path
//     const imagePath = req.file.path;

//     // Create a new service instance based on the form data
//     const newService = await Service.create({
//       title,
//       description,
//       image: imagePath, // Save the image path to the database
//     });

//     // Fetch the complete service data from the database
//     const createdService = await Service.findById(newService._id);

//     // Respond with a success message and the created service data
//     res.status(201).json({
//       success: true,
//       data: createdService,
//     });
//   } catch (error) {
//     console.error("Error creating Service:", error);
//     res.status(500).json({ error: "Internal Server Error", message: error.message });
//   }
// });

// // const createService = asyncHandler(async (req, res) => {
// //   // try {
// //   // Create a new service instance based on the request body
// //   const newService = new Service(req.body);

// //   // Save the new service to the database
// //   const createdService = await newService.save();

// //   // Respond with a success message and the created vehicle data
// //   const response = {
// //     success: true,
// //     data: createdService,
// //   };
// //   res.status(201).json(response);
// //   // } catch (error) {
// //   console.error("Error creating Service:", error);
// //   res
// //     .status(500)
// //     .json({ error: "Internal Server Error", message: error.message });
// //   // }
// // });
// // Update a service
// const updateService = asyncHandler(async (req, res) => {
//   const service = await Service.findById(req.params.id);

//   if (service) {
//     service.title = req.body.title || service.title;
//     service.description = req.body.description || service.description;
//     // service.price = req.body.price || service.price;
//     service.image = req.body.image || service.image;

//     const updatedService = await service.save();
//     res.json(updatedService);
//   } else {
//     res.status(404);
//     throw new Error("Service not found");
//   }
// });

// export { getServices, getServiceById, createService, updateService };

