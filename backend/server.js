import express from "express";
// import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
// import vehicules from "./data/vehicules.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import vehiculeRoutes from "./routes/vehiculeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;
const app = express();

//  Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

//Cookies middleware
app.use(cookieParser());

connectDB(app);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", (req, res) => {
  res.send("Bienvenue l'API est déployée avec succés ");
});

app.use("/api/vehicules", vehiculeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_client_ID })
);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Le Server écoute sur le port ${port}`));
