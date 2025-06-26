// models/Cart.model.js
import mongoose, { Schema } from 'mongoose'

const CartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // This creates a reference to your Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  // You could also store price and name here to avoid looking them up later
  // price: { type: Number, required: true },
  // name: { type: String, required: true }
})

const CartSchema = new Schema(
  {
    // You would normally associate this with a user
    userId: {
      type: String, // or Schema.Types.ObjectId if you have a User model
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
)

// Prevents recompiling the model on every hot reload in development
const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema)

export default Cart
