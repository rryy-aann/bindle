import express from "express";
import multer from "multer";
import authenticateToken from "../middleware/authenticateToken";
import { uploadToS3 } from "../utils/s3";

const router = express.Router();
const upload = multer();

router.post("/", authenticateToken, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = await uploadToS3(req.file.buffer, req.file.originalname);
    res.status(200).json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default router;
 