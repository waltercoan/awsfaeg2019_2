var express = require('express');
var router = express.Router();

var ProductController = require("../controller/productcontroller");
var productController = new ProductController();

/* GET users listing. */
router.get('/form', function(req, res, next) {
    productController.form(req,res,next);
});
router.post('/save', function(req, res, next) {
    productController.save(req,res,next);
});

module.exports = router;
