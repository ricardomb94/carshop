import path from "path";
import Express from "express";
import multer from "multer";
const router = Express.Router();

const storage = multer.diskStorage({
  destinantion(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.filename}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only");
  }
}

const upload = multer({
  storage,
  // fileFilter: function (req, file, cb) {
  //     checkFileType(file, cb);
  // },
});
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded successfully",
    image: `/${req.file.path}`,
  });
});

export default router;
