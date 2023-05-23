const app = require("express");
const { addProduct , getProductDetails , deleteProduct , editProduct, getProduct, addReview, addRelatedProduct} = require("../Controller/ProductController");

const router = app.Router();

router.post('/product/add',addProduct);

router.post('/product',getProduct);

router.get('/product/:id',getProductDetails);

router.post('/product/delete',deleteProduct);

router.post('/product/edit',editProduct);

router.post('/product/reviews/add',addReview);

router.post('/related-product/add',addRelatedProduct);

module.exports = router;