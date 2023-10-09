import express from "express";

const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenue l'API est déployée avec succés ");
});

app.listen(port, () => console.log(`Le Server écoute sur le port ${port}`));
