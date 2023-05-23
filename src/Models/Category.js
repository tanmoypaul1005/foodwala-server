const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
         type: String
        },

    slug: {type: String},

    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
