const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
router.use(fileUpload());

router.post("/", async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    let uploadedImages = [];
    let images = req.files.images;
    if (!Array.isArray(images)) {
      images = [images];
    }
    images.forEach((file) => {
      const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
      file.mv(filePath, (err) => {
        if (err) {
          console.error("File upload error:", err);
          return res.status(500).json({ error: "File upload failed" });
        }
      });

      uploadedImages.push(`/uploads/${path.basename(filePath)}`);
    });
    res.status(200).json({ imageUrls: uploadedImages });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;