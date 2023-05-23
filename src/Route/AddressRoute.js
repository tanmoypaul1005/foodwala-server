const app = require("express");
const { addAddress, getAddress } = require("../Controller/AddressController");
const router = app.Router();

//add address
router.post('/address/add', addAddress);

//get address
router.get('/address/get', getAddress)

module.exports = router;