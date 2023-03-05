const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    default:5.0
  },
  productNew: {
    type: Boolean,
    default: true
  },
  purchase: {
    type: Number,
    default:0
  },
  stock: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  dateUpdate: {
    type: Date,
    default: Date.now(),
  },
  updateBy: {
    type: String,
    required: true,
  },
  brandId: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
});

productSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.productId = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});

module.exports = mongoose.model("Product", productSchema);
