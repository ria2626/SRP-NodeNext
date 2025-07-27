import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

// Main Cart Schema
const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one cart per user
  },
  items: [CartItemSchema], // array of cart items
}, { timestamps: true });

// Export model
export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
