import { Url } from "../models/urlModel.js";
import { nanoid } from "nanoid";

const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const shortCode = nanoid(8);
    const newUrl = new Url({
      url,
      shortCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedUrl = await newUrl.save();
    res.status(201).json({
      id: savedUrl.url_id,
      url: savedUrl.url,
      shortCode: savedUrl.shortCode,
      createdAt: savedUrl.createdAt,
      updatedAt: savedUrl.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create short URL" });
  }
};

const getOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: "URL not found" });
    url.accessCount += 1;
    url.updatedAt = new Date();
    await url.save();
    res.status(200).json({
      id: url.url_id,
      url: url.url,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve URL" });
  }
};

const updateShortUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const { url } = req.body;
    const updatedUrl = await Url.findOneAndUpdate(
      { shortCode },
      { url, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedUrl) return res.status(404).json({ error: "URL not found" });
    res.status(200).json({
      id: updatedUrl.url_id,
      url: updatedUrl.url,

      shortCode: updatedUrl.shortCode,
      accessCount: updatedUrl.accessCount,
      createdAt: updatedUrl.createdAt,
      updatedAt: updatedUrl.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update URL" });
  }
};

const deleteShortUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOneAndDelete({ shortCode });
    if (!url) return res.status(404).json({ error: "URL not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete URL" });
  }
};

const getUrlStats = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: "URL not found" });
    res.status(200).json({
      id: url.url_id,
      url: url.url,
      shortCode: url.shortCode,
      accessCount: url.accessCount,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve stats" });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url)
      return res
        .status(404)
        .json({ error: "URL not found or has been deleted" });
    url.accessCount += 1;
    url.updatedAt = new Date();
    await url.save();
    res.redirect(url.url);
  } catch (err) {
    res.status(500).json({ error: "Failed to redirect to the original URL" });
  }
};
const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(
      urls.map((url) => ({
        id: url.url_id,
        url: url.url,
        shortCode: url.shortCode,
        accessCount: url.accessCount,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve URLs" });
  }
};

export {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getUrlStats,
  redirectUrl,
  getAllUrls,
};
