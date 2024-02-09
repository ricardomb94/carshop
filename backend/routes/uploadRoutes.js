
import path from "path";
import express from "express";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) 
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
}).single("image");

router.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Error uploading image" });
    }

    console.log("REQ FILE IN UPLOAD ROUTE :", req.file);
    const imagePath = req.file.path;
    const thumbnailPath = `thumbnails/${req.file.filename}`;

    // Ensure the thumbnails directory exists
    const thumbnailDir = path.dirname(thumbnailPath);
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
    }

    // Ensure the resized directory exists
    const resizedDir = path.dirname(`resized/${req.file.filename}`);
    if (!fs.existsSync(resizedDir)) {
      fs.mkdirSync(resizedDir, { recursive: true });
    }

    // Resize the original image
    const resizedImagePath = `resized/${req.file.filename}`;
    sharp(imagePath)
      .resize(1024, 768)
      .toFile(resizedImagePath, (err, originalInfo) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Error resizing original image" });
        }

        // Resize the thumbnail
        sharp(imagePath)
          .resize(350, 250)
          .toFile(thumbnailPath, (err, thumbnailInfo) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: "Error creating thumbnail" });
            }

            console.log("Original Image Info:", originalInfo);
            console.log("Thumbnail Info:", thumbnailInfo);

            res.send({
              message: "Image uploaded successfully",
              imagePath,
              thumbnailPath,
            });
          });
      });
  });
});

export default router;




