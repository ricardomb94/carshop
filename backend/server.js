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
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const __dirname = path.resolve(); // Set __dirname to current directory only once
const port = process.env.PORT || 5000;
const app = express();

// Helmet
app.use(helmet());
// CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Cookies middleware
app.use(cookieParser());

// Database connection
connectDB(app);

// Morgan logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// Static uploads route
// app.use("/api/uploads", express.static(path.join(__dirname, "/uploads")));

// app.get('/api/uploads/:filename', (req, res) => {
//   const filePath = path.join(__dirname, '/uploads/' + req.params.filename);
//   console.log(`Attempting to send file: ${filePath}`);
//   res.sendFile(filePath);
// });

//Images route
app.get('/uploads/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, '/uploads/' + req.params.filename));
});

// API routes
app.use("/api/vehicules", vehiculeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

// Admin routes
app.use("/api/admin/vehiculeslist", vehiculeRoutes);
app.use("/api/admin/vehicule/:id", vehiculeRoutes);

// PayPal config route
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_client_ID })
);

// Production specific routes
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// }

// Welcome route
app.get("/", (req, res) => {
  res.send(process.env.NODE_ENV === "production" ? "API is running...." : "Bienvenue l'API est déployée avec succés ");
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Server start
app.listen(port, () => console.log(`Le Server écoute sur le port ${port}`));

