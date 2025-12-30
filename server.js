const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Upload endpoint
app.post("/api/upload", upload.single("fileToUpload"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  // Return file URL (replace with real domain if you have one)
  const fileUrl = `https://your-domain.com/uploads/${req.file.filename}`;
  res.send(fileUrl);
});

// Health check
app.get("/", (req, res) => res.send("Neon Uploader API is running"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
