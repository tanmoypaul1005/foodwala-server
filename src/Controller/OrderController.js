const Cart = require("../Models/Cart");
const Order = require("../Models/Order");

//add order
module.exports.addOrder = (req, res) => {
  Cart.deleteOne({ user: req.body.user }).exec((error, result) => {
    if (error) return res.status(400).json({ error, success: false });
    if (result) {
      req.body.user = req.body.user;
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },

        {
          type: "packed",
          isCompleted: false,
        },

        {
          type: "shipped",
          isCompleted: false,
        },

        {
          type: "delivered",
          isCompleted: false,
        },

      ];
      const order = new Order(req.body);
      order.save((error, data) => {
        if (error) return res.status(500).json({ error,success:false });
        if (data) {
          res.status(200).json({ "message":"Your Order Add successfully",data ,success:true});
        }
      });
    }
  });
};

//get order
module.exports.getOrders = (req, res) => {
  Order.find({ user: req.body.user })
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.productId", "_id name productPicture")
    .exec((error, data) => {
      if (error) return res.status(400).json({ error,success: false  });
      if (data) {
        res.status(200).json({data ,success: true});
      }
    });
};
