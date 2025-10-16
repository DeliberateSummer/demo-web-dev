import mongoose from "mongoose";
const favoriteSchema = new mongoose.Schema({
  content: String,
  author: String
});
export default mongoose.model("Favorite", favoriteSchema);
