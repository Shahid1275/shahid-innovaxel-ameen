import express from "express";
import {
  createShortUrl,
  getOriginalUrl,
  updateShortUrl,
  deleteShortUrl,
  getUrlStats,
  redirectUrl,
  getAllUrls,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/shorten/:shortCode", getOriginalUrl);
router.put("/shorten/:shortCode", updateShortUrl);
router.delete("/shorten/:shortCode", deleteShortUrl);
router.get("/shorten/:shortCode/stats", getUrlStats);
router.get("/r/:shortCode", redirectUrl);
router.get("/", getAllUrls);

export default router;
