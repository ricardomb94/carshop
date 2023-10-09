import express from "express";
import vehicules from "./data/vehicules.js";
import { log } from "console";

const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenue l'API est déployée avec succés ");
});

app.get("/api/vehicules", (req, res) => {
  res.json(vehicules);
});

app.get("/api/vehicules/:id", (req, res) => {
  const vehicule = vehicules.find((v) => v._id === req.params.id);
  res.json(vehicule);
});

app.listen(port, () => console.log(`Le Server écoute sur le port ${port}`));
