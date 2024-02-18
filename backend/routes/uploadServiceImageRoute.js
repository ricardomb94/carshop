// import path from 'path';
// import express from 'express';
// import multer from 'multer';

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function fileFilter(req, file, cb) {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = mimetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Images only!'), false);
//   }
// }

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single('image');

// router.post('/', (req, res) => {
//   uploadSingleImage(req, res, function (err) {
//     if (err) {
//       res.status(400).send({ message: err.message });
//     }

//     res.status(200).send({
//       message: 'Image uploaded successfully',
//       image: `/${req.file.path}`,
//     });
//   });
// });

// export default router;









// // import path from "path";
// // import express from "express";
// // import multer from "multer";
// // import sharp from "sharp";
// // import fs from "fs";

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "images/");
// //   },
// //   filename: function (req, file, cb) {
// //     return cb(null, file.originalname);
// //   },
// // });

// // const upload = multer({
// //   storage: storage,
// //   fileFilter: function (req, file, cb) {
// //     const filetypes = /jpeg|jpg|png/;
// //     const mimetype = filetypes.test(file.mimetype);
// //     const extname = filetypes.test(
// //       path.extname(file.originalname).toLowerCase()
// //     );
// //     if (mimetype && extname) {
// //       return cb(null, true);
// //     }
// //     cb(new Error("Only image files are allowed!"));
// //   },
// // }).single("image");

// // router.post("/", (req, res) => {
// //   upload(req, res, function (err) {
// //     if (err) {
// //       console.log(err);
// //       return res.status(500).send({ message: "Error uploading image" });
// //     }

// //     console.log("REQ FILE IN UPLOAD ROUTE :", req.file);
// //     const imagePath = req.file.path;
// //     // const thumbnailPath = `thumbnails/${req.file.filename}`;

// //     // Ensure the thumbnails directory exists
// //     // const thumbnailDir = path.dirname(thumbnailPath);
// //     // if (!fs.existsSync(thumbnailDir)) {
// //     //   fs.mkdirSync(thumbnailDir, { recursive: true });
// //     // }

// //     // // Ensure the resized directory exists
// //     // const resizedDir = path.dirname(`resized/${req.file.filename}`);
// //     // if (!fs.existsSync(resizedDir)) {
// //     //   fs.mkdirSync(resizedDir, { recursive: true });
// //     // }

// //     // Resize the original image
// //     const resizedImagePath = `resized/${req.file.filename}`;
// //     sharp(imagePath)
// //       .resize(1024, 768)
// //       .toFile(resizedImagePath, (err, originalInfo) => {
// //         if (err) {
// //           console.log(err);
// //           return res.status(500).send({ message: "Error resizing original image" });
// //         }

// //         // Resize the thumbnail
// //         // sharp(imagePath)
// //         //   .resize(350, 250)
// //         //   .toFile(thumbnailPath, (err, thumbnailInfo) => {
// //         //     if (err) {
// //         //       console.log(err);
// //         //       return res.status(500).send({ message: "Error creating thumbnail" });
// //         //     }

// //             console.log("Original Image Info:", originalInfo);
// //             // console.log("Thumbnail Info:", thumbnailInfo);

// //             res.send({
// //               message: "Image uploaded successfully",
// //               imagePath,
// //               // thumbnailPath,
// //             });
// //           });
// //       });
// //   });


// // export default router;











// // import express from "express";
// // import multer from "multer";
// // import path from "path";

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "images/");
// //   },
// //   filename: function (req, file, cb) {
// //     return cb(null, file.originalname);
// //   },
// // });

// // const upload = multer({
// //   storage: storage,
// //   fileFilter: function (req, file, cb) {
// //     const filetypes = /jpeg|jpg|png/;
// //     const mimetype = filetypes.test(file.mimetype);
// //     const extname = filetypes.test(
// //       path.extname(file.originalname).toLowerCase()
// //     );
// //     if (mimetype && extname) {
// //       return cb(null, true);
// //     }
// //     cb(new Error("Only image files are allowed!"));
// //   },
// // }).single("image");

// // router.post("/admin/servicelist", (req, res) => {
// //   upload(req, res, function (err) {
// //     if (err) {
// //       console.log(err);
// //       return res.status(500).send({ message: "Error uploading image" });
// //     }

// //     console.log("REQ FILE IN SERVICE UPLOAD ROUTE:", req.file);
// //     const imagePath = req.file.path;

// //     res.send({
// //       message: "Image uploaded successfully",
// //       imagePath,
// //     });
// //   });
// // });

// // export default router;








// // // import express from "express";
// // // import multer from "multer";
// // // import path from "path";
// // // import Service from "../models/serviceModel.js";

// // // const router = express.Router();

// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, "images/services");
// // //   },
// // //   filename: function (req, file, cb) {
// // //     return cb(null, file.originalname);
// // //   },
// // // });

// // // const upload = multer({
// // //   storage: storage,
// // //   fileFilter: function (req, file, cb) {
// // //     const filetypes = /jpeg|jpg|png/;
// // //     const mimetype = filetypes.test(file.mimetype);
// // //     const extname = filetypes.test(
// // //       path.extname(file.originalname).toLowerCase()
// // //     );
// // //     if (mimetype && extname) {
// // //       return cb(null, true);
// // //     }
// // //     cb(new Error("Only image files are allowed!"));
// // //   },
// // // }).single("image");

// // // router.post("/", (req, res) => {
// // //   // Use multer to handle multipart/form-data
// // //   upload(req, res, async function (err) {
// // //     if (err) {
// // //       console.log(err);
// // //       return res.status(500).send({ message: "Error uploading image" });
// // //     }

// // //     // Access form fields like req.body.title, req.body.description
// // //     console.log("REQ BODY :", req.body)
// // //     const { title, description } = req.body;

// // //     // Access the file like req.file
// // //     console.log("REQ FILE :", req.file)
// // //     const imagePath = req.file.path;

// // //     try {
// // //       // Create a new service instance based on the form data
// // //       const newService = await Service.create({
// // //         title,
// // //         description,
// // //         image: imagePath, // Save the image path to the database
// // //       });
// // // console.log("NEWS SERVICE in Controller :", newService )
// // //       // Respond with a success message and the created service data
// // //       res.status(201).json({
// // //         success: true,
// // //         data: newService,
// // //       });
// // //     } catch (error) {
// // //       console.error("Error creating Service:", error);
// // //       res.status(500).json({ error: "Internal Server Error", message: error.message });
// // //     }
// // //   });
// // // });

// // // export default router;
