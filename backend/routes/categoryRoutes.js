const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const exists = await Category.findOne({ name });
  if (exists) {
    return res.status(400).json({ error: "Category already exists" });
  }

  const category = await Category.create({ name });
  res.status(201).json(category);
});

module.exports = router;
