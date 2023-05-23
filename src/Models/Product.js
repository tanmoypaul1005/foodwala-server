const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },

    price: {
      type: Number
    },

    slug: {
      type: String
    },

    stock: {
      type: Number,
    },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    image: { type: String },

    brand: {
      type: String
    },

    description: {
      type: String
    },

    offerPrice: {
      type: Number
    },
    quantity: { type: String },

    status: {
      type: String,
      enum: [
        "Regular Product",
        "New Arrivals",
        "Popular Products",
        "Featured Products",
      ],
      default: "Regular Product",
    },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        star: { type: Number },
        required: false,
      },
    ],

    relatedProduct: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
