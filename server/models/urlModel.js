import mongoose from "mongoose";
import autoIncrement from "mongoose-sequence"; // Correct import for ES6

const urlSchema = new mongoose.Schema({
  url_id: { type: Number, unique: true },
  url: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  accessCount: { type: Number, default: 0 },
});

// Apply auto-increment to url_id
const AutoIncrementPlugin = autoIncrement(mongoose); // Use the imported autoIncrement
urlSchema.plugin(AutoIncrementPlugin, { inc_field: "url_id" });

export const Url = mongoose.model("UrlModel", urlSchema);
