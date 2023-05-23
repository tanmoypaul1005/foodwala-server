const { default: slugify } = require("slugify");
const Product = require("../Models/Product");
const ObjectId = require("mongodb").ObjectId;

//add product
module.exports.addProduct = (req, res) => {
  const {
    name,
    price,
    slug,
    stock,
    category,
    brand,
    description,
    reviews,
    status,
    offer,
    image,
    quantity
  } = req.body;

  //  console.log(req.body)
  const price1 = parseInt(price);

  const offerPercentage = parseInt(offer) / 100;
  const offerPrice = price1 - price1 * offerPercentage;
  console.log(offerPrice);
  Product.findOne({ name: name }).exec((error, data) => {
    if (data) {
      return res.status(404).json({ message: "Product All Ready Register", success: false });
    }
    const _product = new Product({
      name,
      slug: slugify(name).toLowerCase(),
      stock,
      price,
      slug,
      category,
      brand,
      description,
      reviews,
      status,
      offer,
      image,
      offerPrice: offerPrice,
      reviews: [],
      quantity,
    });
    _product.save((error, data) => {
      if (error) {
        return res.status(400).json({ msg: "Somethings is Wrong", error, success: false });
      }
      if (data) {
        return res.status(200).json({ msg: "Product Create Successfully", data, success: true });
      }
    });
  });
};

//get Product
module.exports.getProductDetails = (req, res) => {
  Product.findOne({ _id: req?.params?.id })
    .populate("reviews.user")
    .populate("category")
    .exec((error, product) => {
      if (error) return res.status(400).json({ message: "Somethings is Wrong", success: false });
      if (product) {
        let reviewRate = "";
        for (let item of product?.reviews) {
          reviewRate = reviewRate + item?.star / product?.reviews?.length
        }
        const totalReviews = product?.reviews?.length;
        const data = {
          product: product,
          totalReviews,
          reviewRate
        };
        return res.status(200).json({ data, success: true });
      }
    });
};

module.exports.deleteProduct = (req, res) => {
  Product.findOneAndDelete({ _id: req.body.id }).exec((error, data) => {
    if (error) {
      return res.status(400).json({ error, success: false });
    }
    if (data) {
      return res.status(200).json({ msg: "Product is Delete", success: true });
    }
  });
};

//get Product List
module.exports.getProduct = (req, res) => {

  let data = {}
  if (req.body.status && req.body.category_id) {
    data = { status: req.body.status, category: req.body.category_id }
  } else if (req.body.status) {
    data = { status: req.body.status }
  } else if (req.body.category_id) {
    data = { category: req.body.category_id }
  } else {
    data = {}
  }
  Product.find(data)
    .populate("category")
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({ error, success: false });
      }
      if (data) {
        return res.status(200).json({ data, success: true });
      }
    });
};

module.exports.editProduct = (req, res) => {
  const {
    name,
    price,
    slug,
    stock,
    category,
    brand,
    description,
    reviews,
    status,
    offer,
  } = req.body.data;
  console.log(req.body);

  const price1 = parseInt(price);
  const price2 = parseInt(offer);
  const offerpass = price2 / 100;
  const offerprice = price1 - price1 * offerpass;
  const updatedPost = {
    name: name,
    slug: slugify(name).toLowerCase(),
    price,
    slug,
    stock,
    category,
    brand,
    description,
    reviews,
    status,
    offerprice: offerprice,
    reviews: [],
  };

  Product.findOneAndUpdate({ id: req.body.id }, updatedPost).exec(
    (error, data) => {
      if (error) return res.status(500).json({ error, success: false });
      if (data) {
        return res
          .status(200)
          .json({ message: "your Product is successfully Updated", data, success: true });
      }
    }
  );
};

module.exports.GetProductsFilterByCategory = (req, res) => {
  Product.find({ category: req.params.category })
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({ error, success: false });
      }
      if (data) {
        return res.status(200).json({ data, success: true });
      }
    });
}

// user Add Comment
module.exports.addReview = (req, res) => {
  const { id, comment, star, user } = req.body;
  const reviewsItem = { comment, star, user }
  Product.findOneAndUpdate({ _id: id }, { $push: { reviews: reviewsItem } }, { new: true, upsert: true, setDefaultsOnInsert: true })
    .exec((error, data) => {
      if (error) { return res.status(500).json({ error, success: false }); }
      if (data) { return res.status(200).json({ msg: 'Your Comment Add successfully', data, success: true }); }
    })
}

//add Related Product
module.exports.addRelatedProduct = (req, res) => {
  Product.findOneAndUpdate({ _id: req.body.product_id }, { $push: { relatedProduct: { product: req.body.related_product_id } } }, { new: true, upsert: true, setDefaultsOnInsert: true })
    .exec((error, data) => {
      if (error) return res.status(500).json({ error, success: false });
      if (data) {
        return res.status(200).json({ message: 'Your Related Product Add successfully', data, success: true });
      }
    })
}


