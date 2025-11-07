import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import { spawn } from "child_process";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Multer setup — stores uploaded files in /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/* 
==========================================
📤 ROUTE 1: Upload Excel/CSV file for prediction
==========================================
*/
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  console.log("📂 File received:", filePath);

  const pythonProcess = spawn("python", ["model/run_model.py", filePath]);

  let output = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => (output += data.toString()));
  pythonProcess.stderr.on("data", (data) => (errorOutput += data.toString()));

  pythonProcess.on("close", (code) => {
    if (errorOutput) {
      console.error("❌ Python error:", errorOutput);
      return res.status(500).json({ error: errorOutput });
    }
    try {
      const result = JSON.parse(output);
      console.log("✅ Prediction result:", result);
      res.json(result);
    } catch (err) {
      console.error("❌ Invalid JSON from Python:", output);
      res.status(500).json({ error: "Invalid output from model" });
    }
  });
});

/* 
==========================================
🧠 ROUTE 2: Direct form input (no file upload)
==========================================
Example frontend JSON:
{
  "reads_books": 25,
  "book_genre_top1": "Science",
  "screen_time_movies_series_hours_per_week": 10
}
==========================================
*/
app.post("/api/predict", (req, res) => {
  const inputData = req.body;
  console.log("📨 Received input for prediction:", inputData);

  const pythonProcess = spawn("python", ["model/run_model.py"], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  let output = "";
  let errorOutput = "";

  pythonProcess.stdout.on("data", (data) => (output += data.toString()));
  pythonProcess.stderr.on("data", (data) => (errorOutput += data.toString()));

  pythonProcess.on("close", (code) => {
    if (errorOutput) {
      console.error("❌ Python error:", errorOutput);
      return res.status(500).json({ error: errorOutput });
    }
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (err) {
      console.error("❌ Invalid JSON from Python:", output);
      res.status(500).json({ error: "Invalid output from model" });
    }
  });

  // Send the JSON data to Python via stdin
  pythonProcess.stdin.write(JSON.stringify(inputData));
  pythonProcess.stdin.end();
});

/* 
==========================================
🌐 Serve React Frontend (dist folder)
==========================================
*/
const distPath = path.join(process.cwd(), "backend", "dist");
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* 
==========================================
🚀 Start Server
==========================================
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
