import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
// import vehicules from "./data/vehicules.js";
import connectDB from "./config/db.js";
import vehiculeRoutes from "./routes/vehiculeRoutes.js";

const port = process.env.PORT || 5000;
const app = express();

connectDB(app);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", (req, res) => {
  res.send("Bienvenue l'API est déployée avec succés ");
});

app.use("/api/vehicules", vehiculeRoutes);

app.listen(port, () => console.log(`Le Server écoute sur le port ${port}`));
