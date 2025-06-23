import mongoose, { Schema } from 'mongoose'

/**
 * Schema for individual product reviews.
 * This will be embedded within the Product schema.
 */
const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Creates a reference to the User model
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps to each review
  }
)

/**
 * Main schema for the Product model.
 */
const productSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the user who added the product
    },
    name: {
      type: String,
      required: [true, 'Please provide a product name.'],
      trim: true,
    },
    images: [
      {
        type: String, // An array of image URLs
        required: true,
      },
    ],
    brand: {
      type: String,
      required: [true, 'Please provide a brand name.'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category.'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description.'],
    },
    reviews: [reviewSchema], // Embeds the review schema
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price.'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields to the product
  }
)

// This line prevents Mongoose from recompiling the model on every hot-reload
// in a development environment.
export default mongoose.models.Product || mongoose.model('Product', productSchema)
