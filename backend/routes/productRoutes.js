const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { title, description, price, location, categories,images} = req.body;
    if (!title || !description || !price || !location  || !images) {
      return res.status(400).json({ error: "All fields are required" });
    }


    if (categories && categories.length > 0) {
      const foundCategories = await Category.find({ _id: { $in: categories } });
      if (foundCategories.length !== categories.length) {
        return res.status(400).json({ error: "One or more categories are invalid" });
      }
    }

    const newListing = new Product({
      title,
      description,
      price,
      location,
      images, 
      categories,
    });
    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    console.error("Error saving listing:", error);
    res.status(500).json({ error: "Failed to save listing" });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, priceMin, priceMax, color } = req.query;

    const filter = {};
    if (category) {
      // If multiple categories sent as array (e.g., ?category=cat1&category=cat2)
      if (Array.isArray(category)) {
        filter.categories = { $in: category };
      } else {
        filter.categories = category; // single category ID
      }
    }
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = parseFloat(priceMin);
      if (priceMax) filter.price.$lte = parseFloat(priceMax);
    }

    if (color) {
      if (Array.isArray(color)) {
        filter.colors = { $in: color };
      } else {
        filter.colors = color;
      }
    }

    const getproducts = await Product.find(filter).populate("categories");
    res.json(getproducts);
  } catch (err) {
    res.status(500).json({ error: 'server error', details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categories");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get('/related/:categoryId/:excludeId', async (req, res) => {
  const { categoryId, excludeId } = req.params;
  try {
    const relatedProducts = await Product.find({
      categories: categoryId,
      _id: { $ne: excludeId },
    }).limit(4); // limit to 4 items
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});
// router.get("/:id", async (req, res) => {
//   try {

//     const listing = await Product.findByIdAndUpdate(req.params.id);
//     if (!listing) {
//       return res.status(404).json({ error: "Listing not found" });
//     }
//     res.status(200).json(listing);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching listing" });
//   }
// });

module.exports = router;
