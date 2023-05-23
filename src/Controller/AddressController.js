const Address = require("../Models/Address");

module.exports.addAddress = (req, res) => {

  Address.find({ user: req.body.user }).exec((error, data) => {
    if (error) return res.status(500).json({ error, success: false });

    if (data) {
      Address.findOneAndUpdate(
        { user: req.body.user },
        { $push: { address: req.body.address } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec((error, data) => {
        if (error) return res.status(400).json({ error, success: false });
        if (data) {
          return res.status(200).json({ msg: "Add Address Successfully", data, success: true });
        }
      });
    }
  });
};

//User Address List
module.exports.getAddress = (req, res) => {
  Address.findOne({ user: req.body.user }).exec((error, data) => {
    if (error) return res.status(400).json({ error, success: false });
    if (data) {
      res.status(200).json({ data, success: true });
    }
  });
};
