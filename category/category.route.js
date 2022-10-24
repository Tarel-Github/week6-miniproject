const express = require("express");
const router = express.Router();

const CategoryController = require('./category.controller');
const categoryController = new CategoryController();

router.get('/:categoryId', categoryController.getCategoryPosts);

module.exports = router;