import mongoose from "mongoose";
import autoIncrement from "mongoose-sequence";

const urlSchema = new mongoose.Schema({
  url_id: { type: Number, unique: true },
  url: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  accessCount: { type: Number, default: 0 },
});

const AutoIncrementPlugin = autoIncrement(mongoose);
urlSchema.plugin(AutoIncrementPlugin, { inc_field: "url_id" });

export const Url = mongoose.model("UrlModel", urlSchema);
