import path from "path";
import express from "express";
import multer from "multer";
import sharp from "sharp";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    // Check if req.file exists before accessing its properties
    if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
        log: console.log("REQ-FILE-PATH: ", req.file.path),
      });
    } else {
      return res.status(500).send({ message: "Error uploading image" });
    }
  });
});

export default router;

// import path from "path";
// import Express from "express";
// import Vehicule from "../models/vehiculeModel.js";
// import multer from "multer";
// const router = Express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.filename}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("Images only");
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });
// router.post("/:id", upload.single("image"), async (req, res) => {
//   try {
//     // Assuming you have a Vehicule model
//     const vehicule = await Vehicule.findById(req.params.id);
//     console.log("VEHICULE-IN-ROUTE-UPLOAD", vehicule);

//     if (!vehicule) {
//       return res.status(404).json({ message: "Vehicule not found" });
//     }

//     // Update the images field with the new image path
//     vehicule.images = `/${req.file.path}`;

//     // Save the updated vehicule
//     await vehicule.save();

//     res.json({
//       message: "Image uploaded successfully",
//       image: `/${req.file.path}`,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// export default router;
