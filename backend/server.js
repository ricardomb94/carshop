import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import vehiculeRoutes from "./routes/vehiculeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;
const app = express();

//helmet
app.use(helmet());
//Cors
app.use(
  cors({
    origin: "process.env.BASE_URL", // Allow requests from this origin
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  })
);

//Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

//Cookies middleware
app.use(cookieParser());

connectDB(app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site'); // or 'cross-origin'
  next();
});

app.use("/api/vehicules", vehiculeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes)
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/services", serviceRoutes)
const __dirname = path.resolve(); //Set __dirname to current directory
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/thumbnails", express.static(path.join(__dirname, "/thumbnails")));
app.use("/resized", express.static(path.join(__dirname, "/resized")));

// Define the admin routes before the notFound and errorHandler middleware
app.use("/api/admin/vehiculeslist", vehiculeRoutes);
app.use("/api/admin/vehicule/:id", vehiculeRoutes);
app.use("/api/services/admin/servicelist", serviceRoutes);
app.use("/api/admin/service/:id", serviceRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_client_ID })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Le Server écoute sur le port ${port}`));
