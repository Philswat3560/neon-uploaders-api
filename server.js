import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";

const app = express();
app.use(cors());

// Setup temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Upload endpoint
app.post("/api/upload", upload.single("fileToUpload"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  // Return URL (demo: local path)
  const url = `https://yourdomain.com/uploads/${req.file.filename}`;
  res.send(url);
});

// Health check
app.get("/", (req, res) => res.send("Neon Uploader API running"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
