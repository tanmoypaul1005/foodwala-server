const { default: mongoose } = require("mongoose");
const Cart = require("../Models/Cart.js");

//add cart
module.exports.addCart = (req, res) => {
  const { user, product, quantity } = req.body;
  Cart.find({ user: req.body.user }).exec((error, data) => {
    if (error) return res.status(500).json({ error, success: false });
    if (data) {
      Cart.findOneAndUpdate(
        { user: user },
        { $push: { cartItems: { user, product, quantity } } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec((error, data) => {
        if (error) return res.status(500).json({ error, success: false });
        if (data) {
          return res.status(200).json({ msg: "Add Product successfully", data, success: true });
        }
      });
    }
  });
};

// get cart
exports.getCartItems = (req, res) => {
  Cart.find({ user: req.body.user })
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error, success: false });
      if (cart) {
        return res.status(202).json({ cart, success: true });
      }
    });
};

