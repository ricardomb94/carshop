import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
// import helmet from "helmet";
import redirectSSL from "redirect-ssl"
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import vehiculeRoutes from "./routes/vehiculeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import websocketHandler from "./socket.js";
import cors from "cors"


const app = express();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from any origin
    credentials: true , // Enable credentials (cookies, authorization headers, etc.)
    methods:["GET", "POST"]
  }
});


// enable ssl redirect
app.use(redirectSSL)

// app.use(helmet());
// app.use(cors({
//   origin: "http://localhost:3000", // Allow requests from client
//   credentials: true // Enable credentials (cookies, authorization headers, etc.)
// }));
app.use(cors())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('config'));
app.use(cookieParser());

connectDB(app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});

// API routes
app.use("/api/vehicules", vehiculeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes)
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/services", serviceRoutes)
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/thumbnails", express.static(path.join(__dirname, "/thumbnails")));
app.use("/resized", express.static(path.join(__dirname, "/resized")));

// Admin routes
app.use("/api/admin/vehiculeslist", vehiculeRoutes);
app.use("/api/admin/vehicule/:id", vehiculeRoutes);
app.use("/api/services/admin/servicelist", serviceRoutes);
app.use("/api/admin/service/:id", serviceRoutes)
app.use("/api/admin/contact/:id", contactRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_client_ID })
);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
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
  
const port = process.env.PORT || 5000;



server.listen(port, () => {
  console.log(`The Server is listening on ${port} port in ${process.env.NODE_ENV} mode`);
  websocketHandler(io);
});