import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import Favorite from "./models/Favorite.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/quotes", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Mongo Connected"));

app.get("/api/quotes/random", async (_, res) => {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  res.json({ content: data.content, author: data.author });
});

app.post("/api/quotes/save", async (req, res) => {
  const { content, author } = req.body;
  const fav = new Favorite({ content, author });
  await fav.save();
  res.json(fav);
});

app.get("/api/quotes/favorites", async (_, res) => {
  const favs = await Favorite.find();
  res.json(favs);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
