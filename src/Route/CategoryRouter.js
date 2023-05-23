
const app = require("express");
const { addCategory, getCategories,CategoryDetail } = require("../Controller/CategoryController");
const router = app.Router();

//add category
router.post('/category/add',addCategory);

//get category
router.get('/category',getCategories);

//get Product
router.post('/category-detail',CategoryDetail);

module.exports = router;