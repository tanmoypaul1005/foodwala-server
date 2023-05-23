const app = require("express");
const { addCart,getCartItems } = require("../Controller/CartController");
const router = app.Router();

//add cart
router.post('/cart/add',addCart);

//get cart
router.post('/cart',getCartItems);


module.exports = router;